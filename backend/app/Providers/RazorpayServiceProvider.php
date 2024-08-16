<?php

/**
 * Service provider for Razorpay services.
 * File opened by Juniad on 26-07-2024.
 * Status: closed
 * --------------------------------------
 */

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\RazorpayService;

class RazorpayServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton(RazorpayService::class, function ($app) {
            return new RazorpayService();
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
