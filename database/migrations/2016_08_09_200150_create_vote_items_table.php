<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVoteItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vote_items', function(Blueprint $table) {
            $table->increments('id');
            $table->integer('vote_id')->unsigned();
            $table->foreign('vote_id')->references('id')->on('votes')->onDelete('cascade');
            $table->string('name');
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
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
        Schema::table('vote_items', function(Blueprint $table) {
            $table->dropForeign('vote_items_vote_id_foreign');
            $table->dropForeign('vote_items_user_id_foreign');
        });

        Schema::drop('vote_items');
    }
}
