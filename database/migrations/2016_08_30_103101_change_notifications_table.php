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
        Schema::table('notifications', function (Blueprint $table) {
            Schema::drop('notifications');
        });

        Schema::create('subscriptions', function(Blueprint $table) {
            $table->increments('id');

            $table->integer('user_id')->unsigned()->nullable();;
            $table->foreign('user_id')->references('id')->on('users');
            $table->integer('subscription_id');
            $table->string('subscription_type');
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
        Schema::table('subscriptions', function (Blueprint $table) {
            Schema::drop('subscriptions');
        });

        Schema::table('notifications', function (Blueprint $table) {
            $table->removeColumn('subscription_id');
            $table->removeColumn('subscription_type');
            $table->softDeletes();
        });
    }
}
