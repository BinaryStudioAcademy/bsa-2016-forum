<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTaggablesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('taggable', function(Blueprint $table) {
            $table->increments('id');

            $table->integer('tag_id')->unsigned();
            $table->foreign('tag_id')->references('id')->on('tags');

            $table->integer('taggable_id')->unsigned();
            $table->foreign('taggable_id')->references('id')->on('taggable');

            $table->string('taggable_type');
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
        Schema::table('taggable', function(Blueprint $table) {
            $table->dropForeign('taggable_tag_id_foreign');
            $table->dropForeign('taggable_taggable_id_foreign');
        });

        Schema::drop('taggable');
    }
}
