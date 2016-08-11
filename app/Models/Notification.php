<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
}
