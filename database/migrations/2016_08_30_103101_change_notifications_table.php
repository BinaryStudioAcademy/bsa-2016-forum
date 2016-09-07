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
        Schema::rename('notifications', 'subscriptions');
        Schema::table('subscriptions', function(Blueprint $table)
        {
            $table->integer('subscription_id');
            $table->string('subscription_type');
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
            $table->removeColumn('subscription_id');
            $table->removeColumn('subscription_type');
            $table->softDeletes();
        });
    }
}
