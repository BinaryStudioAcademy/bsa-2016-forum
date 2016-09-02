<?php

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Notification;

class NotificationsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $notificationCount = 30;
        $users = User::all();

        for ($i = 0; $i < $notificationCount; $i++) {
            $randomUser = $users->random();
            $notification = new Notification();
            $notification->user()->associate($randomUser);
            $notification->save();
        }
    }
}
