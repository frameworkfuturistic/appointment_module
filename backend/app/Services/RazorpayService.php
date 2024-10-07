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
        // Ensure the data is formatted correctly for Razorpay
        $orderData = [
            'amount' => $data['amount'] * 100, // Convert to smallest currency unit (paise)
            'currency' => $data['currency'] ?? 'INR', // Default to INR
            'receipt' => $data['receipt'] ?? null, // Optional receipt ID
        ];

        return $this->api->order->create($orderData);
    }

    // Verify the payment signature from Razorpay
    public function verifyWebhookSignature($webhookBody, $webhookSignature, $webhookSecret)
    {
        try {
            // Verify the webhook signature using Razorpay SDK
            $this->api->utility->verifyWebhookSignature($webhookBody, $webhookSignature, $webhookSecret);
            return true;
        } catch (\Exception $e) {
            // Return false if the signature verification fails
            return false;
        }
    }

    // Fetch the payment details from Razorpay for reconciliation
    public function fetchPaymentDetails($paymentId)
    {
        try {
            // Use Razorpay's payment API to retrieve the payment details
            $payment = $this->api->payment->fetch($paymentId);

            // Return payment details in an array
            return [
                'status' => 'success',
                'data' => [
                    'id' => $payment->id,
                    'status' => $payment->status,
                    'amount' => $payment->amount,
                    'method' => $payment->method,
                    'captured' => $payment->captured,
                    'created_at' => $payment->created_at,
                ]
            ];
        } catch (BadRequestError $e) {
            // Handle any errors in the API call
            return [
                'status' => 'error',
                'message' => $e->getMessage(),
            ];
        } catch (\Exception $e) {
            return [
                'status' => 'error',
                'message' => 'An error occurred while fetching payment details.'
            ];
        }
    }
}
