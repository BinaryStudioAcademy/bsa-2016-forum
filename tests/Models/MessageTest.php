<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class MessageTest extends TestCase
{
    public function testSave()
    {
        $message = factory(App\Models\Message::class)->create();
        $this->seeInDatabase('messages', [
            'id' => $message->id,
            'user_from_id' => $message->user_from_id,
            'user_to_id' => $message->user_to_id,
            'message' => $message->message,
            'is_read' => $message->is_read
        ]);
    }

    public function testUpdate()
    {
        $message = App\Models\Message::all()->last();
        $message->message = 'message update';
        $message->is_read = factory(App\Models\Message::class)->make()->is_read;
        $message->user_from_id = factory(App\Models\Message::class)->make()->user_from_id;
        $message->user_to_id = factory(App\Models\Message::class)->make()->user_to_id;

        $message->save();

        $this->seeInDatabase('messages', [
            'id' => $message->id,
            'message' => $message->message,
            'is_read' => $message->is_read,
            'user_from_id' => $message->user_from_id,
            'user_to_id' => $message->user_to_id
        ]);
    }

    public function testSoftDelete()
    {
        $message = App\Models\Message::whereNull('deleted_at')->first();
        $messageId = $message->id;
        $message->delete();
        $this->seeInDatabase('messages', ['id'=>$messageId])
            ->notSeeInDatabase('messages', ['id'=>$messageId, 'deleted_at'=>null]);
    }
}
