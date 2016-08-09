<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNotificationablesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notificationtables', function(Blueprint $table) {
            $table->increments('id');

            $table->integer('notification_id')->unsigned();
            $table->foreign('notification_id')->references('id')->on('notifications')->onDelete('cascade');

            $table->integer('notificationtable_id')->unsigned();
            $table->foreign('notificationtable_id')->references('id')->on('notificationtables')->onDelete('cascade');

            $table->string('notification_type');

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
        Schema::table('notificationtables', function(Blueprint $table) {
            $table->dropForeign('notificationtables_notification_id_foreign');
            $table->dropForeign('notificationtables_notificationtable_id_foreign');
        });

        Schema::drop('notificationtables');
    }
}
