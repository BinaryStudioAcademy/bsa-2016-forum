<?php

namespace App\Providers;

use App\Models\Vote;
use App\Models\VoteItem;
use App\Models\VoteResult;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Input;

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
            return VoteResult::checkUniqueMultiFields(Input::all(), $attribute, $value);
        });

        Validator::extend('voteitem_exist', function ($attribute, $value, $parameters, $validator) {
            $request = Input::all();
            $voteitem = VoteItem::findOrFail($value);
            return $voteitem->vote_id == $request['vote_id'];
        });

        Validator::extend('tags_validator', function ($attribute, $value, $parameters, $validator) {
            if ($value) {
                $tags = json_decode($value, true);
                if (!is_array($tags)) {
                    return false;
                }
                foreach ($tags as $tag) {
                    if (empty($tag['id']) && empty($tag['name'])) {
                        return false;
                    }
                }
                return true;
            } else {
                return false;
            }
        });

    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(
            'Repositories\Contracts\UserStoreInterface',
            'Repositories\UserStore'
        );
    }
}
