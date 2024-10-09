<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;

    // Specify the table associated with the model
    protected $table = 'opd_onlineappointments';

    // Specify the primary key
    protected $primaryKey = 'OPDOnlineAppointmentID';

    // Specify whether the ID is auto-incrementing
    public $incrementing = true;

     // Specify if timestamps are maintained
     public $timestamps = true; // Enable timestamps

     // Specify the fields that can be mass assigned
     protected $fillable = [
        'OPDOnlineAppointmentID',
         'ConsultantID',
         'MRNo',
         'ConsultationDate',
         'SlotID',
         'SlotToken',
         'Remarks',
         'Pending',
         'PatientName',
         'MobileNo',
         'TransactionID',
         'CreatedOn',
         'ModifiedBy',
         'ModifiedOn',
         'created_at', // Add to fillable if necessary
         'updated_at'  // Add to fillable if necessary
     ];

    // Define relationships
    public function consultant()
    {
        return $this->belongsTo(Consultant::class, 'ConsultantID', 'ConsultantID');
    }

    public function patient()
    {
        return $this->belongsTo(Patient::class, 'MRNo', 'MRNo');
    }

    public function slot()
    {
        return $this->belongsTo(TimeSlot::class, 'SlotID', 'SlotID');
    }
}
