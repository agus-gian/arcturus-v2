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
        Schema::create('travel_agents', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id');
            $table->string('name')->fulltext();
            $table->string('slug');
            $table->longText('description')->nullable()->fulltext();
            $table->string('image_logo')->nullable();
            $table->text('address');
            $table->bigInteger('country_id');
            $table->bigInteger('state_id');
            $table->bigInteger('city_id');
            $table->json('coordinate')->nullable();
            $table->boolean('active')->default(true);
            $table->timestamps();
            $table->softDeletes();

            $table->index(['user_id','country_id','state_id','city_id'],'property_index');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('travel_agents');
    }
};
