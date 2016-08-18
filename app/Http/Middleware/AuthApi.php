<?php

namespace App\Http\Middleware;

use Closure;
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
        $this->loginUser();

        $url = $request->fullUrl();
        
        if  (!($this->checkCookie())){
            return redirect('http://team.binary-studio.com/auth/')->withCookie("referer", $url);
        }

        return $next($request);


    }

}