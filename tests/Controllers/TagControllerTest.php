<?php
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use App\Http\Controllers\TagController;
use App\Models\Tag;
use App\Models\Topic;
use App\Models\User;
use App\Models\Vote;
use Illuminate\Support\Facades\Auth;

class TagControllerTest extends TestCase
{
    use WithoutMiddleware;

    public function getTagId($response)
    {
        return substr($response->content(), strpos($response->content(), '"id":') + 5, strpos($response->content(), '"name"') - 16);
    }

    public function roleUser()
    {
        return \DB::table('roles')->where('name', 'User')->value('id');
    }

    public function roleAdmin(){
        return \DB::table('roles')->where('name', 'Admin')->value('id');
    }

    public function authUser($role = 'user')
    {
        $this->disableMiddlewareForAllTests();
        $users = User::all();
        Auth::login($users[1]);
        $user = Auth::user();
        $roleUser = ($role == 'admin') ? $this->roleAdmin() : $this->roleUser();
        $user->role()->associate($roleUser);

        return $user->id;
    }

    /**********  TOPIC SECTION START **********/

    public function testGetAllTopicTags()
    {
        $topic = Topic::all()->random(1);

        if (!empty($topic)) {
            $response = $this->call('GET', '/api/v1/topics/' . $topic->id . '/tags');
            $this->assertEquals(200, $response->status());
        } else {
            $response = $this->call('GET', '/api/v1/topics/0/tags');
            $this->assertEquals(404, $response->status());
        }
    }

    public function testGetTopicTag()
    {
        $topic = Topic::all()->random(1);
        $response = $this->call('GET', '/api/v1/topics/' . $topic->id . '/tags');

        if (!empty($response->content())) {
            $response = $this->call('GET', '/api/v1/topics/' . $topic->id . '/tags/' . $this->getTagId($response));
            $this->assertEquals(200, $response->status());
        } else {
            $response = $this->call('GET', '/api/v1/topics/' . $topic->id . '/tags/0');
            $this->assertEquals(404, $response->status());
        }
    }

    public function testStoreTopicTagAdmin()
    {
        $this->authUser('admin');
        $topic = Topic::all()->random(1);

        $this->json('POST', '/api/v1/topics/' . $topic->id . '/tags',
            [
                'name' => 'Topic Tag Test Controller',
            ])
            ->assertResponseStatus('201');
    }

    public function testStoreTopicTagUser()
    {
        $this->authUser();
        $topic = Topic::all()->random(1);

        $this->json('POST', '/api/v1/topics/' . $topic->id . '/tags',
            [
                'name' => 'Topic Tag Test Controller',
            ])
            ->assertResponseStatus('403');
    }

    public function testdestroyTopicTagAdmin()
    {
        $this->authUser('admin');
        $topic = Topic::all()->random(1);
        $response = $this->call('GET', '/api/v1/topics/' . $topic->id . '/tags');

        if (!empty($response->content())) {
            $response = $this->call('DELETE', '/api/v1/topics/' . $topic->id . '/tags/' . $this->getTagId($response));
            $this->assertEquals(204, $response->status());
        } else {
            $response = $this->call('DELETE', '/api/v1/topics/' . $topic->id . '/tags/0');
            $this->assertEquals(404, $response->status());
        }
    }

    public function testdestroyTopicTagUser()
    {
        $this->authUser();
        $topic = Topic::all()->random(1);
        $response = $this->call('GET', '/api/v1/topics/' . $topic->id . '/tags');

        if (!empty($response->content())) {
            $response = $this->call('DELETE', '/api/v1/topics/' . $topic->id . '/tags/' . $this->getTagId($response));
            $this->assertEquals(403, $response->status());
        } else {
            $response = $this->call('DELETE', '/api/v1/topics/' . $topic->id . '/tags/0');
            $this->assertEquals(404, $response->status());
        }
    }

    /**********  VOTE SECTION START **********/

    public function testGetAllVoteTags()
    {
        $votes = Vote::all()->random(1);

        if (!empty($votes)) {
            $response = $this->call('GET', '/api/v1/votes/' . $votes->id . '/tags');
            $this->assertEquals(200, $response->status());
        } else {
            $response = $this->call('GET', '/api/v1/votes/0/tags');
            $this->assertEquals(404, $response->status());
        }
    }

    public function testGetVoteTag()
    {
        $votes = Vote::all()->random(1);
        $response = $this->call('GET', '/api/v1/votes/' . $votes->id . '/tags');

        if (!empty($response->content())) {
            $response = $this->call('GET', '/api/v1/votes/' . $votes->id . '/tags/' . $this->getTagId($response));
            $this->assertEquals(200, $response->status());
        } else {
            $response = $this->call('GET', '/api/v1/votes/' . $votes->id . '/tags/0');
            $this->assertEquals(404, $response->status());
        }
    }

    public function testStoreVoteTagAdmin()
    {
        $this->authUser('admin');
        $votes = Vote::all()->random(1);

        $this->json('POST', '/api/v1/votes/' . $votes->id . '/tags',
            [
                'name' => 'Votes Tag Test Controller',
            ])
            ->assertResponseStatus('201');
    }

    public function testStoreVoteTagUser()
    {
        $this->authUser();
        $votes = Vote::all()->random(1);

        $this->json('POST', '/api/v1/votes/' . $votes->id . '/tags',
            [
                'name' => 'Votes Tag Test Controller',
            ])
            ->assertResponseStatus('403');
    }

    public function testdestroyVoteTagAdmin()
    {
        $this->authUser('admin');
        $votes = Vote::all()->random(1);
        $response = $this->call('GET', '/api/v1/votes/' . $votes->id . '/tags');

        if (!empty($response->content())) {
            $response = $this->call('DELETE', '/api/v1/votes/' . $votes->id . '/tags/' . $this->getTagId($response));
            $this->assertEquals(204, $response->status());
        } else {
            $response = $this->call('DELETE', '/api/v1/votes/' . $votes->id . '/tags/0');
            $this->assertEquals(404, $response->status());
        }
    }

    public function testdestroyVoteTagUser()
    {
        $this->authUser();
        $votes = Vote::all()->random(1);
        $response = $this->call('GET', '/api/v1/votes/' . $votes->id . '/tags');

        if (!empty($response->content())) {
            $response = $this->call('DELETE', '/api/v1/votes/' . $votes->id . '/tags/' . $this->getTagId($response));
            $this->assertEquals(403, $response->status());
        } else {
            $response = $this->call('DELETE', '/api/v1/votes/' . $votes->id . '/tags/0');
            $this->assertEquals(404, $response->status());
        }
    }
}