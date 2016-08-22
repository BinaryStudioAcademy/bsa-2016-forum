<?php

namespace App\Providers;

use App\Models\Topic;
use App\Models\Vote;
use App\Models\VoteItem;
use App\Policies\TopicPolicy;
use App\Policies\VoteItemPolicy;
use App\Policies\VotePolicy;
use Illuminate\Contracts\Auth\Access\Gate as GateContract;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        Topic::class => TopicPolicy::class,
        Vote::class => VotePolicy::class,
        VoteItem::class => VoteItemPolicy::class
    ];

    /**
     * Register any application authentication / authorization services.
     *
     * @param  \Illuminate\Contracts\Auth\Access\Gate  $gate
     * @return void
     */
    public function boot(GateContract $gate)
    {
        $this->registerPolicies($gate);
    }
}
