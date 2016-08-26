<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Response;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Emarref\Jwt\Claim;
use App\Facades\CurlService;


class AuthService
{
    protected $cookieName;
    protected $secretKey;
    protected $urlUserInfo;
    protected $curl_params;

    public function __construct()
    {
        $this->cookieName = config('authserver.cookieName');
        $this->secretKey = config('authserver.secretKey');
        $this->urlAuth = config('authserver.urlAuth');
    }

    /**
     * Login User if APP_ENV = local for developing
     */
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
        $userData = null;
        if (array_key_exists ($this->cookieName, $_COOKIE)) {

            $tokenSerialized = $_COOKIE[$this->cookieName];
            $jwt = new \Emarref\Jwt\Jwt();
        
        try {
            $token = $jwt->deserialize($tokenSerialized);
        } 
        catch (\Exception $e){
            return false;
        }
            $algorithm = new \Emarref\Jwt\Algorithm\Hs256($this->secretKey);
            $encryption = \Emarref\Jwt\Encryption\Factory::create($algorithm);
            $context = new \Emarref\Jwt\Verification\Context($encryption);

            try {
                $jwt->verify($token, $context);
                $userData = json_decode($token->getPayload()->getClaims()->jsonSerialize());
            }
            catch (\Exception $e){
                return false;
            };
        }
        return  $userData;
    }

    /**
     * Send request to the auth service to get user info
     * @param $globalId
     * @return $userInfo array
     */
    public function getUserInfo($globalId)
    {
        $userInfo = CurlService::sendUserRequest($globalId);
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

            $userInfo = ($this->getUserInfo($userData->id));
            
            if (!$user ){
                $user = new User();
                $user->first_name = $userInfo['first_name'];
                $user->display_name = $userInfo['first_name'].(string)random_int(1,1000);
                $user->last_name = $userInfo['last_name'];
                $user->email = $userInfo['email'];
                $user->global_id = $userInfo['global_id'];
                $user->status_id = 1;
                $user->save();
            } else {
                
                if ($user->deleted_at != null) {
                    $user->restore();
                }
                $user->first_name = $userInfo['first_name'];
                $user->last_name = $userInfo['last_name'];
                $user->global_id = $userInfo['global_id'];
                $user->status_id = 1;
                $user->save();
            }

            $roleUser = \DB::table('roles')->where('name', 'User')->value('id');
            $user->attachRole($roleUser);
        };
        if ($user->deleted_at != null) {
            $user->restore();
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
