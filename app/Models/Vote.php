<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Vote extends Model

{
    use SoftDeletes;

    //TODO     const RULES = ['title'  => 'required'];

    protected $fillable = ['title'];

    public function user()
    {
        return $this->belongsTo('App\User');
    }
    //TODO user has many Vote
    public function voteItem()
    {
        return $this->hasMany('App\VoteItem');
    }

    public function votePermission()
    {
        return $this->hasMany('App\VotePermission');
    }

    public function voteResult()
    {
        return $this->hasMany('App\VoteResult');
    }

}
