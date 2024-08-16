<?php

/**
 * Service Class for APIs related to appointments 
 * Opened by: Junaid
 * Open Date: 26-08-2024
 * Status: Open
 */

namespace App\Services;

use App\Repositories\Interfaces\AppointmentRepositoryInterface;
use App\Services\RazorpayService;

class AppointmentService
{
    protected $appointmentRepository;
    protected $razorpayService;

    // Initialize with repository and payment service
    public function __construct(AppointmentRepositoryInterface $appointmentRepository, RazorpayService $razorpayService)
    {
        $this->appointmentRepository = $appointmentRepository;
        $this->razorpayService = $razorpayService;
    }

    // Book a new appointment and initiate payment
    public function bookAppointment($patientId, $doctorId, $appointmentTime, $amount)
    {
        // Check if an appointment already exists for the same patient, doctor, and datetime
        $existingAppointment = $this->appointmentRepository->findByPatientDoctorAndTime($patientId, $doctorId, $appointmentTime);

        if ($existingAppointment) {
            return [
                'status' => 'error',
                'message' => 'An appointment already exists for this patient and doctor at the same time.'
            ];
        }

        // Check if another appointment exists at the same time for the doctor
        $docAppointmentAtSameTime = $this->appointmentRepository->findByDocTime($doctorId,$appointmentTime);

        if ($docAppointmentAtSameTime) {
            return [
                'status' => 'error',
                'message' => 'Doctor appointment already booked at this time. Please choose a different time.'
            ];
        }

        // Check if another appointment exists at the same time for the patient
        $patientAppointmentAtSameTime = $this->appointmentRepository->findByPatientTime($patientId,$appointmentTime);

        if ($patientAppointmentAtSameTime) {
            return [
                'status' => 'error',
                'message' => 'Patient appointment with another doctor at this time. Please choose a different time.'
            ];
        }

        // Create a new appointment
        $appointment = $this->appointmentRepository->create([
            'patient_id' => $patientId,
            'doctor_id' => $doctorId,
            'appointment_time' => $appointmentTime,
            'status' => 'pending',
        ]);

        // Initiate payment for the created appointment
        $paymentDetails = $this->initiatePayment($appointment->id, $amount);

        return ['status' => 'success', 'data' => $paymentDetails];
    }

    // Handle payment initiation through Razorpay
    protected function initiatePayment($appointmentId, $amount)
    {
        $receipt = (string) $appointmentId;

        // Create a new Razorpay order
        $order = $this->razorpayService->createOrder([
            'amount' => $amount * 100, // Amount in paise
            'currency' => 'INR',
            'receipt' => $receipt,
        ]);

        return [
            'order_id' => $order->id,
            'currency' => $order->currency,
            'amount' => $order->amount,
            'order' => $order
        ];
    }

    // Retrieve all appointments
    public function getAllAppointments()
    {
        return $this->appointmentRepository->getAll();
    }

    // Retrieve appointment details by ID
    public function getAppointmentById($appointmentId)
    {
        return $this->appointmentRepository->find($appointmentId);
    }

    // Retrieve appointment history by patient ID
    public function getHistoryByPatientId($patientId)
    {
        return $this->appointmentRepository->getHistoryByPatientId($patientId);
    }

    // Retrieve appointments by doctor ID
    public function getAppointmentsByDoctorId($doctorId)
    {
        return $this->appointmentRepository->getAllByDoctorId($doctorId);
    }

    // Retrieve specific patient's appointment by ID
    public function getPatientAppointmentById($patientId, $appointmentId)
    {
        return $this->appointmentRepository->getPatientAppointmentById($patientId, $appointmentId);
    }
}
