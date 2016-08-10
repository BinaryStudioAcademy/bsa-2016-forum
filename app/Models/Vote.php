<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Vote extends Model

{
    use SoftDeletes;

    //TODO     const RULES = ['title'  => 'required'];

    protected $fillable = ['title'];

    protected $dates = ['deleted_at'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
   
    //TODO user has many Vote
   
    public function voteItem()
    {
        return $this->hasMany(VoteItem::Class);
    }

    public function votePermission()
    {
        return $this->hasMany(VotePermission::Class);
    }

    public function voteResult()
    {
        return $this->hasMany(VoteResult::class);
    }

    public function tags()
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }

    public function attachments()
    {
        return $this->morphToMany(Tag::class, 'attachmenttable');
    }

    public function likes()
    {
        return $this->morphToMany(Like::class, 'likeable');
    }

    public function comments()
    {
        return $this->morphToMany(Comment::class, 'commentable');
    }

    public function notifications()
    {
        return $this->morphToMany(Notification::class, 'notificationableable');
    }
}
