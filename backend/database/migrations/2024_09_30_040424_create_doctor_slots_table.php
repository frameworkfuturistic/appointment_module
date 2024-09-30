<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDoctorSlotsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('doctor_slots', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('ConsultantID');
            $table->date('Date');
            $table->time('SlotTime');
            $table->boolean('IsBooked')->default(false);
            $table->timestamps();

            // If the consultant table uses foreign keys, you can define it like this:
            // $table->foreign('ConsultantID')->references('id')->on('consultants')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('doctor_slots');
    }
}
