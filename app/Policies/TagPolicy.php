<?php

namespace App\Policies;

use App\Models\Tag;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class TagPolicy
{
    use HandlesAuthorization;

    public function before($user, $ability)
    {
        if ($user->isAdmin()) {
            return true;
        }
    }

    public function viewAll(User $user, Tag $topic)
    {
        return false;
    }

    public function update(User $user, Tag $topic)
    {
        return false;
    }

    public function delete(User $user, Tag $topic)
    {
        return false;
    }
}
