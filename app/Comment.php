<?php

namespace App;

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

    public function notification()
    {
        return $this->belongsTo('App\User');
    }
}
