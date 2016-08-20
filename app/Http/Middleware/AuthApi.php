<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\Response;
use Cookie;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Emarref\Jwt\Claim;


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
        if (env('APP_ENV') !== 'local') {
            $userData = $this->checkCookie();

            if  (!$userData) {
                throw new AuthenticationException;
            }
            $user = $this->checkUser($userData);
            Auth::login($user);
            
        } else {
            $this->loginUser();
        }
        return $next($request);
    }
}