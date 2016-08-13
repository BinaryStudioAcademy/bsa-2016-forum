<?php

namespace App\Http\Controllers;

class ApiController extends Controller
{
    /**
     * @var
     
    protected $statusCode;

    /**
     * @return mixed
     */
    public function getStatusCode()
    {
        return $this->statusCode;
    }

    /**
     * @param mixed $statusCode
     * @return $this
     */
    public function setStatusCode($statusCode)
    {
        $this->statusCode = $statusCode;
        return $this;
    }

    /**
     * @param array $data
     * @param array $meta
     * @param array $headers
     * @return \Illuminate\Http\JsonResponse
     */
    public function respond($data = [], $meta = [], $headers = [])
    {
        return response()->json(
            [
                'data' => $data,
                '_meta' => $meta
            ],
            $this->getStatusCode(),
            $headers
        );
    }

}
