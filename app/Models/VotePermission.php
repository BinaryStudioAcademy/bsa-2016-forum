<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class VotePermission extends Model
{
    protected $dates = ['deleted_at'];
    
    use SoftDeletes;

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    //TODO user has many VotePermission

    public function vote()
    {
        return $this->belongsTo(Vote::class);
    }

}
