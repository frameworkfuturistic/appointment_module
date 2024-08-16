<?php 

namespace App\Repositories\Interfaces;

interface PaymentRepositoryInterface
{
    public function create(array $data);
    public function find($id);
    public function findByAppointmentId($appointmentId);
    public function getAll();
    public function getById($id);
}