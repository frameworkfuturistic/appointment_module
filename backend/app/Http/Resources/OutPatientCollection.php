<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class OutPatientCollection extends ResourceCollection
{
    public function toArray($request)
    {
        return $this->collection->transform(function($outPatient){
            return new OutPatientResource($outPatient);
        });
    }
}

