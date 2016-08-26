<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bookmark extends Model
{
    protected $fillable = ['user_id', 'topic_id'];
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = ['deleted_at'];

    public function topic()
    {
        return $this->belongsTo(Topic::class);
    }
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
