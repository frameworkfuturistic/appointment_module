<?php

/**
 * Model for OPD Registrations table.
 * File opened by Juniad on 26-07-2024.
 * Status: Closed
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment  extends Model
{
    use HasFactory;

    // Specify the table associated with the model
    protected $table = 'opd_consultations';

    // Specify the primary key for the model
    protected $primaryKey = 'OPDConsultationID';

    // Disable auto-incrementing if the primary key is not an incrementing integer
    public $incrementing = true; // Set to false if using a UUID or similar

    // Specify the data types of the primary key
    protected $keyType = 'int'; // Change to 'string' if using a UUID

    // Fillable fields for mass assignment
    protected $fillable = [
        'ConsultantID',
        'RegistrationID',
        'ConsultationDate',
        'ConsultedAt',
        'FreeConsultation',
        'FirstConsultation',
        'ShiftID',
        'TokenNo',
        'Canceled',
        'Remarks',
        'Pending',
        'PatientName',
        'MobileNo',
        'CreatedBy',
        'CreatedOn',
        'ModifiedBy',
        'ModifiedOn',
    ];
    public $timestamps = false; // Disable automatic timestamps

    // Cast attributes to specific data types
    protected $casts = [
        'ConsultationDate' => 'datetime', // Automatically cast to Carbon instance
        'FreeConsultation' => 'boolean',   // Cast to boolean
        'FirstConsultation' => 'boolean',   // Cast to boolean
        'Canceled' => 'boolean',             // Cast to boolean
        'Pending' => 'boolean',              // Cast to boolean
    ];

    // Define relationships if applicable
    public function consultant()
    {
        return $this->belongsTo(Consultant::class, 'ConsultantID');
    }

    public function shift()
    {
        return $this->belongsTo(Shift::class, 'ShiftID');
    }

    // Additional methods or scopes can be added here
}
