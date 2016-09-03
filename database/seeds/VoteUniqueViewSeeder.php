<?php

use Illuminate\Database\Seeder;

class VoteUniqueViewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $arrayOfVoteUniqueViews= [];
        for ($i=0;$i<500;$i++){
            $arrayOfVoteUniqueViews[] = [
                'user_id' => \App\Models\User::all()->random()->id,
                'vote_id' => \App\Models\Vote::all()->random()->id
            ];
        }

        $arrayOfVoteUniqueViews = array_unique($arrayOfVoteUniqueViews, SORT_REGULAR);

        foreach ($arrayOfVoteUniqueViews as $voteUniqueView){
            $tmp = \App\Models\VoteUniqueView::create($voteUniqueView);
            $tmp->save();
        }

    }
}
