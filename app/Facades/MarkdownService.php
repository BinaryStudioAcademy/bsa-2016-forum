<?php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;

class MarkdownService extends Facade
{

    /**
     * @return string
     */
    protected static function getFacadeAccessor()
    {
        return 'MarkdownService';
    }

}