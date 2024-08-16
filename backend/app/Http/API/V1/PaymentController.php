<?php

/**
 * Controller for payments processing, verifying and fetching.
 * File opened by Juniad on 26-07-2024.
 * Status: open
 * ----------------------------------------------------------
 */

namespace App\Http\API\V1;

use App\Repositories\Interfaces\AppointmentRepositoryInterface;
use App\Repositories\Interfaces\PaymentRepositoryInterface;
use App\Services\RazorpayService;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PaymentController extends Controller
{
    // Define the repositories and service used by the controller
    protected $appointmentRepository;
    protected $paymentRepository;
    protected $razorpayService;

    // Constructor to initialize the repositories and service
    public function __construct(
        AppointmentRepositoryInterface $appointmentRepository,
        PaymentRepositoryInterface $paymentRepository,
        RazorpayService $razorpayService
    ) {
        $this->appointmentRepository = $appointmentRepository;
        $this->paymentRepository = $paymentRepository;
        $this->razorpayService = $razorpayService;
    }

    // Handle the payment callback from Razorpay
    public function handlePaymentCallback(Request $request)
    {
        // Retrieve necessary data from the request
        $paymentId = $request->input('payment_id');
        $orderId = $request->input('order_id');
        $signature = $request->input('signature');
        $appointmentId = $request->input('appointment_id');
        $paymentStatus = $request->input('payment_status'); // 'success' or 'failure'

        // Validate the request to ensure all necessary data is present
        if (!$paymentId || !$orderId || !$signature || !$appointmentId || !$paymentStatus) {
            return error_response('Invalid request', 400);
        }

        // Verify the payment signature using the Razorpay service
        if (!$this->razorpayService->verifyPayment($paymentId, $orderId, $signature)) {
            return error_response('Invalid payment signature', 400);
        }

        // Save the payment details in the database
        $payment = $this->paymentRepository->create([
            'payment_id' => $paymentId,
            'order_id' => $orderId,
            'status' => $paymentStatus,
            'amount' => $request->input('amount'), // Ensure amount is part of the request
            'appointment_id' => $appointmentId,
        ]);

        // If the payment is successful, update the appointment status
        if ($paymentStatus === 'success') {
            $appointment = $this->appointmentRepository->find($appointmentId);

            // If the appointment is not found, return an error response
            if (!$appointment) {
                return not_found_response('Appointment not found');
            }

            // Update the appointment status to confirmed and save it
            $appointment->status = 'confirmed';
            $appointment->save();

            // Return a success response
            return success_response(null, 'Payment successful, appointment confirmed');
        }

        // Return a failure response if the payment status is not successful
        return error_response('Payment failed');
    }


    // Get the payment history for the user
    public function getPaymentHistory(Request $request)
    {
        // Retrieve all payment records from the repository
        $payments = $this->paymentRepository->getAll();
        return response()->json($payments);
    }

    // Get a specific payment by its ID
    public function getPaymentById(Request $request)
    {
        // Retrieve the payment ID from the request
        $id = $request->input('payment_id');

        // Get the payment record from the repository
        $payment = $this->paymentRepository->getById($id);

        // If the payment is not found, return an error response
        if (!$payment) {
            return response()->json(['message' => 'Payment not found'], 404);
        }

        // Return the payment record as a JSON response
        return response()->json($payment);
    }
}
