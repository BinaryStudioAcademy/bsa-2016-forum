<?php
use Illuminate\Database\Eloquent\Model;

class UserTest extends TestCase
{

    public function testSave()
    {
        $user = factory(App\Models\User::class)->create();
        $this->seeInDatabase('users', [
            'id'=>$user->id,
            'first_name'=>$user->first_name,
            'last_name'=>$user->last_name,
            'display_name'=>$user->display_name,
            'email'=>$user->email,
            'reputation'=>$user->reputation,
            'status_id'=>$user->status_id
        ]);
    }

    public function testUpdate()
    {
        $user = \App\Models\User::all()->last();

        $user->first_name .= 'Updated';
        $user->last_name .= 'Updated';
        $user->display_name .= 'Updated';
        $user->email .= 'up';
        $user->reputation += 1;
       // $user->status_id = 1;

        $user->save();

        $this->seeInDatabase('users', [
            'id'=>$user->id,
            'first_name'=>$user->first_name,
            'last_name'=>$user->last_name,
            'display_name'=>$user->display_name,
            'email'=>$user->email,
            'reputation'=>$user->reputation,
          //  'status_id'=>$user->status_id
        ]);
    }

    public function testSoftDelete()
    {
        $user = \App\Models\User::all()->first();
        $userId = $user->id;
        $user->delete();
        $this->seeInDatabase('users', ['id'=>$userId])
             ->notSeeInDatabase('users', ['id'=>$userId, 'deleted_at'=>null]);

    }

    public function testUserCreateTopic ()
    {
        $user = \App\Models\User::all()->first();
        $topic = factory(App\Models\Topic::class)->create();
        $user->topics()->save($topic);
        $this->seeInDatabase('topics', $topic->toArray());
    }
    public function testUserCreateVote ()
    {
        $user = \App\Models\User::all()->first();
        $vote = factory(App\Models\Vote::class)->create();
        $user->votes()->save($vote);
        $this->seeInDatabase('votes', $vote->toArray());
    }

    public function testUserCreateCommentForTopic ()
    {
        $comment = factory(App\Models\Comment::class)->make();
        $commentArray = $comment->toArray();
        $topic = \App\Models\Topic::all()->random(1);
        $comment = $topic->comments()->save($comment);
        $this->seeInDatabase('comments', $commentArray);
    }

    public function testUserCreateCommentForVote ()
    {
        $comment = factory(App\Models\Comment::class)->make();
        $commentArray = $comment->toArray();
        $vote = \App\Models\Vote::all()->random(1);
        $comment = $vote->comments()->save($comment);
        $this->seeInDatabase('comments', $commentArray);
    }

    public function testUserCreateBookmark ()
    {
        $user = \App\Models\User::all()->random(1);
        $topic = \App\Models\Topic::all()->random(1);
        $user->bookmarks()->attach($topic->id);
        $this->seeInDatabase('bookmarks', ['topic_id'=>$topic->id, 'user_id'=>$user->id]);
    }

    public function testUserCreateVoteItem ()
    {

        $user = \App\Models\User::all()->random(1);
        $vote = \App\Models\Vote::all()->random(1);
        $voteItem = new \App\Models\VoteItem(['name'=>factory(App\Models\Topic::class)->make()->name,'vote_id'=>$vote->id]);
        $user->voteItems()->save($voteItem);
        $this->seeInDatabase('vote_items', ['vote_id'=>$vote->id, 'user_id'=>$user->id]);
    }
}