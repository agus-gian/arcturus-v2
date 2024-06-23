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
        Schema::create('states', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->bigInteger('country_id');
            $table->string('country_code');
            $table->string('fips_code')->nullable();
            $table->string('iso2')->nullable();
            $table->string('type')->nullable();
            $table->decimal('latitude')->nullable();
            $table->decimal('longitude')->nullable();
            $table->tinyInteger('flag')->nullable();
            $table->string('wikiDataId')->nullable();
            $table->timestamps();

            $table->index(['country_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('states');
    }
};
