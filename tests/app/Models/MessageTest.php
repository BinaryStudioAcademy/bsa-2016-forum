<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class MessageTest extends TestCase
{
    use DatabaseMigrations;
    use DatabaseTransactions;
    use WithoutMiddleware;

    const USERS_AMOUNT = 2;
    const MESSAGES_AMOUNT = 9;
    protected $messages;
    protected $users;

    public function setUp()
    {
        parent::setUp();
        $this->users = factory(App\Models\User::class, self::USERS_AMOUNT)->create();
        $this->messages = factory(App\Models\Message::class, self::MESSAGES_AMOUNT)->create();
    }

    public function testUsesrShouldBeCreated()
    {
        $user = $this->users->find(1);
//        dd($user);
        $this->seeInDatabase('users', $user);
    }
    public function tearDown()
    {
        parent::tearDown();
    }
}
