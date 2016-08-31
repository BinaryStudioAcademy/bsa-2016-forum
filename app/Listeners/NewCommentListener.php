<?php

namespace App\Listeners;

use App\Events\NewCommentEvent;
use App\Facades\NotificationService;
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
     * @param NewCommentEvent $event
     */
    public function handle(NewCommentEvent $event)
    {
        $body = [
            'users' => $event->users,
            'title' => 'Appeared new comment',
            'text' => 'New comment to ' . $event->target_type,
            'url' => config(url('app.url'))
        ];

        NotificationService::send($body);
    }
}
