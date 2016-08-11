<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
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
}
