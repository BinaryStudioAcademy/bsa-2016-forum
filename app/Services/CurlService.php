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
            CURLOPT_FOLLOWLOCATION => 1,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_UNRESTRICTED_AUTH => 1,
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

    public function sendRequest($method, $url, $cookie)
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
    
    public function sendUsersRequest($id = null)
    {
        $cookieName = config('authserver.cookieName');
        $cookie = 'Cookie: ' . $cookieName . '=' . $_COOKIE[$cookieName];

        if (!$id) {
            $url = trim(config('authserver.urlUsersInfo'));
        } else {
            $url = trim(config('authserver.urlUserInfo')) . $id;
        }

        $response = $this->sendRequest('GET', $url, $cookie);

        if (!$response) {
            throw new NotFoundHttpException;
        }
        return $response;
    }

}