<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Response;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Emarref\Jwt\Claim;
use Emarref\Jwt\Encryption\Factory;
use Symfony\Component\HttpKernel\Exception\ServiceUnavailableHttpException;


class AuthService
{
    protected $cookieName = 'x-access-token';

    protected $secretKey = 'superpupersecret';

    protected $urlUserInfo = 'http://team.binary-studio.com/profile/user/getByCentralId/';

    protected $curl_params = [
        CURLOPT_URL => null,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_MAXREDIRS => 5,
        CURLOPT_USERAGENT => "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:47.0) Gecko/20100101 Firefox/47.0",
        CURLOPT_CUSTOMREQUEST => "GET",
        CURLOPT_HTTPHEADER => [
            "cache-control: no-cache",
            "Accept: text/html,application/xhtml+xml,application/xml",
            "content-type: application/x-www-form-urlencoded",
        ],
    ];
    
    public function loginUser()
    {
        $users = User::all();
        Auth::login($users[1]);
    }

    /**
     * Check cookie x-access-token
     * @return false if check is fail or array of User Data - id, email, role
     */
    public function checkCookie()
    {
        if (array_key_exists ($this->cookieName, $_COOKIE)) {
            $tokenSerialized = $_COOKIE[$this->cookieName];
            // $tokenSerialized = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjU3N2ExNjY1OTgyOWZlMDUwYWRiM2Y1YyIsImVtYWlsIjoidGVzdGVyX2FAZXhhbXBsZS5jb20iLCJyb2xlIjoiREVWRUxPUEVSIiwiaWF0IjoxNDcxNDc1ODgxfQ.rdfhnVY-ZJWl3OoRgZ712h9bGPagiXHmoRdFcBIPfDo';
            $jwt = new \Emarref\Jwt\Jwt();
            $token = $jwt->deserialize($tokenSerialized);
            $algorithm = new \Emarref\Jwt\Algorithm\Hs256($this->secretKey);
            $encryption = \Emarref\Jwt\Encryption\Factory::create($algorithm);
            $context = new \Emarref\Jwt\Verification\Context($encryption);
            
            if ($jwt->verify($token, $context)){
                $userData = json_decode($token->getPayload()->getClaims()->jsonSerialize());
                return  $userData;
            };
        }
        return false;
    }

    /**
     * Send request to the auth service to get user info
     * @param $globalId
     * @return $userInfo array
     */
    public function getUserInfo($globalId)
    {
        $userInfo = null;

        $this->curl_params[CURLOPT_URL] = $this->urlUserInfo . $globalId;
        array_push($this->curl_params[CURLOPT_HTTPHEADER], 'Cookie: '.$this->cookieName.'='.$_COOKIE[$this->cookieName]);
        $curl = curl_init();
        curl_setopt_array($curl, $this->curl_params);
        $result = curl_exec($curl);
        $err = curl_error($curl);
        curl_close($curl);

        if ($err) {
            throw new ServiceUnavailableHttpException;
        } else {
            $userInfo = json_decode($result, true);
        }
        return $userInfo;
    }

    /**
     * Check if user exist in the local DB
     * $status_id =1 user online
     * @param $userData array id, email. role
     * @return $user User object
     */
    public function checkUser($userData)
    {
        if (!$user =  User::findUserByGlobalId($userData->id)) {

            $user = User::findUserByEmail($userData->email);

            $userInfo= $this->getUserInfo($userData->id);

            if (!$user ){
                var_dump('new');
                $user = new User();
                $user->first_name = $userInfo[0]['name'];
                $user->display_name = $userInfo[0]['name'];
                $user->last_name = $userInfo[0]['surname'];
                $user->email = $userInfo[0]['email'];
                $user->global_id = $userInfo[0]['serverUserId'];
                $user->status_id = 1;
                $user->save();
            } else {
                var_dump('update');
                $user->first_name = $userInfo[0]['name'];
                $user->last_name = $userInfo[0]['surname'];
                $user->global_id = $userInfo[0]['serverUserId'];
                $user->status_id = 1;
                $user->save();
            }
        };
        return $user;
    }

    /**
     * Run the request filter.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        return $next($request);
    }

}
