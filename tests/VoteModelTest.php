<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use DB;

class VoteModelTest extends TestCase
{
    /**
     * A basic functional test example.
     *
     * @return void
     */
    public function testVoteModel()
    {
        $votes=factory(App\Models\User::class,2)->create();
        var_dump($votes);
    }
}