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
        return $user->owns($topic);
    }

    public function update(User $user, Topic $topic)
    {
        return $user->owns($topic);
    }

    public function createTopicAttachment(User $user, Topic $topic)
    {
        return $user->owns($topic);
    }

    public function deleteTopicAttachment(User $user, Topic $topic)
    {
        return $user->owns($topic);
    }

    public function createTopicTag(User $user, Topic $topic)
    {
        return $user->owns($topic);
    }

    public function deleteTopicTag(User $user, Topic $topic)
    {
        return $user->owns($topic);
    }

}
