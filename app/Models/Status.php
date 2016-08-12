<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Status extends Model
{
    use SoftDeletes;

    protected $table = 'user_statuses';
    protected $primaryKey = 'id';
    protected $guarded = ['id'];

    public function users()
    {
        return $this->hasMany(User::class,'status_id');
    }
}
