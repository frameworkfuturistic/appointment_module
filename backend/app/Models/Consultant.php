<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Consultant extends Model
{
    use HasFactory;

    protected $table = 'gen_consultants'; // Your table name
    protected $primaryKey = 'ConsultantID'; // Primary key
    public $incrementing = true; // Primary key is auto-incrementing

    protected $fillable = [
        'ConsultantName',
        'ShortName',
        'ConsultantType',
        'Honour',
        'DepartmentID',
        'InhouseConsultant',
        'Specialization',
        'ProfessionalDegree',
        'Address',
        'Telephone',
        'DefaultConsultationMinutes',
        'OPDConsultationFee',
        'IPDConsultationFee',
        'Surgeon',
        'Anaesthetist',
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Hidden',
    ];

    // Relationship with departments, if needed
    public function department()
    {
        return $this->belongsTo(Department::class, 'DepartmentID', 'DepartmentID');
    }
}
