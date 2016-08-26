<?php

use Illuminate\Database\Migrations\Migration;

class RenameNotificationableIdColumn extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('notificationables', function($table)
        {
            $table->renameColumn('notificationtable_id', 'notificationable_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('notificationables', function($table)
        {
            $table->renameColumn('notificationable_id', 'notificationtable_id');
        });
    }
}
