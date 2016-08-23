<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

class CreateCommentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('comments', function(Blueprint $table) {
            $table->increments('id');
            $table->text('content_origin');
            $table->integer('rating')->nullable()->default(0);

            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');


            $table->text('content_generated')->nullable();

            //PolyMorph relation Many to One
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
        Schema::table('comments', function(Blueprint $table) {
            $table->dropForeign('comments_user_id_foreign');
        });
        Schema::drop('comments');
    }
}
