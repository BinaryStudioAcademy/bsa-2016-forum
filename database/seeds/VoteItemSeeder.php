<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Collection;
use App\Models\Vote;
use App\Models\User;
use App\Models\VoteItem;
use App\Models\VoteResult;
use App\Models\Comment;
use App\Models\Like;

class VoteItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $votes = Vote::all();
        $users = User::all();

        $votes->each(function ($vote) use($users) {
            $voteItemsCount = rand(1, 4);
            $voteItems = factory(VoteItem::class, $voteItemsCount)
                ->make();
            if (!$voteItems instanceof Collection) {
                $voteItems =  new Collection([$voteItems]);
            }
            $voteItems->each(function ($voteItem) use ($vote, $users) {
                $randomUser = $users->random();
                $voteItem->vote()->associate($vote);
                $voteItem->user()->associate($randomUser);
                $voteItem->save();

                foreach ($users as $user) {
                    if (rand(0,1)) {
                        $voteResult = new VoteResult();
                        $voteResult->user()->associate($user);
                        $voteResult->voteItem()->associate($voteItem);
                        $voteResult->vote()->associate($vote);
                        $voteResult->save();
                    }
                }

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

//            insert field for likes for this voteItem
                $lim=rand(1,3);
                foreach ((range(1, $lim)) as $index) {
                    $like = factory(App\Models\Like::class)->make();
                    $randomUser = $users->random();
                    $like->user()->associate($randomUser);
                    $like = $voteItem->likes()->save($like);
                }

            });
            
        });

//        factory(App\Models\VoteItem::class, 30)->create();
    }
}
