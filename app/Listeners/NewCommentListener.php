<?php

namespace App\Listeners;

use App\Events\NewCommentEvent;
use App\Facades\CurlService;
use App\Models\Topic;
use App\Models\Vote;
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
        $text = 'New comment to "';
        switch ($event->target_type)
        {
            case Topic::$morphTag:
                $text .= $event->target->name;
                break;
            case Vote::$morphTag:
                $text .= $event->target->title;
                break;
        }
        $text .= '"';
        $body = [
            'users' => $event->users,
            'title' => 'Appeared new comment',
            'text' => $text,
            'url' => config('app.url').'/#/'.strtolower($event->target_type).'s/'.$event->target->id
        ];

        CurlService::sendNotificationRequest($body);
    }
}
