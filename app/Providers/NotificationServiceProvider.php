<?php
/**
 * Created by PhpStorm.
 * User: Stepan
 * Date: 01.09.2016
 * Time: 2:16
 */

namespace App\Providers;


use App\Services\NotificationService;
use Illuminate\Support\ServiceProvider;

class NotificationServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        \App::bind('NotificationService', function()
        {
            return new NotificationService;
        });
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}