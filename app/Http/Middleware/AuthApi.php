<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use App\Repositories\UserStore;


class AuthApi extends AuthService
{
    /**
     * Run the request filter.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (strtolower(env('APP_ENV')) == 'local') {
            $this->loginUser();
        } else {
            $userData = $this->checkCookie();
            if  (!$userData) {
                throw new AuthenticationException;
            }
            $user = $this->checkUser($userData);
            Auth::login($user);
        }
        return $next($request);
    }
}