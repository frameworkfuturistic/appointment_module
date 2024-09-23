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
use App\Repositories\Interfaces\DepartmentRepositoryInterface;
use App\Repositories\DepartmentRepository;
use App\Repositories\Interfaces\DoctorRepositoryInterface;
use App\Repositories\DoctorRepository;
use App\Repositories\Interfaces\UnavailabilityRepositoryInterface;
use App\Repositories\UnavailabilityRepository;
use App\Repositories\Interfaces\ShiftRepositoryInterface;
use App\Repositories\ShiftRepository;
use App\Repositories\Interfaces\SlotRepositoryInterface;
use App\Repositories\SlotRepository;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(AppointmentRepositoryInterface::class, AppointmentRepository::class);
        $this->app->bind(PaymentRepositoryInterface::class, PaymentRepository::class);
        //$this->app->bind(RefundRepositoryInterface::class, RefundRepository::class);
        $this->app->bind(PatientRepositoryInterface::class, PatientRepository::class);
        $this->app->bind(DepartmentRepositoryInterface::class, DepartmentRepository::class);
        $this->app->bind(DoctorRepositoryInterface::class, DoctorRepository::class);
        $this->app->bind(UnavailabilityRepositoryInterface::class, UnavailabilityRepository::class);
        $this->app->bind(ShiftRepositoryInterface::class, ShiftRepository::class);
        $this->app->bind(SlotRepositoryInterface::class, SlotRepository::class);

    }

    public function boot()
    {
        //
    }
}

