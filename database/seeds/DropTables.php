<?php

use Illuminate\Database\Seeder;

class DropTables extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \DB::table('likeables')->delete();
        \DB::table('likes')->delete();
        \DB::table('comments')->delete();
        \DB::table('vote_items')->delete();
        \DB::table('bookmarks')->delete();
        \DB::table('messages')->delete();
        \DB::table('topics')->delete();
        \DB::table('votes')->delete();
        \DB::table('users')->delete();
        \DB::table('roles')->delete();
        \DB::table('user_statuses')->delete();
    }
}
