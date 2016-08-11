<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    public function topics()
    {
        return $this->morphedByMany('App\Topic', 'taggable');
    }

    public function votes()
    {
        return $this->morphedByMany('App\Vote', 'taggable');
    }
}
