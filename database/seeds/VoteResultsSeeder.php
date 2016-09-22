<?php

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Vote;
use App\Models\VoteResult;

class VoteResultsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $votes = Vote::with('voteItems')->get();
        $users = User::all();

        foreach ($votes as $vote) {
            $voteItems = $vote->voteItems;
            foreach ($voteItems as $voteItem) {
                foreach ($users as $user) {
                    if (rand(0,1)) {
                        $voteResult = new VoteResult();
                        $voteResult->user()->associate($user);
                        $voteResult->voteItem()->associate($voteItem);
                        $voteResult->vote()->associate($vote);
                        $voteResult->save();
                    }
                }
            }
        }
    }
}
