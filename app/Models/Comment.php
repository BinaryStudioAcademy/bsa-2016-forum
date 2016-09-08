<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;

class Comment extends Model
{
    use SoftDeletes;

    protected $fillable = ['content_origin', 'rating', 'user_id', 'content_generated'];

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
     * Get all of the owning commentable models.
     */
    public function commentable()
    {
        return $this->morphTo();
    }

    /**
     * Get all of the attachments that are assigned this comment.
     */
    public function attachments()
    {
        return $this->morphToMany(Attachment::class, 'attachmenttable');
    }

    /**
     * Get all of the comment's likes.
     */
    public function likes()
    {
        return $this->morphMany(Like::class, 'likeable');
    }

    /**
     * Get all of the notifications that are assigned this comment.
     */
    public function notifications()
    {
        return $this->morphToMany(Notification::class, 'notificationable');
    }

    /**
     * @return mixed
     */
    public function hasChildComments()
    {
        return $this->comments()->exists();
    }

    /**
     * Get all of the comment's comments.
     */
    public function comments()
    {
        return $this->morphMany(Comment::class, 'commentable');
    }

    /**
     * @return bool
     */
    public function canBeDeleted()
    {
        $user = Auth::user();
        return ($user->isAdmin() || ($user->owns($this) && !$this->comments()->exists())) && !$this->trashed();
    }

    /**
     * @param $value
     * @return string
     */
    public function getContentOriginAttribute($value)
    {
        if ($this->trashed() && Auth::user()->isAdmin()) {
            return $value . ' (Deleted)';
        } else {
            return $value;
        }
    }
}
