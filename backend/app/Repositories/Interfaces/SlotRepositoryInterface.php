<?php

namespace App\Repositories\Interfaces;

interface SlotRepositoryInterface
{
    public function getAll();
    public function getById($id);
}
