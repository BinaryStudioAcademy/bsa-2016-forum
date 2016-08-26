<?php

use App\Models\Notification;
use App\Models\Topic;
use App\Models\Vote;
use App\Models\Comment;
use App\Models\Like;
use App\Models\Message;

class NotificationTest extends TestCase
{
    public function testCreateNotificationForTopic()
    {
        $notification = factory(Notification::class)->make();
        $notificationArray = $notification->toArray();
        $topic = Topic::all()->random(1);
        $topic->notifications()->save($notification);
        $this->seeInDatabase('notifications', $notificationArray);
    }

    public function testCreateNotificationForVote()
    {
        $notification = factory(Notification::class)->make();
        $notificationArray = $notification->toArray();
        $vote = Vote::all()->random(1);
        $vote->notifications()->save($notification);
        $this->seeInDatabase('notifications', $notificationArray);
    }

    public function testCreateNotificationForComment()
    {
        $notification = factory(Notification::class)->make();
        $notificationArray = $notification->toArray();
        $comment = Comment::all()->random(1);
        $comment->notifications()->save($notification);
        $this->seeInDatabase('notifications', $notificationArray);
    }

    public function testCreateNotificationForLike()
    {
        $notification = factory(Notification::class)->make();
        $notificationArray = $notification->toArray();
        $like = Like::all()->random(1);
        $like->notifications()->save($notification);
        $this->seeInDatabase('notifications', $notificationArray);
    }

    public function testCreateNotificationForMessage()
    {
        $notification = factory(Notification::class)->make();
        $notificationArray = $notification->toArray();
        $message = Message::all()->random(1);
        $message->notifications()->save($notification);
        $this->seeInDatabase('notifications', $notificationArray);
    }
}