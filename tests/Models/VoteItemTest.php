<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;


class VoteItemTest extends TestCase
{
    /**
     * A basic functional test example.
     *
     * @return void
     */
    public function createVoteItem()
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
        
        return $voteItem;
    }

    public function createVoteResults()
    {
        $voteItem = $this->createVoteItem();
        for ($i=0; $i<=2; $i++) {
            $voteItem->voteResults()->save(
                new App\Models\VoteResult(['user_id' => $voteItem->user_id, 
                    'vote_id' => $voteItem->vote_id]));

        }
        return $voteItem;
    }

    public function testSave()
    {
        $voteItem = factory(App\Models\VoteItem::class)->create();
        $this->seeInDatabase('vote_items', [
            'id'=>$voteItem->id,
            'name'=>$voteItem->name,
            'user_id'=>$voteItem->user_id,
            'vote_id'=>$voteItem->vote_id,
        ]);
    }

    public function testUpdate()
    {
        $voteItem = App\Models\VoteItem::all()->last();
        $voteItem->name = 'Name update';

        $voteItem->save();

        $this->seeInDatabase('vote_items', [
            'id'=>$voteItem->id,
            'name'=>$voteItem->name,
        ]);
    }

    public function testSoftDelete()
    {
        $voteItem = App\Models\VoteItem::whereNull('deleted_at')->first();
        $voteItemId = $voteItem->id;
        $voteItem->delete();
        $this->seeInDatabase('vote_items', ['id'=>$voteItemId])
            ->notSeeInDatabase('vote_items', ['id'=>$voteItemId, 'deleted_at'=>null]);
    }

    public function testBelongsToVote()
    {
        $voteItem = $this->createVoteItem();
        
        $voteRel  = $voteItem->vote()->first();
        $this->assertEquals($voteItem->vote_id, $voteRel->id);
       
    }

    public function testBelongsToUser()
    {
        $voteItem = $this->createVoteItem();
        
        $userRel  = $voteItem->user()->first();
        $this->assertEquals($voteItem->user_id, $userRel->id);

    }

    public function testHasManyResults()
    {
        $voteItem = $this->createVoteResults();
        $this->assertEquals(3, $voteItem->voteResults()->count());
    }
}   