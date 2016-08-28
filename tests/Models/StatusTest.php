<?php

use App\Models\User;
use App\Models\Status;

class StatusTest extends TestCase
{

    public function testCheckStatusOnline()
    {
        $this->seeInDatabase('user_statuses', [
            'name' => 'online'
        ]);
    }

    public function testCheckStatusOffline()
    {
        $this->seeInDatabase('user_statuses', [
            'name' => 'offline'
        ]);
    }

    public function testCheckUserStatusRelation()
    {
        $user = User::all()->random(1);;
        $statuses = Status::all()->toArray();

        $result = false;
        if (array_search($user->status->name, array_column($statuses, 'name')) !== false) {
            $result = true;
        }

        $this->assertTrue($result);
    }
}