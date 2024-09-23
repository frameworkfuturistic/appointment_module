<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\UnavailableDate;
use App\Models\Doctor;
use App\Models\Shift;

class UnavailableDateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Fetch existing doctors and shifts
        $doctor = Doctor::first(); // Fetch the first doctor; adjust as needed
        $shifts = Shift::pluck('shift_name')->toArray(); // Fetch all shift names

        // Define sample unavailable dates
        $unavailableDates = [
            [
                'doctor_id' => $doctor->id ?? 1, // Use the first doctor's ID, or set a default
                'unavailable_date' => now()->addDays(1)->format('Y-m-d'), // Tomorrow's date
                'shift' => $shifts[0] ?? 'Morning', // Use the first shift name, or a default
            ],
            [
                'doctor_id' => $doctor->id ?? 1,
                'unavailable_date' => now()->addDays(2)->format('Y-m-d'), // The day after tomorrow
                'shift' => $shifts[1] ?? 'Evening',
            ],
            // Add more records as needed
        ];

        // Insert records into the database
        foreach ($unavailableDates as $unavailableDate) {
            UnavailableDate::create($unavailableDate);
        }
    }
}
