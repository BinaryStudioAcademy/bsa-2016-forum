<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use App\Models\User;
use App\Models\Vote;



class AccessVoteTest extends TestCase
{
    /**
     * A basic functional test example.
     *
     * @return void
     */
    public function testCreate()
    {
     
    }

    public function testView()
    {
     
    }

    public function testUpdate()
    {
        try {
            $newTitleOwner = 'Title updated by owner';
            $newTitleAdmin = 'Title updated by admin';
            $newTitle = 'Title updated';

            $vote = Vote::all()->random(1);
            $userAdmin = User::all()->first();
            $userOwner = User::findorFail($vote->user_id);
            $user = User::where('id', '<>', $userAdmin->id)->where('id', '<>', $userOwner->id)->first();

            if ($user->allowed('edit.votes', $vote)) {
                $vote->title = $newTitle;
                $vote->save();
            }
            $this->assertNotEquals($newTitle, $vote->title);

            if ($userOwner->allowed('edit.votes', $vote)) {
                $vote->title = $newTitleOwner;
                $vote->save();
            }
            $this->assertEquals($newTitleOwner, $vote->title);

            if ($userAdmin->isAdmin()) {
                $vote->title = $newTitleAdmin;
                $vote->save();
            }
            $this->assertEquals($newTitleAdmin, $vote->title);
        }
        catch (InvalidArgumentException $e){
            echo 'Warning!!!! reseed database';
        }
    }

    public function testDelete()
    {
        try {
            $vote = Vote::all()->random(1);
            $voteId = $vote->id;

            $userAdmin = User::all()->first();
            $userOwner = User::findorFail($vote->user_id);
            $user = User::where('id', '<>', $userAdmin->id)->where('id', '<>', $userOwner->id)->first();

            if ($user->allowed('delete.votes', $vote)) {
                $vote->delete();
            }
            $this->seeInDatabase('votes', ['id' => $voteId])
                ->seeInDatabase('votes', ['id' => $voteId, 'deleted_at' => null]);

            if ($userOwner->allowed('delete.votes', $vote)) {
                $vote->delete();
            }
            $this->seeInDatabase('votes', ['id' => $voteId])
                ->notSeeInDatabase('votes', ['id' => $voteId, 'deleted_at' => null]);

            $vote = Vote::all()->random(1);
            $voteId = $vote->id;
            if ($userAdmin->isAdmin()) {
                $vote->delete();
            }
            $this->seeInDatabase('votes', ['id' => $voteId])
                ->notSeeInDatabase('votes', ['id' => $voteId, 'deleted_at' => null]);
        }
        catch (InvalidArgumentException $e){
            echo 'Warning!!!! reseed database';
        }

    }
}