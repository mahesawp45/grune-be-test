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
        Schema::create('postcodes', function (Blueprint $table) {
            $table->id();
            $table->string('public_body_code');
            $table->string('old_postcode');
            $table->string('postcode');
            $table->string('prefecture_kana');
            $table->string('city_kana');
            $table->string('local_kana');
            $table->string('prefecture');
            $table->string('city');
            $table->string('local');
            $table->boolean('indicator_1')->default(0);
            $table->boolean('indicator_2')->default(0);
            $table->boolean('indicator_3')->default(0);
            $table->boolean('indicator_4')->default(0);
            $table->boolean('indicator_5')->default(0);
            $table->boolean('indicator_6')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('postcodes');
    }
};
