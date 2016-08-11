<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

class CreateVotePermissionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vote_permissions', function(Blueprint $table) {
            $table->increments('id');

            $table->integer('vote_id')->unsigned();
            $table->foreign('vote_id')->references('id')->on('votes');

            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');

            $table->boolean('grant')->default(1);
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
        Schema::table('vote_permissions', function(Blueprint $table) {
            $table->dropForeign('vote_permissions_vote_id_foreign');
            $table->dropForeign('vote_permissions_user_id_foreign');
        });

        Schema::drop('vote_permissions');
    }
}
