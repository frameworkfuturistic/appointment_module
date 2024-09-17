<?php

/**
 * Controller for payments processing, verifying and fetching.
 * File opened by Juniad on 26-07-2024.
 * Status: open
 * ----------------------------------------------------------
 */

namespace App\Http\Controllers\API\V1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log; // For logging data
use App\Repositories\Interfaces\AppointmentRepositoryInterface;
use App\Repositories\Interfaces\PaymentRepositoryInterface;
use App\Services\RazorpayService;

class PaymentController extends Controller
{
    protected $appointmentRepository;
    protected $paymentRepository;
    protected $razorpayService;

    public function __construct(
        AppointmentRepositoryInterface $appointmentRepository,
        PaymentRepositoryInterface $paymentRepository,
        RazorpayService $razorpayService
    ) {
        $this->appointmentRepository = $appointmentRepository;
        $this->paymentRepository = $paymentRepository;
        $this->razorpayService = $razorpayService;
    }

    // Handle Razorpay payment callback
    public function handlePaymentCallback(Request $request)
    {
        // Get the raw webhook payload (body) and the signature from headers
        $webhookBody = $request->getContent(); // raw payload
        $webhookSignature = $request->header('X-Razorpay-Signature'); // signature from the header
        $webhookSecret = config('razorpay.webhook_secret'); // Fetch the secret from the config 

        // Verify the webhook signature using the RazorpayService
        $isSignatureValid = $this->razorpayService->verifyWebhookSignature($webhookBody, $webhookSignature, $webhookSecret);

        if (!$isSignatureValid) {
            // Return an error response if signature verification fails
            return response()->json(['message' => 'Invalid webhook signature.'], 400);
        }

        // Decode the JSON payload into an associative array
        $data = json_decode($webhookBody, true);

        // Extract relevant payment and order details from the webhook payload
        $paymentId = $data['payload']['payment']['entity']['id'];
        $orderId = $data['payload']['order']['entity']['id'];
        $reciept = $data['payload']['order']['entity']['receipt'];
        $status = $data['payload']['payment']['entity']['status'];
        $amount = $data['payload']['payment']['entity']['amount'];
        $method = $data['payload']['payment']['entity']['method'];

        // Process the payment and update the database
            $this->paymentRepository->create([
                'payment_id' => $paymentId,
                'appointment_id' => $reciept,
                'status' => $status,
                'order_id' => $orderId,
                'amount' => $amount,
                'method' => $method
            ]);

        if ($status === 'captured') {
            // Return a success response
            return response()->json(['message' => 'Payment successful and verified.'], 200);
        }

        // Return an error if payment was not captured
        return response()->json(['message' => 'Payment not captured.'], 400);
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
