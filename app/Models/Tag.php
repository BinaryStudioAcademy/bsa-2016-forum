<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tag extends Model
{
    use SoftDeletes;
    
    protected $fillable = ['name'];
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = ['deleted_at'];
    
    public function topics()
    {
        return $this->morphedByMany(Topic::class, 'taggable');
    }

    public function votes()
    {
        return $this->morphedByMany(Vote::class, 'taggable');
    }
}
