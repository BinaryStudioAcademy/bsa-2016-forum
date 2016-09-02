<?php

use Illuminate\Database\Seeder;
use App\Models\Topic;
use App\Models\VoteItem;
use App\Models\Vote;
use App\Models\User;
use App\Models\Comment;
use Illuminate\Database\Eloquent\Collection;

class CommentsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $topics = Topic::all();
        $votes = Vote::all();
        $voteItems = VoteItem::all();
        $users = User::all();

        foreach ($topics as $topic) {
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

            $topic->comments()->saveMany($comments);
        }

        foreach ($votes as $vote) {
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

            $vote->comments()->saveMany($comments);
        }

        foreach ($voteItems as $voteItem) {
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

            $voteItem->comments()->saveMany($comments);
        }

    }
}
