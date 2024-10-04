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

    // Specify the fields that can be mass assigned
    protected $fillable = [
        'ConsultantID',
        'MRNo',
        'RegistrationID',
        'ConsultationDate',
        'SlotID',
        'SlotToken',
        'ShiftID',
        'Remarks',
        'Pending',
        'PatientName',
        'MobileNo',
        'TransactionID',
        'CreatedBy',
        'CreatedOn',
        'ModifiedBy',
        'ModifiedOn',
    ];

    // Define relationships
    public function consultant()
    {
        return $this->belongsTo(Consultant::class, 'ConsultantID', 'ConsultantID');
    }

    public function registration()
    {
        return $this->belongsTo(Patient::class, 'MRNo', 'MRNo');
    }

    public function patient()
    {
        return $this->belongsTo(Patient::class, 'MRNo', 'MRNo');
    }

    public function slot()
    {
        return $this->belongsTo(TimeSlot::class, 'SlotID', 'SlotID');
    }

    public function shift()
    {
        return $this->belongsTo(Shift::class, 'ShiftID', 'ShiftID');
    }
}
