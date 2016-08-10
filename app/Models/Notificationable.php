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

    public function notificationableable()
    {
        return $this->morphTo();
    }

    public function notification()
    {
        return $this->belongsTo('App\Notification');
    }

    //https://laravel.com/docs/5.1/eloquent-relationships#polymorphic-relations

    //to do in comments
/*    public function notificationableables()
    {
        return $this->morphMany('App\Notificationable', 'notificationableable');
    }*/

    //to do in topics
/*    public function notificationableables()
    {
        return $this->morphMany('App\Notificationable', 'notificationableable');
    }*/

    //to do in votes
/*    public function notificationableables()
    {
        return $this->morphMany('App\Notificationable', 'notificationableable');
    }*/
}
