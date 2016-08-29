<?php

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Comment;
use Illuminate\Database\Eloquent\Collection;

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
        });
    }
}
