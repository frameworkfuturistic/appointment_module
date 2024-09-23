<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shift extends Model
{
    use HasFactory;

    protected $fillable = [
        'shift_name', 
        'start_time', 
        'end_time',
    ];

    // Define the relationship to Appointment
    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }
}
