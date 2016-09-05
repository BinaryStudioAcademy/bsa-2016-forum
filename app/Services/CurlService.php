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

    public function  sendRequest($method, $url, $body = null)
    {
        $response = null;
        $cookie = $_COOKIE[config('authserver.cookieName')];

        $this->curl_params[CURLOPT_URL] = $url;
        $this->curl_params[CURLOPT_CUSTOMREQUEST] = $method;
        $this->curl_params[CURLOPT_COOKIE] = 'x-access-token='. $cookie;

        if(isset($body) && $method == 'POST') {
            $this->curl_params[CURLOPT_HEADER] = true;
            $this->curl_params[CURLOPT_HTTPHEADER] = [
                'Content-Length: ' . strlen(json_encode($body)),
                'Content-type: application/json'
            ];
            $this->curl_params[CURLOPT_POSTFIELDS] = json_encode($body);
            $this->curl_params[CURLOPT_POST] = true;
        }

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
        $url = config('authserver.urlUserInfo').$id;

        $response = $this->sendRequest('GET', $url);
        
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

    public function sendNotificationRequest($data)
    {
        $request = [
            'title' => $data['title'],
            'text' => $data['text'],
            'url' => $data['url'],
            'sound' => config('notification.sound'),
            'serviceType' => config('notification.serviceType'),
            'users' => $data['users'],
        ];

        $response = $this->sendRequest('POST', config('notification.url'), $request);

        return $response;
    }
}