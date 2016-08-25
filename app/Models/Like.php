<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Like extends Model
{
    use SoftDeletes;
    
    protected $fillable = ['user_id','likeable_id','likeable_type'];
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = ['deleted_at'];

    /**
     * Get all of the owning likeable models.
     */
    public function likeable()
    {
        return $this->morphTo();
    }
    
    public function comments_this_method_should_be_deleted()
    {
        return $this->morphedByMany(Comment::class, 'likeable');
    }
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
