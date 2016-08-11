<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTopicsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('topics', function(Blueprint $table) {
            $table->increments('id');
            $table->integer('reviewed_number')->default(0);
            $table->string('name')->unique();
            $table->text('description')->nullable();
            $table->integer('rating')->default(0);
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');
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
        Schema::table('topics', function(Blueprint $table) {
            $table->dropForeign('topics_user_id_foreign');
        });
        Schema::drop('topics');
    }
}
