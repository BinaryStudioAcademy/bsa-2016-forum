<?php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;

class CurlService extends Facade
{

    protected static function getFacadeAccessor()
    {
        return 'CurlService';
    }

}