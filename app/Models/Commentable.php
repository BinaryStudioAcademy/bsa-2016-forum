<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Commentables extends Model
{
    protected $fillable = ['comment_id','commentable_id','comment_type'];

    protected $dates = ['deleted_at'];

    private $rules = array(
        'comment_type' => 'require',
        // .. more rules here ..
    );

    public function validate($data)
    {
        // make a new validator object
        $v = Validator::make($data, $this->rules);
        // return the result
        return $v->passes();
    }

    public function commentable()
    {
        return $this->morphTo();
    }

    public function comment()
    {
        return $this->belongsTo('App\Comment');
    }

    //https://laravel.com/docs/5.1/eloquent-relationships#polymorphic-relations

    //to do in comments
    /*    public function commentables()
        {
            return $this->morphMany('App\Commentable', 'commentable');
        }*/

    //to do in topics
    /*    public function commentables()
        {
            return $this->morphMany('App\Commentable', 'commentable');
        }*/

    //to do in votes
    /*    public function commentables()
        {
            return $this->morphMany('App\Commentable', 'commentable');
        }*/
}
