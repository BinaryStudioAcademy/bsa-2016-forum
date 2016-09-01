<?php

namespace App\Events;

use App\Models\Vote;
use App\Models\Comment;
use Illuminate\Queue\SerializesModels;

class VoteNewCommentEvent extends NewCommentEvent
{
    use SerializesModels;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Vote $vote, Comment $comment)
    {
        $this->users = $vote->subscribers()->pluck('global_id');
        $this->target = $vote;
        $this->target_type = Vote::$morphTag;
        $this->comment = $comment;
    }
}