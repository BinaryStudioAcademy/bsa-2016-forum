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
        $user->status_id = 1;

        $user->save();

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
        Model::unguard();
        $user = \App\Models\User::all()->first();
        $topicArray = (factory(App\Models\Topic::class)->make())->toArray();
        unset($topicArray['user_id']);
        $user->topics()->create($topicArray);
        Model::reguard();
        $this->seeInDatabase('topics', $topicArray);
    }
}