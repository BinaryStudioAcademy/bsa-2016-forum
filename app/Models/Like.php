<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Like extends Model
{
    use SoftDeletes;
    
    protected $fillable = ['user_id'];
    
    public function topics()
    {
        return $this->morphedByMany('App\Topic', 'likeable');
    }

    public function votes()
    {
        return $this->morphedByMany('App\Vote', 'likeable');
    }
    
    public function comments()
    {
        return $this->morphedByMany('App\Comment', 'likeable');
    }
    
    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
