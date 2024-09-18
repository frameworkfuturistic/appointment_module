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
    return [
        'is_new_patient' => 'required|boolean',
        'patient_id' => [
            'required_if:is_new_patient,false', // Require 'patient_id' if it's an existing patient
            'integer'
        ],
        'doctor_id' => 'required|integer',
        'time_slot' => 'required|date|after:now',
        'date' => 'required|date',
        'amount' => 'required|numeric|min:0',
        
        // New patient fields
        'patient_name' => [
            'required_if:is_new_patient,true', // Require if new patient
            'string'
        ],
        'father_name' => [
            'required_if:is_new_patient,true', // Require if new patient
            'string'
        ],
        'address' => [
            'required_if:is_new_patient,true', // Require if new patient
            'string'
        ],
        'city' => [
            'required_if:is_new_patient,true', // Require if new patient
            'string'
        ],
        'state' => [
            'required_if:is_new_patient,true', // Require if new patient
            'string'
        ],
        'pincode' => [
            'required_if:is_new_patient,true', // Require if new patient
            'string|size:6' // Adjust validation as needed
        ],
        'mobile' => [
            'required_if:is_new_patient,true', // Require if new patient
            'string|size:10' // Adjust validation as needed
        ],
        'gender' => [
            'required_if:is_new_patient,true', // Require if new patient
            'in:male,female,other' // Adjust options as needed
        ],
        'ref_by' => [
            'nullable', // Optional field for new patient
            'string'
        ],
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
