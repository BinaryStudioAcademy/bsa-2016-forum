<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Response;
use Cookie;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Emarref\Jwt\Claim;


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
        if (env('APP_ENV') !== 'local') {
            $userData = $this->checkCookie();

            if  (!$userData){
                $url = $request->fullUrl();
                return redirect($this->urlAuth)->withCookie("referer", $url);
            }
            $user = $this->checkUser($userData);
            Auth::login($user);
        
        } else {
            $this->loginUser();
        }
        return $next($request);
    }

}