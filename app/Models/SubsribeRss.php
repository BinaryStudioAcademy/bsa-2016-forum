<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Vote extends Model

{
    use SoftDeletes;

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function topic()
    {
        return $this->belongsTo('App\Topic');
    }

}

