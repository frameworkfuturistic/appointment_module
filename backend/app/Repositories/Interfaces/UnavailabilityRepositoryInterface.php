<?php

namespace App\Repositories\Interfaces;

interface UnavailabilityRepositoryInterface
{
    public function getAll();
    public function getById($id);
}
