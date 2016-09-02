<?php

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Tag;
use Illuminate\Database\Eloquent\Collection;

class VoteTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      
        $votesCount = 20;
        $users = User::all();
        $tags = Tag::all();

        factory(App\Models\Vote::class, $votesCount)
            ->make()
            ->each(function($vote) use ($users, $tags) {
                $randomUser = $users->random();
                $vote->user()->associate($randomUser);
                $vote->save();
                $tagCount = rand(1, 3);
                $randomTags = $tags->random($tagCount);
                if (!$randomTags instanceof Collection) {
                    $randomTags =  new Collection([$randomTags]);
                }
                $vote->tags()->saveMany($randomTags);
            });
    }
}
