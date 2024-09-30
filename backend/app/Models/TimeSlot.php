<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TimeSlot extends Model
{
    use HasFactory;

    protected $table = 'opd_doctorslots'; // Ensure this matches your actual table name

    protected $fillable = [
        'ConsultantID',
        'ConsultationDate',
        'SlotTime',
        'SlotToken',
        'MaxSlots',
        'AvailableSlots',
    ];

    // Disable Eloquent's timestamps as your columns are not the default 'created_at' and 'updated_at'
    public $timestamps = false;

    // If you want to manage timestamps manually, you can create custom functions to do so.
}
