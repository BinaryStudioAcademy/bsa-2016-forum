<?php

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Comment;
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

//            insert field for likes for this vote
            $lim=rand(1,3);
            $lim=rand(1,3);
            foreach ((range(1, $lim)) as $index) {
                $like = factory(App\Models\Like::class)->make();
                $randomUser = $users->random();
                $like->user()->associate($randomUser);
                $like = $vote->likes()->save($like);
            }

        });

    }
}
