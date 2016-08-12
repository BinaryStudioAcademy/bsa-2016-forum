<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserStatusesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */

    public function run()
    {
        DB::table('user_statuses')->delete();
        DB::table('user_statuses')->insert([
            'name' => 'online',
            'created_at' => date("Y-m-d H:i:s"),
            'updated_at' => date("Y-m-d H:i:s"),
        ]);
        DB::table('user_statuses')->insert([
            'name' => 'offline',
            'created_at' => date("Y-m-d H:i:s"),
            'updated_at' => date("Y-m-d H:i:s"),
        ]);
    }
}
