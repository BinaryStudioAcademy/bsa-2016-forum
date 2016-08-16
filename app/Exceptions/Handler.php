<?php

namespace App\Exceptions;

use Exception;
use Log;
use Illuminate\Validation\ValidationException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use \DCN\RBAC\Exceptions\PermissionDeniedException;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that should not be reported.
     *
     * @var array
     */
    protected $dontReport = [
        AuthorizationException::class,
        HttpException::class,
        ModelNotFoundException::class,
        ValidationException::class,
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Exception  $e
     * @return void
     */
    public function report(Exception $e)
    {
        if ($e instanceof \PDOException) {
            Log::error('Database error');
        }
        parent::report($e);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $e
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $e)
    {
        if ($e instanceof ValidationException) {
            $validationErrors = $e->validator->errors();
            return response($validationErrors, 400);
        }

        if ($e instanceof \PDOException) {
            return response('Internal Server Error', 500);
        }

        if ($e instanceof ModelNotFoundException) {
            $modelPathAsArray = explode('\\', $e->getModel());
            $model = $modelPathAsArray[count($modelPathAsArray) - 1];
            return response($model . ' not found', 404);
        }

        if ($e instanceof NotFoundHttpException){
            return response('Resource not found', 404);
        }

        if ($e instanceof PermissionDeniedException){
            return response($e->getMessage(), 403);
        }
        
        return parent::render($request, $e);
    }
}
