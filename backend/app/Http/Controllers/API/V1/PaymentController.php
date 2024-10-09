<?php

namespace App\Http\Controllers\API\V1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\RazorpayService;
use App\Models\Payment;
use Illuminate\Support\Facades\DB;

class PaymentController extends Controller
{
    protected $razorpayService;

    public function __construct(RazorpayService $razorpayService)
    {
        $this->razorpayService = $razorpayService;
    }

    // Method to initiate payment
    public function createPayment(Request $request)
    {
        // Validate incoming request data
        $validated = $request->validate([
            'OPDOnlineAppointmentID' => 'required|integer|exists:opd_onlineappointments,OPDOnlineAppointmentID',
            'AmountPaid' => 'required|numeric', // Ensure this is a valid number
            'PaymentMode' => 'required|string|max:50', // Validate payment mode
            'CreatedBy' => 'nullable|integer', // Optional creator ID
        ]);
    
        DB::beginTransaction(); // Start the transaction
    
        try {
            // Set CreatedBy to null if not provided in the request
            $createdBy = isset($validated['CreatedBy']) ? $validated['CreatedBy'] : null;
    
            // Create a new payment record
            $payment = Payment::create([
                'OPDOnlineAppointmentID' => $validated['OPDOnlineAppointmentID'],
                'PaymentDate' => now(), // Set current date/time
                'PaymentMode' => $validated['PaymentMode'],
                'PaymentStatus' => 'Pending', // Initial status
                'AmountPaid' => $validated['AmountPaid'],
                'TransactionID' => null, // Will be updated after Razorpay order creation
                'CreatedBy' => $createdBy, // Use the extracted or default value
            ]);
    
            // Prepare order data for Razorpay
            $orderData = [
                'amount' => $validated['AmountPaid'], // Convert to paise
                'currency' => 'INR',
                'receipt' => $payment->PaymentID, // Associate the receipt with payment ID
            ];
    
            // Create order with Razorpay service
            $razorpayOrder = $this->razorpayService->createOrder($orderData);
    
            // Update payment with Razorpay transaction ID
            $payment->TransactionID = $razorpayOrder->id;
            $payment->save(); // Save the payment record
    
            DB::commit(); // Commit the transaction
    
            // Return successful response
            return response()->json([
                'message' => 'Payment initiated successfully.',
                'payment_id' => $payment->PaymentID,
                'order_id' => $razorpayOrder->id,
            ], 201);
        } catch (\Exception $e) {
            \Log::error('Payment initiation failed: ' . $e->getMessage(), [
                'request' => $request->all(), // Log the request data
                'stack_trace' => $e->getTraceAsString() // Log the stack trace
            ]);
            DB::rollBack(); // Rollback the transaction on error
            return response()->json([
                'message' => 'Payment initiation failed: ' . $e->getMessage(),
            ], 500);
        }
    }
    


    // Handle Razorpay payment callback
    public function handlePaymentCallback(Request $request)
    {
        $webhookBody = $request->getContent();
        $webhookSignature = $request->header('X-Razorpay-Signature');
        $webhookSecret = config('razorpay.webhook_secret');
    
        // Call the service method for verifying the webhook signature
        $isValidSignature = $this->razorpayService->verifyWebhookSignature($webhookBody, $webhookSignature, $webhookSecret);
    
        if ($isValidSignature) {
            $payload = json_decode($webhookBody, true);
            $paymentId = $payload['payload']['payment']['id'];

            // Update the payment status based on the received webhook
            $payment = Payment::where('TransactionID', $paymentId)->first();
            if ($payment && $payment->PaymentStatus !== 'Completed') {
                $payment->PaymentStatus = 'Completed';
                $payment->PaymentDate = now();
                $payment->save();
            }
    
            return response()->json(['message' => 'Webhook processed successfully'], 200);
        }
    
        return response()->json(['message' => 'Invalid signature'], 400);
    }
    
    // Method to reconcile payment (for internal use, if needed)
    public function reconcilePayment($paymentId)
    {
        // Example method; implement reconciliation logic as needed
        $result = $this->razorpayService->fetchPaymentDetails($paymentId);
        return response()->json($result);
    }

    // Method to get payment history
    public function getPaymentHistory(Request $request)
    {
        // Example method; implement payment history retrieval logic as needed
        $payments = Payment::all(); // Replace with appropriate logic if needed
        return response()->json($payments);
    }
    
    // Method to get payment details by ID
    public function getPaymentById(Request $request)
    {
        $paymentId = $request->input('payment_id');
    
        if (!$paymentId || !is_numeric($paymentId)) {
            return response()->json(['message' => 'Invalid payment ID'], 400);
        }
    
        $payment = Payment::find($paymentId);
    
        if (!$payment) {
            return response()->json(['message' => 'Payment not found'], 404);
        }
    
        return response()->json($payment);
    }
}
