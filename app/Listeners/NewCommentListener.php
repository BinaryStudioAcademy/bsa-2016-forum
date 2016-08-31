<?php

namespace App\Listeners;

use App\Events\NewCommentEvent;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class NewCommentListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  SomeEvent  $event
     * @return void
     */
    public function handle(NewCommentEvent $event)
    {
        //
        logger("work");
    }
}
