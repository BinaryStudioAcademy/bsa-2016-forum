<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;


class AuthMain extends AuthService
{
    protected $urlAuth = 'http://team.binary-studio.com/auth/';
    /**
     * Run the request filter.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */

    public function handle($request, Closure $next)
    {
        if (env('APP_ENV') == 'local') {
            $this->loginUser();
        } else {
            $userData = $this->checkCookie();
            if  (!$userData){
                $url = $request->fullUrl();
                return redirect($this->urlAuth)->withCookie("referer", $url);
            }
            $user = $this->checkUser($userData);
            Auth::login($user);
        }
        return $next($request);
    }

}