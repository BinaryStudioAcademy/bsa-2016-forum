<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Like extends Model
{
    use SoftDeletes;
    
    protected $fillable = ['user_id'];
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = ['deleted_at'];

    public function topics()
    {
        return $this->morphedByMany(Topic::class, 'likeable');
    }

    public function votes()
    {
        return $this->morphedByMany(Vote::class, 'likeable');
    }
    
    public function comments()
    {
        return $this->morphedByMany(Comment::class, 'likeable');
    }
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function notifications()
    {
        return $this->morphToMany(Notification::class, 'notificationable');
    }
}
