<?php

/**
 * Service file for Razorpay services.
 * File opened by Juniad on 26-07-2024.
 * Status: open
 * --------------------------------------
 */

namespace App\Services;

use Razorpay\Api\Api;

class RazorpayService
{
    // Define the Razorpay API instance
    protected $api;

    // Constructor to initialize the Razorpay API with key and secret from config
    public function __construct()
    {
        $this->api = new Api(config('razorpay.key'), config('razorpay.secret'));
    }

    // Create a new Razorpay order with the given data
    public function createOrder(array $data)
    {
        return $this->api->order->create($data);
    }

    // Verify the payment signature from Razorpay
    public function verifyPayment($paymentId, $orderId, $signature)
    {
        // Prepare the attributes for signature verification
        $attributes = [
            'razorpay_order_id' => $orderId,
            'razorpay_payment_id' => $paymentId,
            'razorpay_signature' => $signature,
        ];

        try {
            // Attempt to verify the payment signature
            $this->api->utility->verifyPaymentSignature($attributes);
            return true;
        } catch (\Exception $e) {
            // Return false if verification fails
            return false;
        }
    }
}
