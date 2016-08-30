<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeNotificationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('notifications', function(Blueprint $table)
        {
            $table->integer('notification_id');
            $table->string('notification_type');
            $table->removeColumn('deleted_at');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('notifications', function(Blueprint $table)
        {
            $table->removeColumn('notification_id');
            $table->removeColumn('notification_type');
            $table->softDeletes();
        });
    }
}
