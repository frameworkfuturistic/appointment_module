<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TimeSlot extends Model
{
    use HasFactory;

    // Define the table associated with the model
    protected $table = 'time_slots';

    // Specify the primary key for the model
    protected $primaryKey = 'slot_id';

    // Indicate if the IDs are auto-incrementing
    public $incrementing = true;

    // Indicate that the primary key is of type integer
    protected $keyType = 'int';

    // Disable timestamps if not using them
    public $timestamps = true;

    // Define fillable attributes for mass assignment
    protected $fillable = [
        'slot_name',
    ];
}
