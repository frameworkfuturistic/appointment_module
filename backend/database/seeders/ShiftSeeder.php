<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Shift;

class ShiftSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Define sample shift records
        $shifts = [
            [
                'shift_name' => 'Morning Shift',
                'start_time' => '08:00:00', // Start time in HH:MM:SS format
                'end_time' => '12:00:00',   // End time in HH:MM:SS format
            ],
            [
                'shift_name' => 'Afternoon Shift',
                'start_time' => '13:00:00',
                'end_time' => '17:00:00',
            ],
            [
                'shift_name' => 'Evening Shift',
                'start_time' => '18:00:00',
                'end_time' => '22:00:00',
            ],
        ];

        // Insert records into the database
        foreach ($shifts as $shift) {
            Shift::create($shift);
        }
    }
}
