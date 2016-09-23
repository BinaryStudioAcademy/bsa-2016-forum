<?php
/**
 * Created by PhpStorm.
 * User: lyudmila
 * Date: 23.09.16
 * Time: 14:15
 */

namespace App\Facades;

use Illuminate\Support\Facades\Facade;

class CommentService extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'CommentService';
    }
}