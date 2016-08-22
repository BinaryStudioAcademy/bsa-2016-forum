<?php

namespace App\Policies;

use App\Models\Topic;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class TopicPolicy
{
    use HandlesAuthorization;

    public function before($user, $ability)
    {
        if ($user->isAdmin()) {
            return true;
        }
    }

    public function delete(User $user, Topic $topic)
    {
        if ($user->owns($topic)) {
            return true;
        }

        return false;
    }

    public function update(User $user, Topic $topic)
    {
        if ($user->owns($topic)) {
            return true;
        }

        return false;
    }
}
