<?php

/**
 * Service provider for Repository services.
 * File opened by Junaid on 26-07-2024.
 * Status: open
 * ----------------------------------------
 */

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\Interfaces\AppointmentRepositoryInterface;
use App\Repositories\Interfaces\PaymentRepositoryInterface;
use App\Repositories\Interfaces\RefundRepositoryInterface;
use App\Repositories\AppointmentRepository;
use App\Repositories\PaymentRepository;
use App\Repositories\RefundRepository;
use App\Repositories\PatientRepository;
use App\Repositories\Interfaces\PatientRepositoryInterface;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(AppointmentRepositoryInterface::class, AppointmentRepository::class);
        $this->app->bind(PaymentRepositoryInterface::class, PaymentRepository::class);
        //$this->app->bind(RefundRepositoryInterface::class, RefundRepository::class);
        $this->app->bind(PatientRepositoryInterface::class, PatientRepository::class);

    }

    public function boot()
    {
        //
    }
}

