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
        $globalIds = [
            '56780606215c82267c1a3cc0',
            '567920fc215c82267c1a3cc3',
            '567a4f0f215c82267c1a3cc7',
            '567a5638b296f43825501236',
            '56782adb215c82267c1a3cc2',
            '567a6d5de07428ab2cc0b666',
            '567a6ebde07428ab2cc0b667',
            '567aa528af36a06513d96db2',
            '567aafcb4a25306f4ebeb0c9',
            '567ab1b24a25306f4ebeb0cd',
        ];
        $count_users = 10;

        factory(App\Models\User::class, $count_users)->create();
        
        $users = App\Models\User::all();
        $roleUser = \DB::table('roles')->where('name', 'User')->value('id');
        reset($globalIds);
        foreach ($users as $user){
            $user->role()->associate($roleUser);
            $user->global_id = current($globalIds);
            next($globalIds);
            $user->save();
        }
        /**
         * Set right role for required users
         */
        $user = \App\Models\User::first();
        $roleAdmin = \DB::table('roles')->where('name', 'Admin')->value('id');
        $user->role()->associate($roleAdmin);
        $user->save();

        $user = \App\Models\User::all()->last();
        $user->global_id = '577a16659829fe050adb3f5c';
        $user->email = 'tester_a@example.com';
        $user->save();
    }
}
