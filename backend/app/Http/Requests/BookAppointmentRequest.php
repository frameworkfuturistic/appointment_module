<?php

/**
 * Request for BookAppointment
 * Opened by: Junaid
 * Open Date: 25-08-2024
 * Status: Closed
 */

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;

class BookAppointmentRequest extends FormRequest
{
    // Determine if the user is authorized to make this request.
    public function authorize()
    {
        return true;
    }

    // Get the validation rules that apply to the request.
    public function rules()
    {
        // Define validation rules for booking an appointment
        return [
            'patient_id' => 'required|integer',
            'doctor_id' => 'required|integer',
            'appointment_time' => 'required|date|after:now',
            'amount' => 'required|numeric|min:0',
        ];
    }

    // Handle a failed validation attempt.
    protected function failedValidation(Validator $validator)
    {
        // Store the validation errors and pass them to the controller
        $errors = $validator->errors()->toArray();
        $this->validationErrors = $errors;

        // Do not throw an exception here
    }

    // Method to retrieve validation errors
    public function getValidationErrors()
    {
        return $this->validationErrors ?? [];
    }
}
