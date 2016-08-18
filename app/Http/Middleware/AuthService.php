<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Response;
use Cookie;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Emarref\Jwt\Claim;
use Emarref\Jwt\Encryption\Factory;


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

    public function checkCookie()
    {
       if (array_key_exists ('x-access-token', $_COOKIE)) {
           $tokenSerialized = $_COOKIE['x-access-token'];
           // $tokenSerialized = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjU3N2ExNjY1OTgyOWZlMDUwYWRiM2Y1YyIsImVtYWlsIjoidGVzdGVyX2FAZXhhbXBsZS5jb20iLCJyb2xlIjoiREVWRUxPUEVSIiwiaWF0IjoxNDcxNDc1ODgxfQ.rdfhnVY-ZJWl3OoRgZ712h9bGPagiXHmoRdFcBIPfDo';
            $jwt = new \Emarref\Jwt\Jwt();
            $token = $jwt->deserialize($tokenSerialized);
            $algorithm = new \Emarref\Jwt\Algorithm\Hs256('superpupersecret');
            $encryption = \Emarref\Jwt\Encryption\Factory::create($algorithm);
            $context = new \Emarref\Jwt\Verification\Context($encryption);

           if ($jwt->verify($token, $context)){
               $userData =  json_decode($token->getPayload()->getClaims()->jsonSerialize());
               $user = new User();
               var_dump($userData);
               var_dump($user->isExist($userData));
           };

        }

        return true;
        
    }
    public function handle($request, Closure $next)
    {
       //
        return $next($request);
    }

}
