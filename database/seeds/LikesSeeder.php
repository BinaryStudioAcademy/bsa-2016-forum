<?php

use Illuminate\Database\Seeder;
use App\Models\Like;
use App\Models\User;
use App\Models\Topic;
use App\Models\Vote;
use App\Models\VoteItem;
use App\Models\Comment;
use Illuminate\Database\Eloquent\Collection;


class LikesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = User::all();
        $maxLikesCount = $users->count();

        $topics = Topic::all();
        foreach ($topics as $topic) {
            $likesCount = rand(1, $maxLikesCount);
            $randomUsers = $users->random($likesCount);
            if (!$randomUsers instanceof Collection) {
                $randomUsers =  new Collection([$randomUsers]);
            }

            $likes = [];
            foreach ($randomUsers as $randomUser) {
                $like = new Like();
                $like->user()->associate($randomUser);
                $likes[] = $like;
            }

            $topic->likes()->saveMany($likes);
        }

        $votes = Vote::all();
        foreach ($votes as $vote) {
            $likesCount = rand(1, $maxLikesCount);
            $randomUsers = $users->random($likesCount);
            if (!$randomUsers instanceof Collection) {
                $randomUsers =  new Collection([$randomUsers]);
            }

            $likes = [];
            foreach ($randomUsers as $randomUser) {
                $like = new Like();
                $like->user()->associate($randomUser);
                $likes[] = $like;
            }

            $vote->likes()->saveMany($likes);
        }

        $voteItems = VoteItem::all();
        foreach ($voteItems as $voteItem) {
            $likesCount = rand(1, $maxLikesCount);
            $randomUsers = $users->random($likesCount);
            if (!$randomUsers instanceof Collection) {
                $randomUsers =  new Collection([$randomUsers]);
            }

            $likes = [];
            foreach ($randomUsers as $randomUser) {
                $like = new Like();
                $like->user()->associate($randomUser);
                $likes[] = $like;
            }

            $voteItem->likes()->saveMany($likes);
        }

        $comments = Comment::all();
        foreach ($comments as $comment) {
            $likesCount = rand(1, $maxLikesCount);
            $randomUsers = $users->random($likesCount);
            if (!$randomUsers instanceof Collection) {
                $randomUsers =  new Collection([$randomUsers]);
            }

            $likes = [];
            foreach ($randomUsers as $randomUser) {
                $like = new Like();
                $like->user()->associate($randomUser);
                $likes[] = $like;
            }

            $comment->likes()->saveMany($likes);
        }

    }
}
