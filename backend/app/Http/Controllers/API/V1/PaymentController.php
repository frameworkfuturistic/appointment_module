<?php

namespace App\Http\Controllers\API\V1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\PaymentService;

class PaymentController extends Controller
{
    protected $paymentService;

    public function __construct(PaymentService $paymentService)
    {
        $this->paymentService = $paymentService;
    }

    public function handlePaymentCallback(Request $request)
    {
        $webhookBody = $request->getContent();
        $webhookSignature = $request->header('X-Razorpay-Signature');
        $webhookSecret = config('razorpay.webhook_secret');

        $result = $this->paymentService->handlePaymentCallback($webhookBody, $webhookSignature, $webhookSecret);

        if ($result['status'] === 'success') {
            return response()->json(['message' => $result['message']], 200);
        }

        return response()->json(['message' => $result['message']], 400);
    }

    public function reconcilePayment($paymentId)
    {
        $result = $this->paymentService->reconcilePayment($paymentId);

        return response()->json($result);
    }

    public function getPaymentHistory(Request $request)
    {
        $payments = $this->paymentService->getPaymentHistory();
        return response()->json($payments);
    }

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
