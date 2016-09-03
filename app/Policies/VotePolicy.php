<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Vote;
use Carbon\Carbon;
use Illuminate\Auth\Access\HandlesAuthorization;

class VotePolicy
{
    use HandlesAuthorization;

    public function before(User $user)
    {
        if ($user->isAdmin()) {
            return true;
        }
    }

    public function delete(User $user, Vote $vote)
    {
        return $user->owns($vote) && ((new Carbon($vote->created_at))->addMinutes(17)->diffInMinutes(Carbon::now(), false) < 0);
    }

    public function update(User $user, Vote $vote)
    {
        return $user->owns($vote) && ((new Carbon($vote->finished_at))->diffInMinutes(Carbon::now(), false) < 0);
    }

    public function createVoteTag(User $user, Vote $vote)
    {
        return $user->owns($vote);
    }

    public function deleteVoteTag(User $user, Vote $vote)
    {
        return $user->owns($vote);
    }

    public function createVoteAttachment(User $user, Vote $vote)
    {
        return $user->owns($vote);
    }

    public function deleteVoteAttachment(User $user, Vote $vote)
    {
        return $user->owns($vote);
    }
}
