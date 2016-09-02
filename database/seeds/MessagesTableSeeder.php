<?php

use Illuminate\Database\Seeder;
use App\Models\User;

class MessagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = User::all();

        factory(App\Models\Message::class, 10)
            ->make()
            ->each(function ($message) use ($users) {
                $fromUser = $users->random();
                $toUser = $users->except($fromUser->id)->random();
                $message->user()->associate($fromUser);
                $message->toUser()->associate($toUser);
                $message->save();
            });
    }
}
