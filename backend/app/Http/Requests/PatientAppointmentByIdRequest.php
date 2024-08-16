<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PatientAppointmentByIdRequest extends FormRequest
{
    public function authorize()
    {
        return true; 
    }

    public function rules()
    {
        return [
            'patient_id' => 'required|integer|exists:patients,id',
            'appointment_id' => 'required|integer|exists:appointments,id',
        ];
    }
}
