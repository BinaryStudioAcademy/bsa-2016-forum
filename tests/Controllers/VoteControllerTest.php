<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use App\Models\Vote;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class VoteControllerTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */

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

    public function roleUser()
    {
        return \DB::table('roles')->where('name', 'User')->value('id');
    }

    public function roleAdmin(){
        return \DB::table('roles')->where('name', 'Admin')->value('id');
    }

    public function testCRUD()
    {
        $users = User::all();
        Auth::login($users[1]);
        $user = Auth::user();
        var_dump($user->id);
        $vote = Vote::all()->random(1);

       /*
        $roleUser = $this->roleUser();
        $user->role()->associate($roleUser);

        $this->json('POST', '/api/v1/votes',
            [
                'title' => 'Vote Test Controller',
                'user_id' => $user->id,
                'finished_at' => date('Y:m:d H:m:s', strtotime('+10 days')),
                'is_public' => 1,
                'is_saved' => 1,

            ])
            ->assertResponseStatus('403');

        $response = $this->call('GET', '/api/v1/votes/' . $vote->id);
        $this->assertEquals(403, $response->status());

        $this->json('PUT', '/api/v1/votes/'.$vote->id,
            [   'title' => 'Vote Test Controller',
                'user_id' => $user->id,
                'finished_at' => date('Y:m:d H:m:s', strtotime('+10 days')),
                'is_public' => 1,
                'is_saved' => 1,
            ])
            ->assertResponseStatus('403');

        $response = $this->call('DELETE', '/api/v1/votes/'.$vote->id);
        $this->assertEquals(403, $response->status());

       */

        // -----------check user permission--------------
        $roleUser = $this->roleUser();
        $user->role()->associate($roleUser);
        var_dump($user->role()->first()->name);

        $this->json('POST', '/api/v1/votes',
            [   
                'title' => 'Vote Test Controller',
                'user_id' => $user->id,
                'finished_at' => date('Y:m:d H:m:s', strtotime('+10 days')),
                'is_public' => 1,
                'is_saved' => 1,

            ])
            ->assertResponseStatus('201');

        $response = $this->call('GET', '/api/v1/votes/' . $vote->id);
        $this->assertEquals(200, $response->status());

        $this->json('PUT', '/api/v1/votes/'.$vote->id,
            [   'title' => 'Vote Test Controller',
                'user_id' => $user->id,
                'finished_at' => date('Y:m:d H:m:s', strtotime('+10 days')),
                'is_public' => 1,
                'is_saved' => 1,
            ])
            ->assertResponseStatus('403');

        $response = $this->call('DELETE', '/api/v1/votes/'.$vote->id);
        $this->assertEquals(403, $response->status());

        // -----------check owner permission--------------
        $voteOwn = new Vote();
        $this->createVote($voteOwn, $user->id);

        $this->json('PUT', '/api/v1/votes/'.$voteOwn->id,
            [   'title' => 'Vote Test Controller',
                'user_id' => $user->id,
                'finished_at' => date('Y:m:d H:m:s', strtotime('+10 days')),
                'is_public' => 1,
                'is_saved' => 1,
            ])
            ->assertResponseStatus('200');

        $response = $this->call('DELETE', '/api/v1/votes/'.$voteOwn->id);
        $this->assertEquals(204, $response->status());

        // -----------check admin permission--------------
        $roleAdmin = $this->roleAdmin();
        $user->role()->associate($roleAdmin);

        $this->json('POST', '/api/v1/votes',
            [
                'title' => 'Vote Test Controller Create',
                'user_id' => $user->id,
                'finished_at' => date('Y:m:d H:m:s', strtotime('+10 days')),
                'is_public' => 1,
                'is_saved' => 1,
            ])->assertResponseStatus('201');

        $response = $this->call('GET', '/api/v1/votes/' . $vote->id);
        $this->assertEquals(200, $response->status());

        $this->json('PUT', '/api/v1/votes/'.$vote->id,
            [   'title' => 'Vote Test Controller',
                'user_id' => $user->id,
                'finished_at' => date('Y:m:d H:m:s', strtotime('+10 days')),
                'is_public' => 1,
                'is_saved' => 1,
            ])
            ->assertResponseStatus('200');

        $response = $this->call('DELETE', '/api/v1/votes/'.$vote->id);
        $this->assertEquals(204, $response->status());
    }
}