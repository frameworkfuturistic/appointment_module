<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ConsultantShift extends Model
{
    use HasFactory;

    protected $table = 'gen_consultantshifts';
    protected $primaryKey = 'ConsultantShiftID';
    public $incrementing = true;

    protected $fillable = ['ConsultantID', 'ShiftID', 'Fee'];

    public function shift()
    {
        return $this->belongsTo(Shift::class, 'ShiftID', 'ShiftID');
    }

    public function consultant()
    {
        return $this->belongsTo(Consultant::class, 'ConsultantID', 'ConsultantID');
    }
}
