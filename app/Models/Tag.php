<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tag extends Model
{
    use SoftDeletes;
    protected $fillable = ['name'];
    
    public function topics()
    {
        return $this->morphedByMany('App\Topic', 'taggable');
    }

    public function votes()
    {
        return $this->morphedByMany('App\Vote', 'taggable');
    }
}
