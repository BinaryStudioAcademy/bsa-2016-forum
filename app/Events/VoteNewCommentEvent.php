<?php

namespace App\Events;

use App\Models\Vote;
use App\Models\Comment;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Auth;

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
        $this->users = $vote->subscribers()->where('user_id', '<>', Auth::user()->id)->pluck('global_id');
        $this->target = $vote;
        $this->target_type = Vote::$morphTag;
        $this->comment = $comment;
    }
}