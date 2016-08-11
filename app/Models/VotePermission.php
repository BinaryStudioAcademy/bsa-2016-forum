<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class VotePermission extends Model
{

    use SoftDeletes;

    public function user()
    {
        return $this->belongsTo('App\User');
    }
    //TODO user has many VotePermission

    public function vote()
    {
        return $this->belongsTo('App\Vote');
    }

}
