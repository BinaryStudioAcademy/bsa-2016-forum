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
        $statuses = Status::all();

        foreach ($statuses as $status) {
            if ($status->name == $user->status->name) {
                $is_work = true;
                break;
            }
        }

        $this->assertTrue($is_work);
    }
}