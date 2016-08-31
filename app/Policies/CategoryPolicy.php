<?php

namespace App\Policies;

use App\Models\Category;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class CategoryPolicy
{
    use HandlesAuthorization;

    public function before(User $user)
    {
        if ($user->isAdmin()) {
            return true;
        }
    }

    public function destroyCategory(User $user, Category $category)
    {
        return false;
    }

    public function updateCategory(User $user, Category $category)
    {
        return false;
    }

    public function storeCategory(User $user, Category $category)
    {
        return false;
    }
}
