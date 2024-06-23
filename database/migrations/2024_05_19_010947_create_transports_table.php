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
        Schema::create('transports', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id');
            $table->string('name');
            $table->string('slug');
            $table->text('address')->nullable();
            $table->bigInteger('country_id')->nullable();
            $table->bigInteger('state_id')->nullable();
            $table->bigInteger('city_id')->nullable();
            $table->string('phone_number')->nullable();
            $table->string('email')->unique()->nullable();
            $table->decimal('price')->default(0);
            $table->boolean('active')->default(false);
            $table->timestamps();
            $table->softDeletes();

            $table->index(['user_id','country_id','state_id','city_id'],'index_transport');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transports');
    }
};
