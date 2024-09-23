<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRefundsTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('refunds', function (Blueprint $table) {
            // Primary Key
            $table->id();

            // Fields
            $table->string('refund_id')->unique();  // Unique string for refund_id
            $table->string('payment_id');  // payment_id referred from payments table
            $table->string('status');  // Status of the refund
            $table->decimal('amount', 10, 2);  // Amount of the refund
            $table->string('method');  // Refund method

            // Timestamps
            $table->timestamps();

            // Foreign Key Constraint linking to the payment_id of payments table
            $table->foreign('payment_id')->references('payment_id')->on('payments')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('refunds');
    }
}
