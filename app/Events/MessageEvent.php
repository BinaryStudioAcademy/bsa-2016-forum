<?php

namespace App\Events;

use App\Events\Event;
use App\Models\Message;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class MessageEvent extends Event implements ShouldBroadcast
{
    use SerializesModels;

    public $socketEvent;
    public $message;

    /**
     * Create a new event instance.
     *
     * @param Message $message
     */
    public function __construct(Message $message)
    {
        $this->message=$message->toJson();
    }

    /**
     * Get the channels the event should be broadcast on.
     *
     * @return array
     */
    public function broadcastOn()
    {
        return ['messagesChannel'];
    }
}
