<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTagablesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tagables', function(Blueprint $table) {
            $table->increments('id');

            $table->integer('tag_id')->unsigned();
            $table->foreign('tag_id')->references('id')->on('tags')->onDelete('cascade');

            $table->integer('tagable_id')->unsigned();
            $table->foreign('tagable_id')->references('id')->on('tagables')->onDelete('cascade');

            $table->string('tagable_type');
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
        Schema::table('tagables', function(Blueprint $table) {
            $table->dropForeign('tagables_tag_id_foreign');
            $table->dropForeign('tagables_tagable_id_foreign');
        });

        Schema::drop('tagables');
    }
}
