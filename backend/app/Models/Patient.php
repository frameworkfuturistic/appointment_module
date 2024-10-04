<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    use HasFactory;

    protected $table = 'mr_master'; // Use the existing mr_master table
    protected $primaryKey = 'MRNo'; // Set the primary key
    public $incrementing = false; // Ensure that MRNo is not auto-incremented

    // Disable timestamps
    public $timestamps = false;

    // Define the fillable attributes
    protected $fillable = [
        'MRNo', 
        'MRDate', 
        'PatientName',
        'Sex', 
        'DOB', 
        'Address1', 
        'City', 
        'State', 
        'Pin', 
        'MobileNo', 
    ];

    // Relationship with appointments
    public function appointments()
    {
        return $this->hasMany(Appointment::class, 'MRNo', 'MRNo');
    }
}
