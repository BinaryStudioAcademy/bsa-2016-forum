<?php

namespace App\Providers;

use App\Models\VoteItem;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\DB;

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

        Validator::extend('multi_unique', function ($attribute, $value, $parameters, $validator) {
            $request = Input::all();
            $record = DB::table('vote_results')
                ->where($attribute, '=', $value)
                ->where('vote_item_id', '=', $request['vote_item_id'])
                ->where('vote_id', '=', $request['vote_id'])
                ->get();
            return !count($record);
        });

        Validator::extend('voteitem_exist', function ($attribute, $value, $parameters, $validator) {
            $request = Input::all();
            $voteitem = VoteItem::findOrFail($value);
            return $voteitem->vote_id == $request['vote_id'];
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
