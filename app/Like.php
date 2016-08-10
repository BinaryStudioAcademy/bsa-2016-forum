<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    public function topics()
    {
        return $this->morphedByMany('App\Topic', 'taggable');
    }

    public function votes()
    {
        return $this->morphedByMany('App\Vote', 'taggable');
    }
    
    public function comments()
    {
        return $this->morphedByMany('App\Comment', 'taggable');
    }
}
