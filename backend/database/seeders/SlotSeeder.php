<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TimeSlot;

class SlotSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Define sample slot records
        $slots = [
            [
                'slot_name' => 'Slot 1',
            ],
            [
                'slot_name' => 'Slot 2',
            ],
            [
                'slot_name' => 'Slot 3',
            ],
            // Add more slots as needed
        ];

        // Insert records into the database
        foreach ($slots as $slot) {
            TimeSlot::create($slot);
        }
    }
}
