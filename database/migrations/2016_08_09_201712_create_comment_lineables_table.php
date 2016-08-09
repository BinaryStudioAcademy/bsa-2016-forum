<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCommentLineablesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('comment_lineabbles', function(Blueprint $table) {
            $table->increments('id');

            $table->integer('comment_id')->unsigned();
            $table->foreign('comment_id')->references('id')->on('comments')->onDelete('cascade');

            $table->integer('comment_lineabble_id')->unsigned();
            $table->foreign('comment_lineabble_id')->references('id')->on('comment_lineabbles')->onDelete('cascade');
            $table->string('comment_type');
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
        Schema::table('comment_lineabbles', function(Blueprint $table) {
            $table->dropForeign('comment_lineabbles_comment_id_foreign');
            $table->dropForeign('comment_lineabbles_comment_lineabble_id_foreign');
        });
        Schema::drop('comment_lineabbles');
    }
}
