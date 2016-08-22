<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Vote;
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
        return $user->owns($vote);
    }

    public function update(User $user, Vote $vote)
    {
        return $user->owns($vote);
    }

    public function createVoteTag(User $user, Vote $vote)
    {
        return $user->owns($vote);
    }

}
