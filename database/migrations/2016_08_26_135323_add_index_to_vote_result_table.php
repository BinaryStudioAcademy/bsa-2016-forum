<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddIndexToVoteResultTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('vote_results', function (Blueprint $table) {
            $table->unique(['vote_item_id', 'user_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
//        Schema::table('vote_results', function (Blueprint $table) {
//            $table->dropUnique(['vote_item_id', 'user_id']);
//        });
    }
}
