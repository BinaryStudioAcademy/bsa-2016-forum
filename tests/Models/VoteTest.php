<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use App\Models\Vote;


class VoteTest extends TestCase
{
    /**
     * A basic functional test example.
     *
     * @return void
     */
  /*  public function testSave()
    {
        $vote = factory(App\Models\Vote::class)->create();
        $vote->is_single = 1;
        $this->seeInDatabase('votes', [
            'id'=>$vote->id,
            'title'=>$vote->title,
            'user_id'=>$vote->user_id,
            'is_single'=> $vote->is_single,
            'is_public'=>$vote->is_public,
            'is_saved'=>$vote->is_saved,
            'finished_at'=>$vote->finished_at,
        ]);
    }

    public function testUpdate()
    {
        $vote = App\Models\Vote::all()->last();
        $vote->title = 'Title update';
        $vote->finished_at = factory(App\Models\Vote::class)->make()->finished_at;
        $vote->user_id = factory(App\Models\Vote::class)->make()->user_id;

        $vote->save();

        $this->seeInDatabase('votes', [
            'id'=>$vote->id,
            'title'=>$vote->title,
            'finished_at'=>$vote->finished_at,
            'user_id'=>$vote->user_id
        ]);
    }

    public function testSoftDelete()
    {
        $vote = App\Models\Vote::whereNull('deleted_at')->first();
        $voteId = $vote->id;
        $vote->delete();
        $this->seeInDatabase('votes', ['id'=>$voteId])
            ->notSeeInDatabase('votes', ['id'=>$voteId, 'deleted_at'=>null]);
    }*/

    public function testmodel(){
        
        $vote = Vote::all()->random(1);
        var_dump($vote->id);
        var_dump($vote->user()->get());
        var_dump($vote->likes()->get());
        var_dump($vote->tags()->get());
        var_dump($vote->comments()->get());
    }
}   