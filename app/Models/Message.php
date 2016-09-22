<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use DB;

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

    public function getMessageAttribute($value)
    {
        return ($this->trashed())?'Removed..':$value;
    }

    public static function getLast($userId)
    {
        $outgoing = self::whereIn('id', function($query) use ($userId) {
            $query->select(DB::raw('MAX(id)'))
                ->from((new self)->getTable())
                ->where('user_from_id', $userId)
                ->where('created_at', '>', Carbon::now()->subDay(2))
                ->groupBy('user_to_id')
                ->havingRaw('MAX(id)');
        })->withTrashed();

        $messages =   self::whereIn('id', function($query) use ($userId) {
            $query->select(DB::raw('MAX(id)'))
                ->from((new self)->getTable())
                ->where('user_to_id', $userId)
                ->where('created_at', '>', Carbon::now()->subDay(2))
                ->groupBy('user_from_id')
                ->havingRaw('MAX(id)');
        })->union($outgoing)->orderBy('created_at', 'desc')->withTrashed()->get();

        $uniq = [];
        $filteredMassages = [];
        foreach ($messages as $message) {
            if ($message->user_from_id <= $message->user_to_id) {
                $pair = $message->user_from_id . '-' . $message->user_to_id;
            } else {
                $pair = $message->user_to_id . '-' . $message->user_from_id;
            }
            if (!in_array($pair, $uniq)) {
                $uniq[] = $pair;
                $filteredMassages[] = $message;
            }
        }

        return new Collection($filteredMassages);
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
