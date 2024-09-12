<?php

/**
 * Collection for APIs related to appointments 
 * Opened by: Junaid
 * Open Date: 25-08-2024
 * Status: Closed
 */

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class AppointmentCollection extends ResourceCollection
{
    public function toArray($request)
    {
        return [
            $this->collection->map(function ($appointment) {
                return new AppointmentResource($appointment);
            }),
        ];
    }
}
