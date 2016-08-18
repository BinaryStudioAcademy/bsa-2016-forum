<?php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;

class TagService extends Facade
{

    /**
     * @return string
     */
    protected static function getFacadeAccessor()
    {
        return 'TagService';
    }

}