<?php

namespace App\Repositories\Interfaces;

interface AppointmentRepositoryInterface
{
    public function create(array $data);
    public function find($id);
    public function getAll();
    public function updateStatus($id, $status);
    public function getHistoryByPatientId($patientId);
    public function getAllByDoctorId($doctorId);
    public function getPatientAppointmentById($patientId, $appointmentId);
    public function findByPatientDoctorAndTime($patientId, $doctorId, $timeSlot, $date);
    public function findByDocTime($doctorId, $timeSlot, $date);
    public function findByPatientTime($patientId, $timeSlot, $date);
}
