<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVoteResultsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vote_results', function(Blueprint $table) {
            $table->increments('id');

            $table->integer('vote_id')->unsigned();
            $table->foreign('vote_id')->references('id')->on('votes')->onDelete('cascade');

            $table->integer('vote_item_id')->unsigned();
            $table->foreign('vote_item_id')->references('id')->on('vote_items')->onDelete('cascade');

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
        Schema::table('vote_results', function(Blueprint $table) {
            $table->dropForeign('vote_results_vote_id_foreign');
            $table->dropForeign('vote_results_vote_item_id_foreign');
            $table->dropForeign('vote_results_user_id_foreign');
        });

        Schema::drop('vote_results');
    }
}
