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
}
