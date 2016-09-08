<?php

namespace App\Events;

class NewBroadcastCommentEvent extends CommentEvent
{
    public $socketEvent = 'newComment';
}
