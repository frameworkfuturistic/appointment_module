<?php

/**
 * Config for Razorpay credentials.
 * File opened by Juniad on 26-07-2024.
 * Status: closed
 * ------------------------------------
 */

return [
    'key' => env('RAZORPAY_KEY', ''),
    'secret' => env('RAZORPAY_SECRET', ''),
    'webhook_secret' => env('RAZORPAY_WEBHOOK_SECRET', ''),
];
