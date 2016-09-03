<?php

namespace App\Events;

use App\Models\Comment;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class CommentEvent extends Event implements ShouldBroadcast
{
    use SerializesModels;

    public $socketEvent;
    public $comment;
    public $meta;

    /**
     * Create a new event instance.
     *
     * @param Comment $comment
     */
    public function __construct(Comment $comment, $meta)
    {
        $this->comment = $comment->toJson();
        $this->meta = json_encode($meta);
    }

    /**
     * Get the channels the event should be broadcast on.
     *
     * @return array
     */
    public function broadcastOn()
    {
        return ['commentsChannel'];
    }
}
