<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\OutPatient;

class OutPatientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Define sample outpatient records
        $outPatients = [
            [
                'patient_name' => 'John Smith',
                'father_name' => 'Robert Smith',
                'address' => '123 Maple Street',
                'city' => 'Springfield',
                'state' => 'Illinois',
                'pincode' => '62704',
                'mobile' => '1234567890',
                'gender' => 'Male',
                'ref_by' => 'Dr. Brown',
            ],
            [
                'patient_name' => 'Mary Johnson',
                'father_name' => 'Thomas Johnson',
                'address' => '456 Oak Avenue',
                'city' => 'Springfield',
                'state' => 'Illinois',
                'pincode' => '62705',
                'mobile' => '0987654321',
                'gender' => 'Female',
                'ref_by' => 'Dr. Green',
            ],
            [
                'patient_name' => 'James Williams',
                'father_name' => 'William Williams',
                'address' => '789 Pine Road',
                'city' => 'Springfield',
                'state' => 'Illinois',
                'pincode' => '62706',
                'mobile' => '1122334455',
                'gender' => 'Male',
                'ref_by' => 'Dr. White',
            ],
        ];

        // Insert records into the database
        foreach ($outPatients as $outPatient) {
            OutPatient::create($outPatient);
        }
    }
}
