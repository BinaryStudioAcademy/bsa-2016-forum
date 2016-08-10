<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class VoteItem extends Model
{

    use SoftDeletes;
    
    //TODO     const RULES = ['name'  => 'required'];

    protected $fillable = ['name'];
    
    protected $dates = ['deleted_at'];

    public function user()
    {
        return $this->belongsTo(User::Class);
    }

    //TODO user has many VoteItem

    public function vote()
    {
        return $this->belongsTo(Vote::class);
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
