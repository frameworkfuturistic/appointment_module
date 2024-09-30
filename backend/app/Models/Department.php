<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use HasFactory;

    protected $table = 'gen_departments'; // Matches your table name
    protected $primaryKey = 'DepartmentID'; // Your primary key
    public $incrementing = true; // Primary key is auto-incrementing

    // Generally, you won't include the primary key in fillable unless you're manually assigning it.
    protected $fillable = [
        'DepartmentID',
        'Department', // Match the column name in your database
    ];

    // A department has many doctors
    public function doctors()
    {
        return $this->hasMany(Consultant::class, 'DepartmentID', 'DepartmentID');
    }
}
