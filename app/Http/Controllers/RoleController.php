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

    /**
    * @api {get} roles/  List roles
    * @apiName Index roles
    * @apiGroup Roles
    *
    * @apiDescription Returns the list of the users' roles
    *
    * @apiParam No
    *
    * @apiSuccess {Json} List List of the Roles
    *
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 200 OK
    *{
    *"data": [
    *{
    *"id": 11,
    *"name": "Admin",
    *"slug": "admin",
    *"description": null,
    *"parent_id": null,
    *"created_at": null,
    *"updated_at": null
    *},
    *{
    *"id": 12,
    *"name": "User",
    *"slug": "user",
    *"description": null,
    *"parent_id": null,
    *"created_at": null,
    *"updated_at": null
    *}
    *],
    *"_meta": []
    *}
    * @apiError 404   Topic not found
    *
    * @apiErrorExample Error-Response:
    *     HTTP/1.1 404 Not Found
    *     {
    *      Topic not found
    *     }
    */