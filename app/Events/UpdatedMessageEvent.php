<?php

namespace App\Events;

class UpdatedMessageEvent extends MessageEvent
{
    public $socketEvent = 'updatedMessage';
}
