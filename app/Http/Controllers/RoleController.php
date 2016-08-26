<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Models\Role;

class RoleController extends ApiController
{
    public function index()
    {
        $roles = Role::all();

        return $this->setStatusCode(200)->respond($roles);
    }
}
