<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UnavailableDate extends Model
{
    use HasFactory;

    protected $fillable = ['doctor_id', 'unavailable_date', 'shift'];

    // Define the relationship with the Doctor model
    public function doctor()
    {
        return $this->belongsTo(Doctor::class);
    }

    public function shift()
    {
        return $this->belongsTo(Shift::class);
    }
}
