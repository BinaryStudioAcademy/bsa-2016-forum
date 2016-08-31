<?php

namespace App\Events;

use App\Models\Comment;
use App\Models\Topic;
use Illuminate\Queue\SerializesModels;

class TopicNewCommentEvent extends NewCommentEvent
{
    use SerializesModels;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Topic $topic, Comment $comment)
    {
        $this->users = $topic->subscribers()->get('global_id');
        $this->target_title = $topic->name;
        $this->comment = $comment;
    }
}