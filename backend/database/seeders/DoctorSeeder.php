<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Doctor;

class DoctorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Define sample doctor records
        $doctors = [
            [
                'doctor_name' => 'Dr. John Doe',
                'is_active' => true,
                'department_id' => 1, // Assume department with ID 1 exists, adjust as needed
                'date_of_birth' => '1975-06-15',
                'blood_group' => 'A+',
                'phone_number' => '1234567890',
                'email' => 'john.doe@example.com',
                'address' => '123 Main Street',
                'city' => 'Springfield',
                'state' => 'Illinois',
                'pincode' => '62701',
            ],
            [
                'doctor_name' => 'Dr. Jane Smith',
                'is_active' => true,
                'department_id' => 2, // Assume department with ID 2 exists, adjust as needed
                'date_of_birth' => '1980-04-25',
                'blood_group' => 'B-',
                'phone_number' => '0987654321',
                'email' => 'jane.smith@example.com',
                'address' => '456 Elm Street',
                'city' => 'Springfield',
                'state' => 'Illinois',
                'pincode' => '62702',
            ],
            [
                'doctor_name' => 'Dr. Sarah Johnson',
                'is_active' => false,
                'department_id' => 1, // Assuming same department as John Doe
                'date_of_birth' => '1985-01-10',
                'blood_group' => 'O+',
                'phone_number' => '1122334455',
                'email' => 'sarah.johnson@example.com',
                'address' => '789 Oak Street',
                'city' => 'Springfield',
                'state' => 'Illinois',
                'pincode' => '62703',
            ],
        ];

        // Insert records into the database
        foreach ($doctors as $doctor) {
            Doctor::create($doctor);
        }
    }
}
