<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = ['content_origin','rating','user_id','content_generated'];

    protected $dates = ['deleted_at'];

    private $rules = array(
        'content_origin' => 'require',
        'content_generated' =>'require'
        // .. more rules here ..
    );

    public function validate($data)
    {
        // make a new validator object
        $v = Validator::make($data, $this->rules);
        // return the result
        return $v->passes();
    }

    public function user()
    {
        return $this->belongsTo(App/User::class);
    }

    /**
     * Get all of the topics that are assigned this comment.
     */
    public function topics()
    {
        return $this->morphedByMany(App/Topic::class, 'commentable');
    }

    /**
     * Get all of the votes that are assigned this comment.
     */
    public function votes()
    {
        return $this->morphedByMany(App/Vote::class, 'commentable');
    }

    /**
     * Get all of the comments that are assigned this comment.
     */
    public function comments()
    {
        return $this->morphedByMany(App/Comment::class, 'commentable');
    }

}
