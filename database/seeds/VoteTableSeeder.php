<?php

use Illuminate\Database\Seeder;

class VoteTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      
        $count_votes = 20;
        $users = User::all();

        factory(App\Models\Vote::class, $count_votes)->create()->each(function($vote) use ($users) {
            $commentCount = rand(1, 5);
            $comments = factory(Comment::class, $commentCount)->make();
            if (!$comments instanceof Collection) {
                $comments =  new Collection([$comments]);
            }
            $comments->each(function ($comment) use ($users) {
                $randomUser = $users->random();
                $comment->user()->associate($randomUser);
                $comment->save();
            });

            $vote->comments()->saveMany($comments);

            $tag = factory(App\Models\Tag::class)->make();
            $comment = $vote->tags()->save($tag);

            $like = factory(App\Models\Like::class)->make();
            $vote = $vote->likes()->save($like);

        });

    }
}
