<?php

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Comment;
use Illuminate\Database\Eloquent\Collection;
use App\Models\Like;
use App\Models\Topic;

class TopicsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = User::all();
//        $likes= Topic::all();

        factory(App\Models\Topic::class, 20)->create()->each(function($topic) use ($users) {
            $commentCount = rand(1, 5);
            $comments = factory(Comment::class, $commentCount)
                ->make();
            if (!$comments instanceof Collection) {
                $comments =  new Collection([$comments]);
            }
            $comments->each(function ($comment) use ($users) {
                $randomUser = $users->random();
                $comment->user()->associate($randomUser);
                $comment->save();
            });

            $topic->comments()->saveMany($comments);

            $tag = factory(App\Models\Tag::class)->make();
            $comment = $topic->tags()->save($tag);

            $lim=rand(1,3);
            foreach ((range(1, $lim)) as $index) {
                $like = factory(App\Models\Like::class)->make();
                $randomUser = $users->random();
                $like->user()->associate($randomUser);
                $like = $topic->likes()->save($like);
            }

        });
    }
}
