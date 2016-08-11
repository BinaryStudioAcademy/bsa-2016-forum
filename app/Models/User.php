<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    protected $table = 'users';

    protected $primaryKey = 'id';
    protected $guarded = ['id'];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'hash_password', 'token',
    ];
    public function message()
    {
        return $this->hasMany(Message::class,'user_from_id');
    }
    public function status()
    {
        return $this->belongsTo(Status::class, 'status_id');
    }


}
