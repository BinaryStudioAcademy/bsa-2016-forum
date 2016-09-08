<?php

namespace App\Events;

use Illuminate\Queue\SerializesModels;

class NewCommentEvent extends Event
{
    use SerializesModels;

    public $comment;
    public $target;
    public $target_type;
    public $users;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }
}
