<?php

namespace App\Services;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\ServiceUnavailableHttpException;


class CurlService
{
    protected $curl_params;
    
    public function __construct()
    {
        $this->curl_params = [
            CURLOPT_URL => null,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_MAXREDIRS => 5,
            CURLOPT_USERAGENT => "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:47.0) Gecko/20100101 Firefox/47.0",
            CURLOPT_HTTPHEADER => [
                "Cache-control: no-cache",
                "Accept: text/html,application/xhtml+xml,application/xml",
                "Content-type: application/x-www-form-urlencoded",
            ],
        ];
    }

    public function  sendRequest($method, $url, $cookie)
    {
        $response = null;
        
        $this->curl_params[CURLOPT_URL] = $url;
        $this->curl_params[CURLOPT_CUSTOMREQUEST] = $method;
        array_push($this->curl_params[CURLOPT_HTTPHEADER], $cookie);
        $curl = curl_init();
        curl_setopt_array($curl, $this->curl_params);
        $result = curl_exec($curl);
        $err = curl_error($curl);
        curl_close($curl);

        if ($err) {
            throw new ServiceUnavailableHttpException;
        } else {
            $response = json_decode($result, true);
        }
        return $response;
    }

    public function sendUserRequest($id)
    {
        $cookieName = config('authserver.cookieName');
        $url = config('authserver.urlUserInfo').$id;
        $cookie = 'Cookie: '.$cookieName.'='.$_COOKIE[$cookieName];

        $response = $this->sendRequest('GET', $url, $cookie);
        
        if (!$response){
            throw new NotFoundHttpException;
        }

        $response = array_shift($response);

        $userProfile = [
            'first_name' => $response['name'],
            'last_name' => $response['surname'],
            'email' => $response['email'],
            'city' => $response['city'],
            'country' => $response['country'],
            'birthday' => $response['birthday'],
            'global_id' => $response['serverUserId']
        ];
        return $userProfile;
    }
}