<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notificationable extends Model
{
    protected $fillable = ['notification_id','notificationtable_id','notification_type','notification_type'];

    protected $dates = ['deleted_at'];

    private $rules = array(
        'notification_type' => 'require',
        'notification_type' =>'require'
        // .. more rules here ..
    );

    public function validate($data)
    {
        // make a new validator object
        $v = Validator::make($data, $this->rules);
        // return the result
        return $v->passes();
    }

    public function notification()
    {
        return $this->belongsTo(Notification::class);
    }

    //https://laravel.com/docs/5.1/eloquent-relationships#polymorphic-relations

    //to do in comments, topics, votes
    /**
     * Get all of the notifications for the comment or topic or vote.
     */
/*    public function notificationable()
    {
        return $this->morphToMany(Notification::class, 'notificationable');
    }*/
}
