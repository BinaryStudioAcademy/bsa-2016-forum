<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Validator::extend('is_current_user', function ($attribute, $value, $parameters, $validator) {
            return $value == Auth::id();
        });

        Validator::extend('not_same_user', function ($attribute, $value, $parameters, $validator) {
            return $value != Auth::id();
        });

        Validator::extend('file_isset', function ($attribute, $value, $parameters, $validator) {
            return file_exists($value);
        });
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
