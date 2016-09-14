<?php

use Illuminate\Database\Migrations\Migration;

class RenameNotificationPolymorphTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::rename('notificationtables', 'notificationables');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::rename('notificationables', 'notificationtables');
    }
}
