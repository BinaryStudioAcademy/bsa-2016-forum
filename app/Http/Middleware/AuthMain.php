<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;


class AuthMain extends AuthService
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
            if  (!$userData){
                $url = $request->fullUrl();
                return redirect(url(config('authserver.urlAuth')))
                    ->cookie('referer', url(config('authserver.urlReferer')))
                    ->header('Referer',url(config('authserver.urlReferer')));
            }
            $user = $this->checkUser($userData);
            Auth::login($user);
        }
        return $next($request);
    }

}