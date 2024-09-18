<?php

/**
 * Model for Appointments table.
 * File opened by Juniad on 26-07-2024.
 * Status: closed
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;

    protected $primaryKey = 'appointment_id'; // Set the primary key to 'appointment_id'
    public $incrementing = false; // Disable auto-incrementing for appointment_id
    protected $keyType = 'string'; // Set the key type to string

    protected $fillable = [
        'appointment_id',
        'patient_id',
        'doctor_id',
        'appointment_time',
        'status',
        'method'
    ];

    public function patient()
    {
        return $this->belongsTo(User::class, 'patient_id');
    }

    public function doctor()
    {
        return $this->belongsTo(User::class, 'doctor_id');
    }

    public function payment()
    {
        return $this->hasOne(Payment::class);
    }
}
