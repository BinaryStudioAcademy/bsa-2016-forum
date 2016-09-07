<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    public static $name = 'subscription';
    protected $hidden = ['updated_at', 'user_id'];
    protected $fillable = ['subscription_id', 'subscription_type'];
}
