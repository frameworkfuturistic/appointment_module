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
            // Add the 'shift' column as a string after 'unavailable_date'
            $table->string('shift')->after('unavailable_date')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('unavailable_dates', function (Blueprint $table) {
            // Drop the 'shift' column if rolling back
            $table->dropColumn('shift');
        });
    }
};
