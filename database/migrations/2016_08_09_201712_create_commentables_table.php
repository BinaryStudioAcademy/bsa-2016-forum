<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

class CreateCommentablesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('commentables', function(Blueprint $table) {
            $table->increments('id');

            $table->integer('comment_id')->unsigned();
            $table->foreign('comment_id')->references('id')->on('comments');

            $table->integer('commentable_id')->unsigned();
            $table->string('commentable_type');
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
        Schema::table('commentables', function(Blueprint $table) {
            $table->dropForeign('commentables_comment_id_foreign');
        });
        Schema::drop('commentables');
    }
}
