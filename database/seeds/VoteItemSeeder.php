<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Collection;
use App\Models\Vote;
use App\Models\User;
use App\Models\VoteItem;

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
            });
        });

    }
}
