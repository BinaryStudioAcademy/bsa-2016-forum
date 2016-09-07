<?php

namespace App\Listeners;

use App\Events\NewCommentEvent;
use App\Facades\CurlService;
use App\Models\Topic;
use App\Models\Vote;
use Illuminate\Database\Eloquent\ModelNotFoundException;
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
        if(count($event->users) == 0)
            return;

        $text = 'New comment to "';
        $commentTagResourceUrl = config('app.url').'/#/';
        switch ($event->target_type)
        {
            case Topic::$morphTag:
                $text .= $event->target->name;
                $commentTagResourceUrl.= "topics/";
                break;
            case Vote::$morphTag:
                $text .= $event->target->title;
                $commentTagResourceUrl.= "votes/";
                break;
            default:
                throw new ModelNotFoundException();
                break;
        }

        $text .= '"';
        $commentTagResourceUrl.= $event->target->id;

        $body = [
            'users' => $event->users,
            'title' => 'Appeared new comment',
            'text' => $text,
            'url' => $commentTagResourceUrl
        ];

        CurlService::sendNotificationRequest($body);
    }
}
