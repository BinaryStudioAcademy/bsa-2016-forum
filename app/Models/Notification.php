<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    protected $hidden = ['updated_at', 'user_id'];
}
