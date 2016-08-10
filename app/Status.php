<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    protected $table = 'user_statuses';
    protected $primaryKey = 'id';
    protected $guarded = ['id'];

    public function users()
    {
        return $this->hasMany(User::class,'status_id');
    }
}
