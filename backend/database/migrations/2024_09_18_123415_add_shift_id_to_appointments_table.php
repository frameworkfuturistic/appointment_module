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
        Schema::table('appointments', function (Blueprint $table) {
            $table->unsignedBigInteger('shift_id'); // Foreign key for the shift

            // Add the foreign key constraint
            $table->foreign('shift_id')
                  ->references('id')
                  ->on('shifts')
                  ->onDelete('cascade'); // Cascade delete if shift is deleted
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('appointments', function (Blueprint $table) {
            $table->dropForeign(['shift_id']); // Drop the foreign key
            $table->dropColumn('shift_id'); // Drop the column
        });
    }
};
