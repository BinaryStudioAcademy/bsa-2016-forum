<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\ValidationException;
use Illuminate\Container\Container;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class ApiRequest extends Request
{
    public function response(array $errors)
    {
        throw new ValidationException($this->getValidatorInstance());
    }
}