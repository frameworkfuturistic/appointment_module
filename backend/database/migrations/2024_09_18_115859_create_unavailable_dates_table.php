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
        Schema::create('unavailable_dates', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->unsignedBigInteger('doctor_id'); // Foreign key for the doctor
            $table->date('unavailable_date'); // Date when the doctor is unavailable
            $table->enum('shift', ['shift_1', 'shift_2', 'both'])->default('both'); // Either Shift 1, Shift 2, or both
            
            $table->timestamps(); // created_at and updated_at

            // Define foreign key constraint
            $table->foreign('doctor_id')
                  ->references('id')
                  ->on('doctors')
                  ->onDelete('cascade'); // Cascade delete if doctor is deleted

            // Ensure no duplicate unavailability entries for the same doctor, date, and shift
            $table->unique(['doctor_id', 'unavailable_date', 'shift']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('unavailable_dates'); // Drops the table if it exists
    }
};
