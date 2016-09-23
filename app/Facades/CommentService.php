<?php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;

class CommentService extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'CommentService';
    }
}