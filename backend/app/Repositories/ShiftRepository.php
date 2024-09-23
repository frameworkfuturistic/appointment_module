<?php

namespace App\Repositories;

use App\Models\Shift;
use App\Repositories\Interfaces\ShiftRepositoryInterface;

class ShiftRepository implements ShiftRepositoryInterface
{
    public function getAll()
    {
        return Shift::all();
    }

    public function getById($id)
    {
        return Shift::allfindOrFail($id);
    }
}
