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
        Schema::create('departments', function (Blueprint $table) {
            $table->id(); // Primary key: 'id' field
            $table->string('department_name'); // Department name as a string
            $table->string('department_code')->unique(); // Department code as a unique string
            $table->boolean('is_active')->default(true); // Active flag as boolean (true = active, false = inactive)
            $table->timestamps(); // Adds created_at and updated_at timestamps
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('departments'); // Drops the table if exists
    }
};
