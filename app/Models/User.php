<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use DCN\RBAC\Traits\HasRoleAndPermission;
use DCN\RBAC\Contracts\HasRoleAndPermission as HasRoleAndPermissionContract;
use Illuminate\Database\Eloquent\ModelNotFoundException;



class User extends Authenticatable implements HasRoleAndPermissionContract
{
    use HasRoleAndPermission, SoftDeletes;

    protected $table = 'users';

    protected $primaryKey = 'id';
    protected $guarded = ['id'];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'hash_password', 'token', 'deleted_at'
    ];

    public function messages()
    {
        return $this->hasMany(Message::class, 'user_from_id');
    }

    public function status()
    {
        return $this->belongsTo(Status::class, 'status_id');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }

    public function topics()
    {
        return $this->hasMany(Topic::class);
    }

    public function subscriptionsRss()
    {
        return $this->hasMany(SubscribeRss::class);
    }

    public function bookmarks()
    {
        return $this->belongsToMany(Topic::class, 'bookmarks', 'user_id', 'topic_id');
    }

    public function votes()
    {
        return $this->hasMany(Vote::class);
    }

    public function voteItems()
    {
        return $this->hasMany(VoteItem::class);
    }

    public function votePermissions()
    {
        return $this->hasMany(VotePermission::class);
    }

    public function voteResults()
    {
        return $this->hasMany(VoteResult::class);
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    public function getVote($voteId)
    {
        return $this->votes()->where('id',$voteId)->first();
    }

    public function isExist($userData)
    {
        //var_dump($userData);
     //   $id = $userData->id;
     //   $user = $this->where('global_id',$userData->id)->first();
       // $user = User::where('email', '=', $userData->email)->get();
       // var_dump($user);
       // var_dump($id);

        try {
            $user =$this->where('global_id',$userData->id)->firstOrFail();
            var_dump($userData->id);
            var_dump($user);
        }
        catch  (ModelNotFoundException $e){

            var_dump('ffff');

            try {
                $user =$this->where('email',$userData->email)->firstOrFail();
                var_dump($user->email);
            }
            catch (ModelNotFoundException $e)
            {
                return false;
            }
        }
        return $user;
    }
}
