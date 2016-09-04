<?php

namespace App\Policies;

use App\Models\Comment;
use App\Models\Topic;
use App\Models\User;
use App\Models\Vote;
use App\Models\VoteItem;
use Illuminate\Auth\Access\HandlesAuthorization;

class CommentPolicy
{
    use HandlesAuthorization;

    public function before(User $user)
    {
        if ($user->isAdmin()) {
            return true;
        }
    }

    public function deleteTopicsComment(User $user, Comment $comment, Topic $topic)
    {
        return ($user->owns($comment) && !$comment->hasChildComments())
        || ($user->owns($topic));
    }

    public function updateTopicsComment(User $user, Comment $comment, Topic $topic)
    {
        return ($user->owns($comment) && !$comment->hasChildComments())
        || ($user->owns($topic));
    }

    public function deleteVotesComment(User $user, Comment $comment, Vote $vote)
    {
        return $user->owns($comment);
    }

    public function updateVotesComment(User $user, Comment $comment, Vote $vote)
    {
        return ($user->owns($comment) && !$comment->hasChildComments())
        || ($user->owns($vote));
    }

    public function deleteVoteItemsComment(User $user, Comment $comment, VoteItem $voteItem)
    {
        return $user->owns($comment);
    }

    public function updateVoteItemsComment(User $user, Comment $comment, VoteItem $voteItem)
    {
        return ($user->owns($comment) && !$comment->hasChildComments())
        || ($user->owns($voteItem));
    }

    public function createCommentAttachment(User $user, Comment $comment)
    {
        return $user->owns($comment);
    }

    public function deleteCommentAttachment(User $user, Comment $comment)
    {
        return $user->owns($comment);
    }

    public function deleteCommentComments(User $user, Comment $comment)
    {
        return $user->owns($comment);
    }

    public function updateCommentComments(User $user, Comment $comment)
    {
        return $user->owns($comment);
    }
}
