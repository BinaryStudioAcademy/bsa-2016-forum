<?php

namespace App;

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
}
