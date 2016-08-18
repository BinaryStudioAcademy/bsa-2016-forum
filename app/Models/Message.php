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
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = ['deleted_at'];

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

    public static function between($userId, $withUserId)
    {
        return Message::where(function ($msg) use ($userId, $withUserId) {
            $msg->where('user_from_id', $userId)
                ->where('user_to_id', $withUserId);
        })->orWhere(function ($msg) use ($userId, $withUserId) {
            $msg->where('user_to_id', $userId)
                ->where('user_from_id', $withUserId);
        });
    }
}
