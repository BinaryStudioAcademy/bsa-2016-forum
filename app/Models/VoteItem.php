<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class VoteItem extends Model
{

    use SoftDeletes;
    
    //TODO     const RULES = ['name'  => 'required'];

    protected $fillable = ['name'];

    public function user()
    {
        return $this->belongsTo('App\User');
    }
    //TODO user has many VoteItem
    public function vote()
    {
        return $this->belongsTo('App\Vote');
    }

    public function voteResult()
    {
        return $this->hasMany('App\VoteResult');
    }
}
