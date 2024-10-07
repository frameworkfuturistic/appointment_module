<?php

namespace App\Http\Controllers\API\V1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\PaymentService;
use App\Models\Payment;
use Illuminate\Support\Facades\DB;

class PaymentController extends Controller
{
    protected $paymentService;

    public function __construct(PaymentService $paymentService)
    {
        $this->paymentService = $paymentService;
    }

    // Method to initiate payment
    public function createPayment(Request $request)
    {
        $validated = $request->validate([
            'OPDOnlineAppointmentID' => 'required|integer|exists:opd_onlineappointments,OPDOnlineAppointmentID',
            'AmountPaid' => 'required|numeric',
            'PaymentMode' => 'required|string|max:50',
            'CreatedBy' => 'nullable|integer',
        ]);

        // Start a transaction for payment creation and order creation
        DB::beginTransaction();

        try {
            // Create payment record in the database
            $payment = Payment::create([
                'OPDOnlineAppointmentID' => $validated['OPDOnlineAppointmentID'],
                'PaymentDate' => now(),
                'PaymentMode' => $validated['PaymentMode'],
                'PaymentStatus' => 'Pending',
                'AmountPaid' => $validated['AmountPaid'],
                'TransactionID' => null, // Will be updated later
                'CreatedBy' => $validated['CreatedBy'],
            ]);

            // Create a Razorpay order and store the order ID
            $orderData = [
                'amount' => $validated['AmountPaid'] * 100, // Convert to paise
                'currency' => 'INR',
                'receipt' => $payment->PaymentID, // Use payment ID as the receipt
            ];
            $razorpayOrder = $this->paymentService->razorpayService->createOrder($orderData);

            // Update the payment record with the Razorpay order ID
            $payment->TransactionID = $razorpayOrder->id;
            $payment->save();

            // Commit the transaction
            DB::commit();

            return response()->json([
                'message' => 'Payment initiated successfully.',
                'payment_id' => $payment->PaymentID,
                'order_id' => $razorpayOrder->id
            ], 201);
        } catch (\Exception $e) {
            // Rollback transaction on error
            DB::rollBack();
            return response()->json([
                'message' => 'Payment initiation failed: ' . $e->getMessage()
            ], 500);
        }
    }

    // Handle Razorpay payment callback
    public function handlePaymentCallback(Request $request)
    {
        $webhookBody = $request->getContent();
        $webhookSignature = $request->header('X-Razorpay-Signature');
        $webhookSecret = config('razorpay.webhook_secret');

        // Verify the webhook signature and process the payment
        $result = $this->paymentService->handlePaymentCallback($webhookBody, $webhookSignature, $webhookSecret);

        if ($result['status'] === 'success') {
            // Update payment status to 'Completed'
            $payment = Payment::where('TransactionID', $result['data']['payment_id'])->first();
            if ($payment) {
                $payment->PaymentStatus = 'Completed';
                $payment->save();
            }

            return response()->json(['message' => $result['message']], 200);
        }

        return response()->json(['message' => $result['message']], 400);
    }

    // Method to reconcile payment (for internal use, if needed)
    public function reconcilePayment($paymentId)
    {
        $result = $this->paymentService->reconcilePayment($paymentId);
        return response()->json($result);
    }

    // Method to get payment history
    public function getPaymentHistory(Request $request)
    {
        $payments = $this->paymentService->getPaymentHistory();
        return response()->json($payments);
    }

    // Method to get payment details by ID
    public function getPaymentById(Request $request)
    {
        $paymentId = $request->input('payment_id');
        $payment = $this->paymentService->getPaymentById($paymentId);

        if (!$payment) {
            return response()->json(['message' => 'Payment not found'], 404);
        }

        return response()->json($payment);
    }
}
