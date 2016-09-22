<?php

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Message;

class MessagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $me = User::where('id', 2)->first();
        $interlocutor = User::all()->except(2)->random();
        $users = User::all()->except([2, $interlocutor->id]);

        $phrases = [
            'Hi! How are you?',
            'What do you think about that?',
            'Thanks',
            'Tell me about her, please.'
        ];

        $dialogue = [
            [
                'from' => 1,
                'text' => 'Hi!'
            ],
            [
                'from' => 0,
                'text' => 'Hi! Why not write for so long?!'
            ],
            [
                'from' => 1,
                'text' => 'Оh, sorry. I was very busy last week.'
            ],
            [
                'from' => 0,
                'text' => 'Ok. I thought something bad had happened with you!'
            ],
            [
                'from' => 1,
                'text' => 'No! I am well, thanks!'
            ],
            [
                'from' => 0,
                'text' => 'When will you come to visit me!?'
            ],
            [
                'from' => 1,
                'text' => 'I don\'t know. Maybe next Sunday.'
            ],
            [
                'from' => 0,
                'text' => 'Ok. I\'ll wait for you.'
            ],
        ];

        $now = \Carbon\Carbon::now()->subMinutes(count($dialogue) * 5);

        $addMin = 0;
        foreach ($dialogue as $item) {
            $message = new Message();
            $message->is_read = 1;
            $message->message = $item['text'];
            if ($item['from']) {
                $message->user()->associate($me);
                $message->toUser()->associate($interlocutor);
            } else {
                $message->user()->associate($interlocutor);
                $message->toUser()->associate($me);
            }
            $message->created_at = $now->addMinutes($addMin);
            $message->updated_at = $message->created_at;
            $addMin = rand(1, 5);
            $message->save();
        }

        $fromMe = true;
        $except = [];
        $subMin = rand(5, 15);
        foreach ($phrases as $phrase) {
            $randomUser = $users->except($except)->random();
            $except[] = $randomUser->id;
            $message = new Message();
            $message->is_read = 1;
            $message->message = $phrase;
            if ($fromMe) {
                $message->user()->associate($me);
                $message->toUser()->associate($randomUser);
                $fromMe = false;
            } else {
                $message->user()->associate($randomUser);
                $message->toUser()->associate($me);
                $fromMe = true;
            }
            $message->created_at = $now->subMinutes($subMin);
            $message->updated_at = $message->created_at;
            $subMin = rand(25, 45);
            $message->save();
        }

//        factory(App\Models\Message::class, 10)
//            ->make()
//            ->each(function ($message) use ($users) {
//                $fromUser = $users->random();
//                $toUser = $users->except($fromUser->id)->random();
//                $message->user()->associate($fromUser);
//                $message->toUser()->associate($toUser);
//                $message->save();
//            });
    }
}
