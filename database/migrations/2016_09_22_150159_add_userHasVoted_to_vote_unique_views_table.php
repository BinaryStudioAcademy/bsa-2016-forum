<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddUserHasVotedToVoteUniqueViewsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('vote_unique_views', function (Blueprint $table) {
            $table->string('userHasVoted')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('vote_unique_views', function (Blueprint $table) {
            $table->dropColumn('userHasVoted');
        });
    }
}
