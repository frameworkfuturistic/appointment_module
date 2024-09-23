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
        Schema::table('unavailable_dates', function (Blueprint $table) {
            // Drop the 'shift' column
            $table->dropColumn('shift');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('unavailable_dates', function (Blueprint $table) {
            // Add the 'shift' column back with the original enum values and default
            $table->enum('shift', ['shift_1', 'shift_2', 'both'])->default('both');
        });
    }
};
