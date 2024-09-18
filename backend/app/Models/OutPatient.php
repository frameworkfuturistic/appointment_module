<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OutPatient extends Model
{
    protected $table = 'out_patients';
    protected $primaryKey = 'patient_id';
    public $incrementing = false;
    protected $keyType = 'int';

    protected $fillable = [
        'patient_name', 'father_name', 'address', 'city', 'state', 'pincode', 'mobile', 'gender', 'ref_by'
    ];
}

