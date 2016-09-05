<?php

namespace App\Policies;

use App\Models\User;
use App\Models\VoteItem;
use Carbon\Carbon;
use Illuminate\Auth\Access\HandlesAuthorization;

class VoteItemPolicy
{
    use HandlesAuthorization;

    public function before(User $user)
    {
        if($user->isAdmin()){
            return true;
        }
    }

    public function delete(User $user, VoteItem $voteItem)
    {
        return $user->owns($voteItem) && (!$voteItem->hasChildComments() && !$voteItem->voteResults()->exists());
    }

    public function update(User $user, VoteItem $voteItem)
    {
        return $user->owns($voteItem);
    }
}
