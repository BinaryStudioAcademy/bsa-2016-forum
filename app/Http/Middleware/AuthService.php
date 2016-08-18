<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Response;
use Cookie;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Emarref\Jwt\Claim;


class AuthService
{
    /**
     * Run the request filter.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    
    public function loginUser()
    {
        $users = User::all();
        Auth::login($users[1]);
    }
    
    public function handle($request, Closure $next)
    {
       //
        return $next($request);
    }

}
