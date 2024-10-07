<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AppointmentPayment extends Model
{
    use HasFactory;

    protected $table = 'opd_appointment_payments';

    protected $primaryKey = 'PaymentID'; // Set primary key

    // Ensure all relevant fields are fillable
    protected $fillable = [
        'OPDOnlineAppointmentID',
        'PaymentDate',
        'PaymentMode',
        'PaymentStatus',
        'AmountPaid',
        'TransactionID',
        'CreatedBy',
        'ModifiedBy', // Include ModifiedBy as fillable if needed
    ];

    // Define timestamps to handle created and updated times automatically
    public $timestamps = false; // Set to false as you're handling timestamps manually

    const CREATED_AT = 'CreatedOn';
    const UPDATED_AT = 'ModifiedOn';

    public function appointment()
    {
        return $this->belongsTo(Appointment::class, 'OPDOnlineAppointmentID', 'OPDOnlineAppointmentID'); 
    }
}
