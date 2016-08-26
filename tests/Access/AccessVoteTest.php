<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use App\Models\User;
use App\Models\Vote;
use App\DB;

class AccessVoteTest extends TestCase
{
    /**
     * A basic functional test example.
     *
     * @return void
     */

    public function roleUser()
    {
        return \DB::table('roles')->where('name', 'User')->value('id');
    }
    
    public function roleAdmin(){
        return \DB::table('roles')->where('name', 'Admin')->value('id');
    }
    
    public function createVote($vote, $userId)
    {
        $vote->title = "Test title User";
        $vote->is_public = 1;
        $vote->is_saved = 0;
        $vote->finished_at = date ('Y:m:d H:m:s', strtotime('+10 days'));
        $vote->user_id = $userId;
        $vote->save();
        return $vote;
    }
    
    public function testCreateByUser()
    { 
        $vote = new Vote();
        
        $user = User::all()->random(1);
        $user->detachAllRoles();
        $user->attachRole($this->roleUser());

        if ($user->allowed('create.votes', $vote)) {
            $this->createVote($vote, $user->id);
        }
        $this->seeInDatabase('votes', ['user_id' => $user->id, 'title' => $vote->title]);
 
    }

    public function testCreateByAdmin()
    {
        $vote = new Vote();

        $user = User::all()->random(1);
        $user->detachAllRoles();
        $user->attachRole($this->roleAdmin());

        if ($user->allowed('create.votes', $vote)) {
            $this->createVote($vote, $user->id);
        }
        $this->seeInDatabase('votes', ['user_id' => $user->id, 'title' => $vote->title]);

        $user->detachRole($this->roleAdmin());
        $user->attachRole($this->roleUser());
    }

    public function testViewByUser()
    {
        $vote = Vote::all()->random(1);

        $user = User::all()->random(1);
        $user->detachAllRoles();
        $user->attachRole($this->roleUser());

        if ($user->allowed('view.votes', $vote)) {
           
            $voteTitle = Vote::findorFail($vote->id)->title;
        }
        $this->seeInDatabase('votes', ['title' => $voteTitle]);
    }

    public function testViewByAdmin()
    {
        $vote = Vote::all()->random(1);

        $user = User::all()->random(1);
        $user->detachAllRoles();
        $user->attachRole($this->roleAdmin());

        if ($user->allowed('view.votes', $vote)) {
            
            $voteTitle = Vote::findOrFail($vote->id)->title;
        }
        $this->seeInDatabase('votes', ['title' => $voteTitle]);
        
        $user->detachRole($this->roleAdmin());
        $user->attachRole($this->roleUser());
    }

    public function testUpdateByUser()
    {
        $newTitle = 'Title updated by user';

        $vote = Vote::all()->random(1);

        $user = User::all()->random(1);
        $user->detachAllRoles();
        $user->attachRole($this->roleUser());
        
        if ($user->allowed('update.votes', $vote)) {
                $vote->title = $newTitle;
                $vote->update();
            }
        $this->assertNotEquals($newTitle, $vote->title);
    }
    
    public function testUpdateByOwner()
    {
        $newTitleOwner = 'Title updated by owner';
        $vote = new Vote();
        $user = User::all()->random(1);
        $user->detachAllRoles();
        $user->attachRole($this->roleUser());
        $this->createVote($vote, $user->id);

        if ($user->allowed('update.votes', $vote)) {
            $vote->title = $newTitleOwner;
            $vote->save();
        }
        $this->assertEquals($newTitleOwner, $vote->title);
    }

    public function testUpdateByAdmin()
    {
        $newTitleAdmin = 'Title updated by admin';

        $vote = Vote::all()->random(1);

        $user = User::all()->random(1);
        $user->detachAllRoles();
        $user->attachRole($this->roleAdmin());

        if ($user->allowed('update.votes', $vote)) {
            $vote->title = $newTitleAdmin;
            $vote->save();
        }
        $this->assertEquals($newTitleAdmin, $vote->title);

        $user->detachRole($this->roleAdmin());
        $user->attachRole($this->roleUser());
    }

    public function testDeleteByUser()
    {
        $vote = Vote::all()->random(1);
        $voteId = $vote->id;
        $user = User::all()->random(1);
        $user->detachAllRoles();
        $user->attachRole($this->roleUser());

        if ($user->allowed('delete.votes', $vote)) {
            $vote->delete();
        }
        $this->seeInDatabase('votes', ['id' => $voteId])
            ->seeInDatabase('votes', ['id' => $voteId, 'deleted_at' => null]);
    }

   public function testDeleteByOwner()
    {
        $vote = new Vote();
        $user = User::all()->random(1);
        $user->detachAllRoles();
        $user->attachRole($this->roleUser());
        $this->createVote($vote, $user->id);
        $voteId = $vote->id;

        if ($user->allowed('delete.votes', $vote)) {
            $vote->delete();
        }
        $this->seeInDatabase('votes', ['id' => $voteId])
            ->notSeeInDatabase('votes', ['id' => $voteId, 'deleted_at' => null]);
    }

    public function testDeleteByAdmin()
    {
        $vote = Vote::all()->random(1);
        $voteId = $vote->id;

        $user = User::all()->random(1);
        $user->detachAllRoles();
        $user->attachRole($this->roleAdmin());
        
        if ($user->allowed('delete.votes', $vote)) {
            $vote->delete();
        }
        $this->seeInDatabase('votes', ['id' => $voteId])
            ->notSeeInDatabase('votes', ['id' => $voteId, 'deleted_at' => null]);
    }
    
}