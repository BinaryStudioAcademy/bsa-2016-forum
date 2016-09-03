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
    public function toUser()
    {
        return $this->belongsTo(User::class,'user_to_id');
    }
    public function attachments()
    {
        return $this->morphToMany(Attachment::class, 'attachmenttable');
    }
    public function notifications()
    {
        return $this->morphToMany(Notification::class, 'notificationable');
    }

    public static function getLastIncoming($userId) 
    {
        return self::where('user_to_id', $userId)
            ->groupBy('user_from_id')
            ->withTrashed()
            ->get();
    }

    public static function getConversation($userId, $withUserId)
    {
        return static::where(function ($msg) use ($userId, $withUserId) {
            $msg->where('user_from_id', $userId)
                ->where('user_to_id', $withUserId);
        })->orWhere(function ($msg) use ($userId, $withUserId) {
            $msg->where('user_to_id', $userId)
                ->where('user_from_id', $withUserId);
        })->withTrashed();
    }
}
