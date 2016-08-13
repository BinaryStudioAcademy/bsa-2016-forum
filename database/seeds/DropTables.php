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
        \DB::table('comments')->delete();
        \DB::table('messages')->delete();
        \DB::table('topics')->delete();
        \DB::table('users')->delete();
        \DB::table('roles')->delete();
        \DB::table('role_user')->delete();
        \DB::table('user_statuses')->delete();
    }
}
