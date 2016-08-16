<?php

namespace App\Http\Controllers;

use DCN\RBAC\Models\Role;
use Illuminate\Http\Request;

use App\Http\Requests;

class RoleController extends ApiController
{
    public function index()
    {
        $role = Role::all();
        return $this->setStatusCode(200)->respond($role);
    }
}
