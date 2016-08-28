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
        Schema::table('vote_permissions', function (Blueprint $table) {
            $table->dropForeign('vote_permissions_vote_id_foreign');
            $table->dropForeign('vote_permissions_user_id_foreign');
        });

        Schema::rename('vote_permissions', 'user_vote_denied');

        Schema::table('user_vote_denied', function (Blueprint $table) {
            $table->dropColumn('grant');
            $table->foreign('vote_id')->references('id')->on('votes');
            $table->foreign('user_id')->references('id')->on('users');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('user_vote_denied', function (Blueprint $table) {
            $table->dropForeign('user_vote_denied_vote_id_foreign');
            $table->dropForeign('user_vote_denied_user_id_foreign');
        });

        Schema::rename('user_vote_denied', 'vote_permissions');

        Schema::table('vote_permissions', function (Blueprint $table) {
            $table->boolean('grant')->default(1);
            $table->foreign('vote_id')->references('id')->on('votes');
            $table->foreign('user_id')->references('id')->on('users');
        });
    }
}
