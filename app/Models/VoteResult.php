<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class VoteResult extends Model

{
    use SoftDeletes;

    protected $fillable = ['vote_id', 'vote_item_id', 'user_id'];
    protected $dates = ['deleted_at'];
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = ['deleted_at'];

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
