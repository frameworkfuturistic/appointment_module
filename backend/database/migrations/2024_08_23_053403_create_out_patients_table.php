<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOutPatientsTable extends Migration
{
    public function up()
    {
        Schema::create('out_patients', function (Blueprint $table) {
            $table->id('patient_id'); // Primary Key
            $table->string('patient_name');
            $table->string('father_name');
            $table->text('address');
            $table->string('city');
            $table->string('state');
            $table->string('pincode');
            $table->string('mobile');
            $table->string('gender');
            $table->string('ref_by')->nullable();; // Reference by
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('out_patients');
    }
};
