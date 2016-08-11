<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Mail\Message;

class Notification extends Model
{
    protected $fillable = ['user_id'];

    protected $dates = ['deleted_at'];

    private $rules = array(
        // .. more rules here ..
    );

    public function validate($data)
    {
        // make a new validator object
        $v = Validator::make($data, $this->rules);
        // return the result
        return $v->passes();
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }


    /**
     * Get all of the topics that are assigned this notification.
     */
    public function topics()
    {
        return $this->morphedByMany(Topic::class, 'notificationable');
    }

    /**
     * Get all of the votes that are assigned this notification.
     */
    public function votes()
    {
        return $this->morphedByMany(Vote::class, 'notificationable');
    }

    /**
     * Get all of the comments that are assigned this notification.
     */
    public function comments()
    {
        return $this->morphedByMany(Comment::class, 'notificationable');
    }


    /**
     * Get all of the likes that are assigned this notification.
     */
    public function likes()
    {
        return $this->morphedByMany(Like::class, 'notificationable');
    }

    /**
     * Get all of the messages that are assigned this notification.
     */
    public function messages()
    {
        return $this->morphedByMany(Message::class, 'notificationable');
    }

    /**
     * Get all of the notifications that are assigned this notification.
     */
    public function notifications()
    {
        return $this->morphedByMany(Notification::class, 'notificationable');
    }

    ////////////////////

    public function likes_rel()
    {
        return $this->morphToMany(Like::class, 'likeable');
    }

    public function comments_rel()
    {
        return $this->morphToMany(Comment::class, 'commentable');
    }

    public function notifications_rel()
    {
        return $this->morphToMany(Notification::class, 'notificationable');
    }
}
