<?php

/**
 * Model for Payment table.
 * File opened by Juniad on 26-07-2024.
 * Status: closed
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'appointment_id',
        'payment_id',
        'amount',
        'order_id',
        'status'
    ];

    public function appointment()
    {
        return $this->belongsTo(Appointment::class, 'appointment_id', 'appointment_id'); 
        // Make sure the foreign key 'appointment_id' in payments references 'appointment_id' in appointments
    }

    public function refund()
    {
        return $this->hasOne(Refund::class);
    }
}
