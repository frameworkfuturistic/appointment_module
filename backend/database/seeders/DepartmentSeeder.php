<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Department;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Define a few department records for testing
        $departments = [
            [
                'department_name' => 'Cardiology',
                'department_code' => 'CARD',
                'is_active' => true,
            ],
            [
                'department_name' => 'Neurology',
                'department_code' => 'NEUR',
                'is_active' => true,
            ],
            [
                'department_name' => 'Orthopedics',
                'department_code' => 'ORTH',
                'is_active' => false,
            ],
        ];

        // Insert records into the database
        foreach ($departments as $department) {
            Department::create($department);
        }
    }
}
