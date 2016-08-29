<?php

namespace App\Events;

class NewMessageEvent extends MessageEvent
{
    public $socketEvent = 'newMessage';
}
