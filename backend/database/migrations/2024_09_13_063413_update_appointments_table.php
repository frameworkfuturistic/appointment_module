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
        // Modify the existing 'appointments' table
        Schema::table('appointments', function (Blueprint $table) {
            // Add a new appointment_id field
            $table->string('appointment_id')->after('id'); 

            // Rename 'appointment_time' to 'time_slot'
            $table->renameColumn('appointment_time', 'time_slot');

            // Add a new 'date' field for storing the appointment date
            $table->date('date')->after('doctor_id');

            // Update foreign keys to reference the new tables
            $table->unsignedBigInteger('patient_id')->change();
            $table->unsignedBigInteger('doctor_id')->change();

            // Add foreign key constraints with the new tables
            $table->foreign('patient_id')
                  ->references('patient_id')
                  ->on('out_patients')  // Reference 'out_patients' table for patients
                  ->onDelete('cascade');  // Cascade delete if patient is deleted

            $table->foreign('doctor_id')
                  ->references('id')
                  ->on('doctors')  // Reference 'doctors' table for doctors
                  ->onDelete('cascade');  // Cascade delete if doctor is deleted
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Reverse the modifications
        Schema::table('appointments', function (Blueprint $table) {
            // Drop the 'date' column
            $table->dropColumn('date');

            // Drop the 'appointment_id' field
            $table->dropColumn('appointment_id');

            // Revert the 'time_slot' field back to 'appointment_time'
            $table->renameColumn('time_slot', 'appointment_time');

            // Drop the foreign key constraints
            $table->dropForeign(['patient_id']);
            $table->dropForeign(['doctor_id']);
        });
    }
};
