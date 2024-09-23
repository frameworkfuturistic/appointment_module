<?php

namespace App\Repositories;

use App\Models\UnavailableDate;
use App\Repositories\Interfaces\UnavailabilityRepositoryInterface;

class UnavailabilityRepository implements UnavailabilityRepositoryInterface
{

    public function getAll()
    {
        return UnavailableDate::all();
    }

    public function getById($id)
    {
        return UnavailableDate::findOrFail($id);
    }
}
