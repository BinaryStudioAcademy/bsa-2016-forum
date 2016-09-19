<?php

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Tag;
use Illuminate\Database\Eloquent\Collection;
use App\Facades\MarkdownService;
use App\Models\VoteItem;

class HVoteTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = User::all();
        $exceptedUser = $users->except(2)->random();
        $exceptedUserName = $exceptedUser->first_name . ' ' . $exceptedUser->last_name;

// что подарить, поход (допустим в горы), поход в кино, поход в кафешку
        $votesList = [
            [
                'title' => 'Campaign to the mountains',
                'desc' => "In 2 weeks we are going in a campaign to the mountains. Who goes?",
                'tags' => ['campaign', 'mountains'],
                'is_public' => 1,
                'is_single' => 1,
                'items' => [
                    'I go',
                    'I don\'t go',
                    'I have not decided yet'
                ]
            ],
            [
                'title' => 'Who want to go to coffee degustation?',
                'desc' => "I have idea to go to coffee degustation next Sunday. Who will go with me?",
                'tags' => ['coffee', 'degustation'],
                'is_public' => 1,
                'is_single' => 1,
                'items' => [
                    'I go',
                    'I don\'t go',
                    'I\'ll think about it'
                ]
            ],
            [
                'title' => 'Lviv Museums',
                'desc' => "Choose the museums that would like to visit in the next 3 months",
                'tags' => ['museums'],
                'is_public' => 1,
                'is_single' => 0,
                'items' => [
                    'Museum Pharmacy "Under the Black Eagle"',
                    'Beer Brewing Museum',
                    'Museum of Ancient Ukrainian Books',
                    'Lviv Museum of Religious History',
                    'Lviv Art Gallery',
                    'Ivan Franko Lviv Literary and Memorial Museum',
                    'Lviv History Museum'
                ]
            ],
            [
                'title' => 'Gift choice for Birthday',
                'desc' => "Please, take part in a gift choice on Birthday for our colleague " . $exceptedUserName,
                'tags' => ['Gift'],
                'is_public' => 0,
                'except' => [$exceptedUser->id],
                'is_single' => 1,
                'items' => [
                    'Keyboard with backlight',
                    'SSD',
                    'Gaming mouse',
                    'Logitech Webcam HD'
                ]
            ],
//            [
//                'title' => '',
//                'desc' => "",
//                'is_public' => 1,
//                'is_single' => 1,
//                'items' => []
//            ],
//            [
//                'title' => '',
//                'desc' => "",
//                'is_public' => 1,
//                'is_single' => 1,
//                'items' => []
//            ],

        ];

        foreach ($votesList as $item) {
            $vote = factory(App\Models\Vote::class)->make();
            $vote->title = $item['title'];
            $vote->description = $item['desc'];
            $vote->description_generated = MarkdownService::baseConvert($item['desc']);
            $vote->slug = str_slug($item['title'], '-');
            $vote->is_public = $item['is_public'];
            $vote->is_single = $item['is_single'];
            if (!$item['is_public']) {
                $randomUser = $users->where('id', 2)->first();
                $vote->finished_at = date('Y:m:d H:i:s', strtotime('+' . 2 . ' days'));
            } else {
                $randomUser = $users->random();
            }
            $vote->user()->associate($randomUser);
            $vote->save();
            if (!$item['is_public']) {
                foreach ($users->except($item['except']) as $user) {
                    $vote->votePermissions()->create(['user_id' => $user->id]);
                }
            }
            $tagsIds = [];
            foreach ($item['tags'] as $voteTag) {
                if ($tag = Tag::where('name', $voteTag)->first()) {
                    $tagsIds[] = $tag;
                } else {
                    $tag = Tag::create(['name' => $voteTag]);
                    $tagsIds[] = $tag;
                }
            }
            $vote->tags()->saveMany($tagsIds);
            foreach ($item['items'] as $k => $voteItemName) {
                if (!$item['is_public']) {
                    if ($k == 0) {
                        $randomUser = $users->where('id', 2)->first();
                    } else {
                        $randomUser = $users->except($item['except'])->random();
                    }
                } else {
                    $randomUser = $users->random();
                }
                VoteItem::create([
                    'vote_id' => $vote->id,
                    'name' => $voteItemName,
                    'user_id' => $randomUser->id,
                ]);
            }
        }
    }
}
