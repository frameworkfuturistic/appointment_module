<?php

/**
 * Model for Refund table.
 * File opened by Juniad on 26-07-2024.
 * Status: closed
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Refund extends Model
{
    use HasFactory;

    protected $fillable = [
        'payment_id',
        'refund_id',
        'amount'
    ];

    public function payment()
    {
        return $this->belongsTo(Payment::class);
    }
}
