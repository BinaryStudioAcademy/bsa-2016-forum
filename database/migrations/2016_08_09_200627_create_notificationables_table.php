<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

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
            $table->foreign('notification_id')->references('id')->on('notifications');

            $table->integer('notificationtable_id')->unsigned();

            $table->string('notificationable_type');
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
        Schema::table('notificationtables', function(Blueprint $table) {
            $table->dropForeign('notificationtables_notification_id_foreign');
        });

        Schema::drop('notificationtables');
    }
}
