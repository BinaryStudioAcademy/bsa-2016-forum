<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeVotePermissionsToVoteUserDeniedTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::rename('vote_permissions', 'user_vote_denied');
//        Schema::table('users', function ($table) {
//            $table->dropColumn('votes');
//        });
        Schema::table('user_vote_denied', function(Blueprint $table){
           $table->dropColumn('grant');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::rename('user_vote_denied', 'vote_permissions');
        Schema::table('user_vote_denied', function(Blueprint $table){
            $table->boolean('grant')->default(1);
        });
    }
}
