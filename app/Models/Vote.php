<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Vote extends Model

{
    public static $morphTag = 'vote';

    use SoftDeletes;

    protected $fillable = ['title', 'user_id', 'is_single', 'is_public', 'finished_at'];

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
   
    public function voteItems()
    {
        return $this->hasMany(VoteItem::class);
    }

    public function votePermissions()
    {
        return $this->hasMany(VotePermission::class);
    }

    public function voteResults()
    {
        return $this->hasMany(VoteResult::class);
    }

    public function tags()
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }

    public function attachments()
    {
        return $this->morphToMany(Attachment::class, 'attachmenttable');
    }

    /**
     * Get all of the vote's likes
     */
    public function likes()
    {
        return $this->morphMany(Like::class, 'likeable');
    }

    /**
     * Get all of the vote's comments.
     */
    public function comments()
    {
        return $this->morphMany(Comment::class, 'commentable');
    }

    public function notifications()
    {
        return $this->morphToMany(Notification::class, 'notificationable');
    }

    /**
     * Scope a query to only include votes which contain a searching text in the vote's title
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param string $searchStr
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeFilterByQuery(Builder $query, $searchStr)
    {
        if ($searchStr) {
            $query = $query->where('title','LIKE','%'.$searchStr.'%');
        }
        return $query;
    }

    /**
     * Scope a query to only include votes which have tags with selected IDs
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param array $tagIds
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeFilterByTags(Builder $query, array $tagIds)
    {
        if (!empty($tagIds)) {
            $query = $query->whereHas('tags', function($q) use ($tagIds){
                $q->whereIn('tag_id', $tagIds);
            });
        }
        return $query;
    }

    public function subscribers()
    {
        return $this->morphToMany(User::class, Subscription::$name)->withTimestamps();
    }
}
