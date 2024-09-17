<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('time_slots', function (Blueprint $table) {
            $table->id('slot_id'); // Creating 'slot_id' as the primary key
            $table->string('slot_name'); // Creating 'slot_name' as a string field
            $table->timestamps(); // Adding created_at and updated_at timestamps
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('time_slots'); // Drop the 'time_slots' table if it exists
    }
};
