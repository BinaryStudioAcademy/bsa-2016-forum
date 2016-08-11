<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Message extends Model
{
    use SoftDeletes;

    protected $table='messages';
    protected $primaryKey = 'id';
    protected $guarded = ['id'];

    public function user()
    {
        return $this->belongsTo(User::class,'user_from_id');
    }
    public function attachments()
    {
        return $this->morphToMany(Attachment::class, 'attachmenttable');
    }
    public function notifications()
    {
        return $this->morphToMany(Notification::class, 'attachmenttable');
    }
}
