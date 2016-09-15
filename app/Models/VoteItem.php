<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;


class VoteItem extends Model
{

    use SoftDeletes;

    protected $fillable = ['name', 'vote_id', 'user_id'];
    
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

    public function vote()
    {
        return $this->belongsTo(Vote::class);
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
     * Get all of the voteItem's likes
     */
    public function likes()
    {
        return $this->morphMany(Like::class, 'likeable');
    }

    /**
     * Get all of the voteItem's comments.
     */
    public function comments()
    {
        return $this->morphMany(Comment::class, 'commentable');
    }

    public function canBeDeleted()
    {
        return Auth::user()->isAdmin() || (Auth::user()->owns($this)  && !$this->comments()->exists() && $this->voteResults()->exists());
    }

    public function canBeEdited()
    {
        return Auth::user()->isAdmin() || (Auth::user()->owns($this)  && !$this->comments()->exists() && $this->voteResults()->exists());
    }

}
