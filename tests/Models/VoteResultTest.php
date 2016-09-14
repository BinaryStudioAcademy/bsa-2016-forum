<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;


class VoteResultTest extends TestCase
{
    /**
     * A basic functional test example.
     *
     * @return void
     */
    public function createVoteResult()
    {
        $vote = factory(App\Models\Vote::class)->create();
        $user = factory(App\Models\User::class)->create();
        $voteItem = new App\Models\VoteItem();
        $voteItem->vote_id = $vote->id;
        $voteItem->user_id = $user->id;
        $voteItem->name = 'name';
        $voteItem->user()->associate($user);
        $voteItem->vote()->associate($vote);
        $voteItem->save();

        $voteResult = new \App\Models\VoteResult();
        $voteResult->vote_id = $vote->id;
        $voteResult->user_id = $user->id;
        $voteResult->vote_item_id = $voteItem->id;
        $voteResult->user()->associate($user);
        $voteResult->vote()->associate($vote);
        $voteResult->voteItem()->associate($voteItem);
        $voteResult->save();

        return $voteResult;
    }

    public function testSave()
    {
        $voteResult = $this->createVoteResult();
        $this->seeInDatabase('vote_results', [
            'id'=>$voteResult->id,
            'user_id'=>$voteResult->user_id,
            'vote_id'=>$voteResult->vote_id,
            'vote_item_id'=>$voteResult->vote_item_id,
        ]);
    }

    public function testSoftDelete()
    {
        $voteResult = App\Models\VoteResult::whereNull('deleted_at')->first();
        $voteResultId = $voteResult->id;
        $voteResult->delete();
        $this->seeInDatabase('vote_results', ['id'=>$voteResultId])
            ->notSeeInDatabase('vote_results', ['id'=>$voteResultId, 'deleted_at'=>null]);
    }

    public function testBelongsToVote()
    {
        $voteResult = $this->createVoteResult();

        $voteRel  = $voteResult->vote()->first();
        $this->assertEquals($voteResult->vote_id, $voteRel->id);

    }

    public function testBelongsToUser()
    {
        $voteResult = $this->createVoteResult();

        $userRel  = $voteResult->user()->first();
        $this->assertEquals($voteResult->user_id, $userRel->id);

    }

    public function testBelongsToVoteItem()
    {
        $voteResult = $this->createVoteResult();

        $voutItemRel  = $voteResult->voteItem()->first();
        $this->assertEquals($voteResult->vote_item_id, $voutItemRel->id);

    }
}