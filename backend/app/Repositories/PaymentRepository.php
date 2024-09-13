<?php

/**
 * Repository for handling payment-related data operations.
 * File opened by Juniad on 26-07-2024.
 * Status: closed
 * --------------------------------------
 */

namespace App\Repositories;

use App\Models\Payment;
use App\Repositories\Interfaces\PaymentRepositoryInterface;

class PaymentRepository implements PaymentRepositoryInterface
{
    // Define the Payment model instance
    protected $model;

    // Constructor to initialize the Payment model through dependency injection
    public function __construct(Payment $payment)
    {
        $this->model = $payment;
    }

    // Create a new payment with the given data
    public function create(array $data)
    {
        return $this->model->create($data);
    }

    // Find payments by appointment ID
    public function findByAppointmentId($appointmentId)
    {
        return $this->model->where('appointment_id', $appointmentId)->get();
    }

    // Retrieve all payments
    public function getAll()
    {
        return $this->model->all();
    }

    // Get a payment by its ID 
    public function getById($id)
    {
        $this->model->findOrFail($id); 
    }
}
