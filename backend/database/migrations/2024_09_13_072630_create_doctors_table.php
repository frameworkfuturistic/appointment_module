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
        Schema::create('doctors', function (Blueprint $table) {
            $table->id(); // Primary key: 'id'
            $table->string('doctor_name'); // Doctor name as a string
            $table->boolean('is_active')->default(true); // Active flag as boolean (true = active, false = inactive)
            $table->unsignedBigInteger('department_id'); // Foreign key for the department
            
            $table->date('date_of_birth'); // Date of birth
            $table->string('blood_group', 3); // Blood group (e.g., A+, O-)
            $table->string('phone_number', 15); // Phone number
            $table->string('email')->unique(); // Email (must be unique)
            $table->text('address'); // Full address
            $table->string('city'); // City
            $table->string('state'); // State
            $table->string('pincode', 10); // Pincode (postal code)
            $table->text('availability'); // Availability details (text or string depending on length)

            $table->timestamps(); // Adds created_at and updated_at timestamps

            // Define foreign key constraint
            $table->foreign('department_id')
                  ->references('id')
                  ->on('departments')
                  ->onDelete('cascade'); // Cascade delete if department is deleted
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('doctors'); // Drops the table if it exists
    }
};
