<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class VoteResult extends Model

{
    use SoftDeletes;

    protected $dates = ['deleted_at'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function vote()
    {
        return $this->belongsTo(Vote::class);
    }

    public function voteItem()
    {
        return $this->belongsTo(VoteItem::class);
    }

}
