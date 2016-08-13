<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = ['content_origin','rating','user_id','content_generated'];

    protected $dates = ['deleted_at'];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = ['deleted_at'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get all of the topics that are assigned this comment.
     */
    public function topics()
    {
        return $this->morphedByMany(Topic::class, 'commentable');
    }
    /**
     * Get all of the votes that are assigned this comment.
     */
    public function votes()
    {
        return $this->morphedByMany(Vote::class, 'commentable');
    }

    /**
     * Get all of the comments that are assigned this comment.
     */
    public function comments()
    {
        return $this->morphedByMany(Comment::class, 'commentable');
    }

    /**
     * Get all of the tags that are assigned this comment.
     */
    public function tags()
    {
        return $this->morphedByMany(Tag::class, 'commentable');
    }

    /**
     * Get all of the attachments that are assigned this comment.
     */
    public function attachments()
    {
        return $this->morphedByMany(Attachment::class, 'commentable');
    }

    /**
     * Get all of the attachments that are assigned this comment.
     */
    public function likes()
    {
        return $this->morphedByMany(Like::class, 'commentable');
    }

    /**
     * Get all of the notifications that are assigned this comment.
     */
    public function notifications()
    {
        return $this->morphedByMany(Notification::class, 'commentable');
    }
    /////////////

    public function tags_rel()
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }

    public function attachments_rel()
    {
        return $this->morphToMany(Attachment::class, 'attachmenttable');
    }

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
