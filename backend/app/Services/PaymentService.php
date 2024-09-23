<?php

namespace App\Services;

use App\Repositories\Interfaces\AppointmentRepositoryInterface;
use App\Repositories\Interfaces\PaymentRepositoryInterface;
use Illuminate\Support\Facades\Log;

class PaymentService
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

    public function handlePaymentCallback($webhookBody, $webhookSignature, $webhookSecret)
    {
        // Verify the webhook signature
        $isSignatureValid = $this->razorpayService->verifyWebhookSignature($webhookBody, $webhookSignature, $webhookSecret);

        if (!$isSignatureValid) {
            return ['status' => 'error', 'message' => 'Invalid webhook signature.'];
        }

        // Decode the JSON payload into an associative array
        $data = json_decode($webhookBody, true);

        // Extract relevant payment details
        $paymentId = $data['payload']['payment']['entity']['id'];
        $orderId = $data['payload']['order']['entity']['id'];
        $receipt = $data['payload']['order']['entity']['receipt'];
        $status = $data['payload']['payment']['entity']['status'];
        $amount = $data['payload']['payment']['entity']['amount'];
        $method = $data['payload']['payment']['entity']['method'];

        // Store payment details in the database
        $this->paymentRepository->create([
            'payment_id' => $paymentId,
            'appointment_id' => $receipt,
            'status' => $status,
            'order_id' => $orderId,
            'amount' => $amount,
            'method' => $method
        ]);

        if ($status === 'captured') {
            return ['status' => 'success', 'message' => 'Payment successful and verified.'];
        }

        return ['status' => 'error', 'message' => 'Payment not captured.'];
    }

    public function reconcilePayment($paymentId)
    {
        // Retrieve payment from local database
        $payment = $this->paymentRepository->getById($paymentId);

        if (!$payment) {
            return ['status' => 'error', 'message' => 'Payment not found.'];
        }

        // Fetch payment details from Razorpay
        $gatewayResponse = $this->razorpayService->fetchPaymentDetails($payment->payment_id);

        if ($gatewayResponse['status'] === 'error') {
            return ['status' => 'error', 'message' => 'Failed to fetch payment status from Razorpay.'];
        }

        $gatewayPaymentStatus = $gatewayResponse['data']['status'];

        // Update the local payment status if necessary
        if ($payment->status !== $gatewayPaymentStatus) {
            $payment->status = $gatewayPaymentStatus;
            $payment->save();

            Log::info('Payment reconciliation: updated payment status.', [
                'payment_id' => $payment->payment_id,
                'old_status' => $payment->getOriginal('status'),
                'new_status' => $payment->status,
            ]);

            return ['status' => 'success', 'message' => 'Payment status updated successfully.', 'data' => $payment];
        }

        return ['status' => 'success', 'message' => 'Payment is already up to date.', 'data' => $payment];
    }

    public function getPaymentHistory()
    {
        return $this->paymentRepository->getAll();
    }

    public function getPaymentById($id)
    {
        return $this->paymentRepository->getById($id);
    }
}
