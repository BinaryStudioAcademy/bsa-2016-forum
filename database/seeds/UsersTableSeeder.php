<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $count_users = 3;

        factory(App\Models\User::class, $count_users)->create();

        $user = \App\Models\User::first();

        /**
         * Set right role for required users
         */
        $roleAdmin = \DB::table('roles')->where('name', 'Admin')->value('id');
        $user->attachRole($roleAdmin);
    }
}
