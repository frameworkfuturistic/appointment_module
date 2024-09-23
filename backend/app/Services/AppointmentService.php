<?php

/**
 * Service Class for APIs related to appointments 
 * Opened by: Junaid
 * Open Date: 26-08-2024
 * Status: Open
 */

namespace App\Services;

use App\Repositories\Interfaces\AppointmentRepositoryInterface;
use App\Repositories\Interfaces\DepartmentRepositoryInterface;
use App\Repositories\Interfaces\DoctorRepositoryInterface;
use App\Repositories\Interfaces\UnavailabilityRepositoryInterface;
use App\Repositories\Interfaces\ShiftRepositoryInterface;
use App\Repositories\Interfaces\SlotRepositoryInterface;
use App\Services\RazorpayService;
class AppointmentService
{
    // Constructor with multiple repositories and payment service
    protected $appointmentRepository;
    protected $razorpayService;
    protected $departmentRepository;
    protected $doctorRepository;
    protected $unavailabilityRepository;
    protected $shiftRepository;
    protected $slotRepository;

    // Initialize with repository and payment service
    public function __construct(
        AppointmentRepositoryInterface $appointmentRepository,
        RazorpayService $razorpayService,
        DepartmentRepositoryInterface $departmentRepository,
        DoctorRepositoryInterface $doctorRepository,
        UnavailabilityRepositoryInterface $unavailabilityRepository,
        ShiftRepositoryInterface $shiftRepository,
        SlotRepositoryInterface $slotRepository
    ) {
        $this->appointmentRepository = $appointmentRepository;
        $this->razorpayService = $razorpayService;
        $this->departmentRepository = $departmentRepository;
        $this->doctorRepository = $doctorRepository;
        $this->unavailabilityRepository = $unavailabilityRepository;
        $this->shiftRepository = $shiftRepository;
        $this->slotRepository = $slotRepository;
    }

    // Method to get all data from all related models
    // Fetch all data from Department, Doctor, Unavailability, Shift, and Slot
    public function getAllData()
    {
        return [
            'departments' => $this->departmentRepository->getAll(),
            'doctors' => $this->doctorRepository->getAll(),
            'unavailabilities' => $this->unavailabilityRepository->getAll(),
            'shifts' => $this->shiftRepository->getAll(),
            'slots' => $this->slotRepository->getAll(),
        ];
    }

    // Book a new appointment and initiate payment
    public function bookAppointment($patientId, $doctorId, $timeSlot, $date, $amount)
    {
        // Check if an appointment already exists for the same patient, doctor, and datetime
        $existingAppointment = $this->appointmentRepository->findByPatientDoctorAndTime($patientId, $doctorId, $timeSlot, $date);

        if ($existingAppointment) {
            return [
                'status' => 'error',
                'message' => 'An appointment already exists for this patient and doctor at the same time.'
            ];
        }

        // Check if another appointment exists at the same time for the doctor
        $docAppointmentAtSameTime = $this->appointmentRepository->findByDocTime($doctorId, $timeSlot, $date);

        if ($docAppointmentAtSameTime) {
            return [
                'status' => 'error',
                'message' => 'Doctor appointment already booked at this time. Please choose a different time.'
            ];
        }

        // Check if another appointment exists at the same time for the patient
        $patientAppointmentAtSameTime = $this->appointmentRepository->findByPatientTime($patientId, $timeSlot, $date);

        if ($patientAppointmentAtSameTime) {
            return [
                'status' => 'error',
                'message' => 'Patient appointment with another doctor at this time. Please choose a different time.'
            ];
        }

        // Create a new appointment with generated appointment_id
        $appointment = $this->appointmentRepository->create([
            'patient_id' => $patientId,
            'doctor_id' => $doctorId,
            'time_slot' => $timeSlot,
            'date' => $date,
            'status' => 'pending',
        ]);

        // Initiate payment for the created appointment
        $paymentDetails = $this->initiatePayment($appointment->appointment_id, $amount);

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
