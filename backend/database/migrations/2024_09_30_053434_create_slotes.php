<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSlotsTable extends Migration
{
    public function up()
    {
        Schema::create('slots', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('consultant_id');
            $table->unsignedBigInteger('shift_id');
            $table->date('date');
            $table->string('slot_time');
            $table->string('slot_token')->unique();
            $table->boolean('is_booked')->default(false);
            $table->timestamps();

            $table->foreign('consultant_id')->references('ConsultantID')->on('gen_consultants')->onDelete('cascade');
            $table->foreign('shift_id')->references('ShiftID')->on('gen_shifts')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('slots');
    }
}
