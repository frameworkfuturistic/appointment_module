<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shift extends Model
{
    use HasFactory;

    protected $table = 'gen_shifts'; 
    protected $primaryKey = 'ShiftID'; 
    public $incrementing = true; 

    protected $fillable = ['ShiftName', 'StartTime', 'StartTimeAMPM', 'EndTime', 'EndTimeAMPM'];

     // Relationship with appointments
     public function appointments()
     {
         return $this->hasMany(Appointment::class, 'ShiftID', 'ShiftID');
     }
}
