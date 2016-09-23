<?php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;

class AvatarService extends Facade
{

    protected static function getFacadeAccessor()
    {
        return 'AvatarService';
    }

}