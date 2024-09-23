<?php

namespace App\Repositories;

use App\Models\TimeSlot;
use App\Repositories\Interfaces\SlotRepositoryInterface;

class SlotRepository implements SlotRepositoryInterface
{

    public function getAll()
    {
        return TimeSlot::all();
    }

    public function getById($id)
    {
        return TimeSlot::findOrFail($id);
    }
}
