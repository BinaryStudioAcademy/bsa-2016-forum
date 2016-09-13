<?php
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
class MakeFinishedAtVoteFieldNullable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::table('votes', function(Blueprint $table) {
      $table->dateTime('finished_at')->nullable()->default(null)->change();
    });
  }
  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    //
  }
}