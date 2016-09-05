<?php

use Illuminate\Database\Seeder;
use App\Models\VoteUniqueView;
use App\Models\Vote;
use App\Models\User;

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
                'user_id' => User::all()->random()->id,
                'vote_id' => Vote::all()->random()->id
            ];
        }

        $arrayOfVoteUniqueViews = array_unique($arrayOfVoteUniqueViews, SORT_REGULAR);

        foreach ($arrayOfVoteUniqueViews as $voteUniqueView){
            $tmp = VoteUniqueView::create($voteUniqueView);
            $tmp->save();
        }

    }
}
