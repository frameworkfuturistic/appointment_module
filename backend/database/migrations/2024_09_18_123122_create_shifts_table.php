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
        Schema::create('shifts', function (Blueprint $table) {
            $table->id(); // Primary key: 'id'
            $table->string('shift_name'); // Shift name, e.g., 'Morning', 'Evening'
            $table->time('start_time'); // Start time for the shift
            $table->time('end_time'); // End time for the shift
            $table->timestamps(); // Adds created_at and updated_at timestamps
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shifts'); // Drops the table if exists
    }
};
