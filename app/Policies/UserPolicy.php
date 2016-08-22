<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
{
    use HandlesAuthorization;

    public function before(User $user)
    {
        if ($user->isAdmin()) {
            return true;
        }
    }

    public function updateRole(User $user, User $selectedUser)
    {
        return false;
    }

    public function getUserRole(User $user, User $selectedUser)
    {
        return false;
    }

    public function delete(User $user, User $selectedUser)
    {
        return false;
    }

    public function store(User $user, User $selectedUser)
    {
        return false;
    }

    public function show(User $user, User $selectedUser)
    {
        return $user->id == $selectedUser->id;
    }
}
