<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Cviebrock\EloquentSluggable\Sluggable;

class Topic extends Model
{
    public static $morphTag = 'Topic';
    protected $morphClass = 'Topic';
    use SoftDeletes;
    use Sluggable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'description', 'user_id', 'category_id', 'slug'];

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
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

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
        return $this->hasMany(Bookmark::class, 'topic_id', 'id');
    }

    public function attachments()
    {
        return $this->morphToMany(Attachment::class, 'attachmenttable');
    }

    /**
     * Get all of the topic's likes
     */
    public function likes()
    {
        return $this->morphMany(Like::class, 'likeable');
    }

    public function tags()
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }

    /**
     * Get all of the topic's comments.
     */
    public function comments()
    {
        return $this->morphMany(Comment::class, 'commentable');
    }

    public function activeUsersCount() {
        return $this->comments()->distinct('user_id')->count('user_id');
    }

    public function notifications()
    {
        return $this->morphToMany(Notification::class, 'notificationable');
    }

    /**
     * Scope a query to only include topics which contain a searching text in the topic's name or
     *  in the topic's description
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param string $searchStr
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeFilterByQuery(Builder $query, $searchStr)
    {
        if ($searchStr) {
            $query = $query->where('name','LIKE','%'.$searchStr.'%')
                ->orWhere('description','LIKE','%'.$searchStr.'%');
        }

        return $query;
    }

    /**
     * Scope a query to only include topics which have tags with selected IDs
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

    public function subscription($userId)
    {
        return $this->morphMany(Subscription::class, Subscription::$name)->where('user_id', $userId)->first();
    }

    /**
     * Return the sluggable configuration array for this model.
     *
     * @return array
     */
    public function sluggable()
    {
        return [
            'slug' => [
                'source' => 'name'
            ]
        ];
    }

    /**
     * Get the route key for the model.
     *
     * @return string
     */
    public function getRouteKeyName()
    {
        return 'slug';
    }
    /**
     * Scope a query to only include limit of topics
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param $limit
     * @return \Illuminate\Database\Eloquent\Builder
     */

    public function scopeFilterByLimit(Builder $query, $limit)
    {
        return $limit ? $query->limit($limit) : $query;
    }
}
