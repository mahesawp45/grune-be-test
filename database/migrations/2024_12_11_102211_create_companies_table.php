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
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50);
            $table->string('email', 255)->unique();
            $table->string('postcode', 7);
            $table->foreignId('prefecture_id')->constrained('prefectures');
            $table->string('city', 255);
            $table->string('local', 255);
            $table->string('street_address', 255)->nullable();
            $table->string('business_hour', 255)->nullable();
            $table->text('regular_holiday')->nullable();
            $table->string('phone')->nullable();
            $table->string('fax', 50)->nullable();
            $table->string('url', 255)->nullable();
            $table->string('license_number', 50)->nullable();
            $table->string('image');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};
