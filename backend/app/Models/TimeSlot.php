<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TimeSlot extends Model
{
    use HasFactory;

    protected $table = 'opd_doctorslots';
    protected $primaryKey = 'SlotID';

    protected $fillable = [
        'ConsultantID',
        'ConsultationDate',
        'SlotTime',
        'SlotToken',
        'MaxSlots',
        'AvailableSlots',
        'isBooked', // Add isBooked field
        'AppointmentID', // New field for linking appointments
    ];

    // Disable Eloquent's timestamps
    public $timestamps = false;

    // Method to check if a slot is available
    public function isAvailable()
    {
        return $this->AvailableSlots > 0 && !$this->isBooked; // Check for availability and if it's booked
    }

    // Relationship with appointments
    public function appointments()
    {
        return $this->hasMany(Appointment::class, 'SlotID', 'SlotID');
    }
}
