<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

class CreateLikeablesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('likeables', function(Blueprint $table) {
            $table->increments('id');
            $table->integer('like_id')->unsigned();
            $table->foreign('like_id')->references('id')->on('likes');

            $table->integer('likeable_id')->unsigned();
            $table->string('likeable_type');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('likeables', function(Blueprint $table) {
            $table->dropForeign('likeables_like_id_foreign');
        });
        Schema::drop('likeables');
    }
}
