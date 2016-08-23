<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Response;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Emarref\Jwt\Claim;
use Symfony\Component\HttpKernel\Exception\ServiceUnavailableHttpException;


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
        $this->urlUserInfo = config('authserver.urlUserInfo');
        $this->urlAuth = config('authserver.urlAuth');
        $this->curl_params = [
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
        return array_shift($userInfo);
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
            $userInfo= ($this->getUserInfo($userData->id));
            if (!$user ){
                $user = new User();
                $user->first_name = $userInfo['name'];
                $user->display_name = $userInfo['name'].(string)random_int(1,1000);
                $user->last_name = $userInfo['surname'];
                $user->email = $userInfo['email'];
                $user->global_id = $userInfo['serverUserId'];
                $user->status_id = 1;
                $user->save();
            } else {
                
                if ($user->deleted_at != null) {
                    $user->restore();
                }
                $user->first_name = $userInfo['name'];
                $user->last_name = $userInfo['surname'];
                $user->global_id = $userInfo['serverUserId'];
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
