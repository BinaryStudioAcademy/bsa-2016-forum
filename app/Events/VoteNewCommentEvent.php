<?php

namespace App\Events;

use App\Models\Vote;
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
        $this->target_title = $vote->title;
        $this->comment = $comment;
    }
}