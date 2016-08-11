<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

class CreateAttachmenttablesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('attachmenttables', function(Blueprint $table) {
            $table->increments('id');

            $table->integer('attachment_id')->unsigned();
            $table->foreign('attachment_id')->references('id')->on('attachments');

            $table->integer('attachmenttable_id')->unsigned();

            $table->string('attachmenttable_type');
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
        Schema::table('attachmenttables', function(Blueprint $table) {
            $table->dropForeign('attachmenttables_attachment_id_foreign');
        });

        Schema::drop('attachmenttables');
    }
}
