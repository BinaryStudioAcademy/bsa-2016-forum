<?php

namespace App\Http\Controllers;

use App\Models\User;
use DCN\RBAC\Models\Permission;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

use App\Http\Requests;

class PermissionController extends ApiController
{
    public function updatePermission($userId, Request $request, $id)
    {
        $permission = Permission::findOrFail($id);
        if(!$permission){
            throw (new ModelNotFoundException)->setModel(Permission::class);
        }
        $permission->apdate($request->all());
        $user = User::findOrFail($userId);
        $user->attachPermission($permission);
        return $this->setStatusCode(200)->respond($permission);
    }
}
