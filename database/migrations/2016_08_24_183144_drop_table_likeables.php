<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DropTableLikeables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('likeables', function (Blueprint $table) {
            Schema::drop('likeables');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('likeables', function (Blueprint $table) {
            Schema::create('likeables', function(Blueprint $table) {
                $table->increments('id');
                $table->integer('like_id')->unsigned();
                $table->foreign('like_id')->references('id')->on('likes');

                $table->integer('likeable_id')->unsigned();
                $table->string('likeable_type');
                $table->softDeletes();
                $table->timestamps();
            });
        });
    }
}
