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
        Schema::table('payments', function (Blueprint $table) {
            // Add new column 'order_id' as a string
            $table->string('order_id')->after('appointment_id')->nullable();

            // Modify the 'status' column to be a string instead of enum
            $table->string('status')->default('initiated')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('payments', function (Blueprint $table) {
            // Drop the 'order_id' column
            $table->dropColumn('order_id');

            // Revert the 'status' column back to enum
            $table->enum('status', ['initiated', 'captured', 'refunded'])->default('initiated')->change();
        });
    }
};
