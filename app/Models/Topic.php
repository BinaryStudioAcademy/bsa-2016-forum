<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Topic extends Model
{
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'description', 'user_id'];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['deleted_at'];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = ['deleted_at'];

    /**
     * Get topic's user
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function bookmarks()
    {
        return $this->belongsToMany(User::class, 'bookmarks', 'topic_id', 'user_id');
    }

    public function attachments()
    {
        return $this->morphToMany(Attachment::class, 'attachmenttable');
    }

    public function likes()
    {
        return $this->morphToMany(Like::class, 'likeable');
    }

    public function tags()
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }

    public function comments()
    {
        return $this->morphToMany(Comment::class, 'commentable');
    }

    public function notifications()
    {
        return $this->morphToMany(Notification::class, 'notificationable');
    }


}
