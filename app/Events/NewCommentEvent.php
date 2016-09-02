<?php

namespace App\Events;

class NewCommentEvent extends CommentEvent
{
    public $socketEvent = 'newComment';
}
