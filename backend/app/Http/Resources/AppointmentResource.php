<?php

/**
 * Resources for APIs related to appointments 
 * Opened by: Junaid
 * Open Date: 25-08-2024
 * Status: Closed
 */

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AppointmentResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'patient_id' => $this->patient_id,
            'doctor_id' => $this->doctor_id,
            'appointment_time' => $this->appointment_time,
            'status' => $this->status,
        ];
    }
}
