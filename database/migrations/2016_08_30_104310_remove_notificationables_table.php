<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RemoveNotificationablesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('notificationables');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::create('notificationables', function(Blueprint $table) {
            $table->increments('id');

            $table->integer('notification_id')->unsigned();
            $table->foreign('notification_id')->references('id')->on('notifications');

            $table->integer('notificationable_id')->unsigned();

            $table->string('notificationable_type');
            $table->softDeletes();
            $table->timestamps();
        });
    }
}
