<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Bookmark;
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

    public function destroy(User $user, Bookmark $bookmark)
    {
        return $user->owns($bookmark);
    }

    public function store(User $user, Bookmark $bookmark)
    {
        return $user->owns($bookmark);
    }

    public function index(User $user, Bookmark $bookmark)
    {
        return $user->owns($bookmark);
    }
}
