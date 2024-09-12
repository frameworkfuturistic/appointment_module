<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OutPatientResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'patientId' => $this->patient_id,
            'patientName' => $this->patient_name,
            'fatherName' => $this->father_name,
            'address' => $this->address,
            'city' => $this->city,
            'mobile' => $this->mobile,
            'gender' => $this->gender,
            'refBy' => $this->ref_by,
        ];
    }
}

