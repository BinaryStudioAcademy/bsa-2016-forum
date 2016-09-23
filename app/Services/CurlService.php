<?php
namespace App\Services;
use Symfony\Component\HttpKernel\Exception\ServiceUnavailableHttpException;
use HttpRequest;
use Request;

class CurlService
{
    public function sendRequest($method, $url, array $body = [], $cookie = null)
    {
        $response = null;
        $cookieName = config('authserver.cookieName');
        if ($cookie) {
            $cookie = 'Cookie: ' . $cookieName . '=' . $cookie;
        } else {
            $cookie = 'Cookie: ' . $cookieName . '=' . $_COOKIE[$cookieName];
        }

        $opts = array('http' =>
            array(
                'method' => $method,
                'header' => [$cookie]
            )
        );

        if(empty($body)) {
            $opts['http']['header'][] = 'Content-type: application/x-www-form-urlencoded';
        } else {
            $opts['http']['header'][] = 'Content-type: application/json';
            $opts['http']['content'] = json_encode($body);
        }

        $context = stream_context_create($opts);
        $stream = fopen($url, 'r', false, $context);
        $response = stream_get_contents($stream);
        fclose($stream);
        return $response;
    }

    public function sendUsersRequest($id = null, $cookie = null)
    {
        if (!$id) {
            $url = trim(config('authserver.urlUsersInfo'));
        } else {
            $url = trim(config('authserver.urlUserInfo')) . $id;
        }
        $response = $this->sendRequest('GET', $url, [], $cookie);
        if (!$response) {
            throw new ServiceUnavailableHttpException;
        }
        return json_decode($response);
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

        if (strtolower(env('APP_ENV')) == 'local') {
            return true;
        } else {
            return $this->sendRequest('POST', config('notification.url'), $request);
        }
    }

    public static function sendAvatarRequest($urlAvatar, $cookie = null)
    { $_this = new self();
        $url = trim(config('authserver.urlAuthBase')) . $urlAvatar;
        $response = $_this->sendRequest('GET', $url);
        if (!$response) {
            throw new ServiceUnavailableHttpException;
        }
        return $response;

    }
}