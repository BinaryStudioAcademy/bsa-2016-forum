<?php

namespace App\Events;

use App\Models\Comment;
use App\Models\Topic;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Auth;

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
        $this->users = $topic->subscribers()->where('user_id', '<>', Auth::user()->id)->pluck('global_id');
        $this->target = $topic;
        $this->target_type = Topic::$morphTag;
        $this->comment = $comment;
    }
}