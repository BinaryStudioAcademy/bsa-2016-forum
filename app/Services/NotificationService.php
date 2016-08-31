<?php
/**
 * Created by PhpStorm.
 * User: Stepan
 * Date: 01.09.2016
 * Time: 2:05
 */

namespace App\Services;


use Illuminate\Support\Facades\Cookie;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\ServiceUnavailableHttpException;

class NotificationService
{
    public function send(array $data)
    {
        $Info = [
            'title' => $data['title'],
            'text' => $data['text'],
            'url' => $data['url'],
            'sound' => config('notification.sound'),
            'serviceType' => config('notification.serviceType'),
            'users' => $data['users'],
        ];

        $options = [
            CURLOPT_COOKIE => 'x-access-token=' . Cookie::get('x-access-token'),
            CURLOPT_POSTFIELDS => json_encode($Info),
            CURLOPT_HEADER => true,
            CURLOPT_POST => true,
            CURLOPT_URL => config('notification.url'),
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_MAXREDIRS => 5,
            CURLOPT_USERAGENT => "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:47.0) Gecko/20100101 Firefox/47.0",
            CURLOPT_HTTPHEADER => [
                'Content-type: application/json',
                'Content-Length: ' . strlen(json_encode($Info))
            ],
        ];

        $curl = curl_init();
        curl_setopt_array($curl, $options);
        $result = curl_exec($curl);
        $err = curl_error($curl);
        dd(curl_getinfo($curl));
        curl_close($curl);

        if ($err) {
            throw new ServiceUnavailableHttpException;
        } else {
            $response = json_decode($result, true);
        }

        return $response;
    }
}