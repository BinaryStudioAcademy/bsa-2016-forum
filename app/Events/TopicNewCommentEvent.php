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
        $this->users = $topic->subscribers()->pluck('global_id');
        $this->target = $topic;
        $this->target_type = Topic::$morphTag;
        $this->comment = $comment;
    }
}