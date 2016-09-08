<?php

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Topic;
use App\Models\Vote;
use Illuminate\Database\Eloquent\Collection;


class SubscriptionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = User::all();
        $maxNotificationsCount = $users->count();

        $topics = Topic::all();
        foreach ($topics as $topic) {
            $notificationsCount = rand(1, $maxNotificationsCount);
            $randomUsers = $users->random($notificationsCount);
            if (!$randomUsers instanceof Collection) {
                $randomUsers =  new Collection([$randomUsers]);
            }
            $topic->subscribers()->sync($randomUsers->values('id'));
        }

        $votes = Vote::all();
        foreach ($votes as $vote) {
            $notificationsCount = rand(1, $maxNotificationsCount);
            $randomUsers = $users->random($notificationsCount);
            if (!$randomUsers instanceof Collection) {
                $randomUsers =  new Collection([$randomUsers]);
            }

            $vote->subscribers()->sync($randomUsers->values('id'));
        }
    }
}
