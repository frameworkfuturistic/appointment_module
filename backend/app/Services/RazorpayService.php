<?php

/**
 * Service file for Razorpay services.
 * File opened by Juniad on 26-07-2024.
 * Status: open
 * --------------------------------------
 */

namespace App\Services;

use Razorpay\Api\Api;
use Razorpay\Api\Errors\BadRequestError;

class RazorpayService
{
    // Define the Razorpay API instance
    protected $api;

    // Constructor to initialize the Razorpay API with key and secret from config
    public function __construct()
    {
        $this->api = new Api(config('razorpay.key_id'), config('razorpay.key_secret'));
    }

    // Create a new Razorpay order with the given data
    public function createOrder(array $data)
    {
        // Validate the required fields in the input data
        if (empty($data['amount'])) {
            throw new \InvalidArgumentException('Amount is required.');
        }
    
        // Ensure the data is formatted correctly for Razorpay
        $orderData = [
            'amount' => (int)($data['amount'] * 100), // Amount should be in paise
            'currency' => $data['currency'] ?? 'INR', // Default to INR
            'receipt' => (string)($data['receipt'] ?? null), // Ensure receipt is a string


        ];
    
        try {
            // Create the order using Razorpay API
            $order = $this->api->order->create($orderData);
    
            // Log the order response for debugging
            \Log::info('Razorpay Order Response:', (array) $order);
    
            // Return the created order object
            return $order;
        } catch (\Exception $e) {
            \Log::error('Error creating Razorpay order: ' . $e->getMessage());
            throw $e;
        }
    }
    
    

    // Verify the payment signature from Razorpay
    public function verifyWebhookSignature($webhookBody, $webhookSignature, $webhookSecret)
    {
        try {
            // Verify the webhook signature using Razorpay SDK
            $this->api->utility->verifyWebhookSignature($webhookBody, $webhookSignature, $webhookSecret);
            return true;
        } catch (\Exception $e) {
            // Log the exception message if needed
            // \Log::error('Webhook signature verification failed: ' . $e->getMessage());
            return false;
        }
    }

    // Fetch the payment details from Razorpay for reconciliation
    public function fetchPaymentDetails($paymentId)
{
    try {
        // Use Razorpay's payment API to retrieve the payment details
        $payment = $this->api->payment->fetch($paymentId);

        // Check if the response is an array or an object
        if (is_array($payment)) {
            // Handle case where payment details might be an array
            return [
                'status' => 'error',
                'message' => 'Received payment details in an unexpected format.',
            ];
        }

        // Return payment details in an array, formatted according to your schema
        return [
            'status' => 'success',
            'data' => [
                'id' => $payment->id,
                'status' => $payment->status,
                'amount' => $payment->amount, // Amount in paise
                'method' => $payment->method,
                'captured' => $payment->captured,
                'created_at' => date('Y-m-d H:i:s', $payment->created_at), // Format created_at
            ],
        ];
    } catch (BadRequestError $e) {
        return [
            'status' => 'error',
            'message' => 'Failed to fetch payment details: ' . $e->getMessage(),
        ];
    } catch (\Exception $e) {
        return [
            'status' => 'error',
            'message' => 'An error occurred while fetching payment details.',
        ];
    }
}

}
