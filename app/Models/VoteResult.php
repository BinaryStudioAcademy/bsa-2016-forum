<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class VoteResult extends Model
{
    use SoftDeletes;

    public function user()
    {
        return $this->belongsTo('App\User');
    }
    //TODO user has many VoteResult
    public function vote()
    {
        return $this->belongsTo('App\Vote');
    }

    public function voteItem()
    {
        return $this->belongsTo('App\VoteItem');
    }

}
