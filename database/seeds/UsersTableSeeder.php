<?php

use Illuminate\Database\Seeder;
use App\Models\Status;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $count_users = 10;
        $statuses = Status::all();

        factory(App\Models\User::class, $count_users)
            ->make()
            ->each(function ($user) use ($statuses) {
                $randomStatus = $statuses->random();
                $user->status()->associate($randomStatus);
                $user->save();
            });
        
        $users = App\Models\User::all();
        $roleUser = \DB::table('roles')->where('name', 'User')->value('id');
        foreach ($users as $user){
            $user->role()->associate($roleUser);
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
