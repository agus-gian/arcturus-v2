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
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->string('type')->comment('hotel|villa|guest_house');
            $table->string('name')->fulltext();
            $table->string('slug');
            $table->string('phone_number')->nullable();
            $table->string('email')->nullable();
            $table->text('address');
            $table->bigInteger('country_id');
            $table->bigInteger('state_id');
            $table->bigInteger('city_id');
            $table->longText('description')->nullable()->fulltext();
            $table->string('featured_image')->nullable();
            $table->string('featured_banner_image')->nullable();
            $table->json('coordinate')->nullable();
            $table->string('video_embed_url')->nullable();
            $table->json('policy')->nullable();
            $table->string('star_rate')->default('1');
            $table->decimal('review_score')->default(0);
            $table->boolean('active')->default(true);
            $table->timestamps();
            $table->softDeletes();

            $table->index(['country_id','state_id','city_id'],'property_index');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};
