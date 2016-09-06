<?php

namespace App\Policies;

use Illuminate\Auth\Access\HandlesAuthorization;
use App\Models\User;
use App\Models\Message;

class MessagePolicy
{
    use HandlesAuthorization;

    public function viewAll(User $user, Message $message, User $selectedUser)
    {
        return $user->id == $selectedUser->id;
    }

    public function create(User $user, Message $message, User $selectedUser)
    {
        return $user->id == $selectedUser->id;
    }

    public function show(User $user, Message $message, User $selectedUser)
    {
        return $user->id == $selectedUser->id;
    }

    public function update(User $user, Message $message, User $selectedUser, $timeInterval)
    {
        if ($user->id !== $selectedUser->id) {
            return false;
        }

        if (!$this->checkTimeInterval($message, $timeInterval)) {
            return false;
        }

        return true;
    }

    public function delete(User $user, Message $message, User $selectedUser, $timeInterval)
    {
        if ($user->id !== $selectedUser->id) {
            return false;
        }

        if (!$this->checkTimeInterval($message, $timeInterval)) {
            return false;
        }

        return true;
    }

    protected function checkTimeInterval(Message $message, $time)
    {
        $now = time();
        $createdAt = $message->created_at->timestamp;
        $passedTime = $now - $createdAt;

        if ($passedTime > $time * 60) {
            return false;
        }

        return true;
    }


}
