<?php

namespace App\Http\Controllers;

use App\Models\User;

use Auth;
use DCN\RBAC\Exceptions\RoleDeniedException;
use DCN\RBAC\Models\Role;
use Illuminate\Http\Request;

use DCN\RBAC\Traits\HasRoleAndPermission;
use DCN\RBAC\Contracts\HasRoleAndPermission as HasRoleAndPermissionContract;

class UserController extends ApiController implements HasRoleAndPermissionContract
{
    use HasRoleAndPermission;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    /**
     * @api {get} /users Index users
     * @apiName Index Users
     * @apiGroup Users
     *
     * @apiDescription Returns the list of the users.
     *
     * @apiParam No
     *
     * @apiSuccess {Json} List List of the Users like [{key:value,}, {key:value,}]
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     * {
        "data": [
            {
            "id": 1,
            "first_name": "Dayna",
            "last_name": "Glover",
            "display_name": "jesse.crist",
            "email": "lcollier@example.org",
            "reputation": 959,
            "status_id": 2,
            "last_visit_at": "2016-01-03 22:07:14",
            "created_at": "2016-08-17 07:54:19",
            "updated_at": "2016-08-17 07:54:19"
            },
            {
            "id": 2,
            "first_name": "Pierce",
            "last_name": "Morissette",
            "display_name": "kreinger",
            "email": "dayne.hessel@example.com",
            "reputation": 472,
            "status_id": 2,
            "last_visit_at": "2016-05-17 10:26:08",
            "created_at": "2016-08-17 07:54:19",
            "updated_at": "2016-08-17 07:54:19"
            },
            {
            "id": 3,
            "first_name": "Esta",
            "last_name": "Robel",
            "display_name": "devon79",
            "email": "pquigley@example.com",
            "reputation": 922,
            "status_id": 2,
            "last_visit_at": "2015-10-24 03:47:00",
            "created_at": "2016-08-17 07:54:19",
            "updated_at": "2016-08-17 07:54:19"
        ]
     * }
     *
     *
     */

    /**
     * Lists all Users models.
     * @return mixed
     */
    public function index()
    {
        $users = User::all();
        return $this->setStatusCode(200)->respond($users);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    /**
     * @api {post} /users Create user
     * @apiName Create User
     * @apiGroup Users
     *
     * @apiDescription Returns the user.
     *
     * @apiParam No
     *
     * @apiSuccess {Json} User User like {key:value,}
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 201 Created
     * {
        "data": [
            {
            "id": 1,
            "first_name": "Dayna",
            "last_name": "Glover",
            "display_name": "jesse.crist",
            "email": "lcollier@example.org",
            "reputation": 959,
            "status_id": 2,
            "last_visit_at": "2016-01-03 22:07:14",
            "created_at": "2016-08-17 07:54:19",
            "updated_at": "2016-08-17 07:54:19"
            }
        ]
     * }
     *
     *
     */
    public function store(Request $request)
    {

        $user = User::create($request->all());

        return $this->setStatusCode(201)->respond($user);
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */

    /**
     * @api {get} /users/:id Show user
     * @apiName Show User
     * @apiGroup Users
     *
     * @apiDescription Returns the user.
     *
     * @apiParam {Number} ID User ID
     *
     * @apiSuccess {Json} User User like {key:value,}
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 Ok
     * {
        "data": [
            {
            "id": 1,
            "first_name": "Dayna",
            "last_name": "Glover",
            "display_name": "jesse.crist",
            "email": "lcollier@example.org",
            "reputation": 959,
            "status_id": 2,
            "last_visit_at": "2016-01-03 22:07:14",
            "created_at": "2016-08-17 07:54:19",
            "updated_at": "2016-08-17 07:54:19"
            }
            ]
     * }
     *
     *
     */
    public function show($id)
    {
        $user = User::findOrFail($id);

        return $this->setStatusCode(200)->respond($user);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    /**
     * @api {put} /users/:id  Update specific user
     * @apiName Update User
     * @apiGroup Users
     *
     * @apiDescription Updates the unique user.
     *
     * @apiParam {Number} ID User ID
     *
     *
     * @apiSuccess {Json} User the User like {key:value,}
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     * {
        "data": [
            {
            "id": 1,
            "first_name": "Dayna",
            "last_name": "Glover",
            "display_name": "jesse.crist",
            "email": "lcollier@example.org",
            "reputation": 959,
            "status_id": 2,
            "last_visit_at": "2016-01-03 22:07:14",
            "created_at": "2016-08-17 07:54:19",
            "updated_at": "2016-08-17 07:54:19"
            }
            ]
     * }
     *
     * @apiError ModelNotFoundException <code>404</code> User not found
     * @apiErrorExample Error-Response:
     *     User not found
     *
     */
    public function update(Request $request, $id)
    {

        $user = User::findOrFail($id);

        $user->update($request->all());

        return $this->setStatusCode(200)->respond($user);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    /**
     * @api {delete} /users/:id  Delete specific user
     * @apiName Delete User
     * @apiGroup Users
     *
     * @apiDescription Delete the user.
     *
     * @apiParam {Number} ID User ID
     *
     *
     * @apiSuccess (Success 204 No content) Empty
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 204 No content

     * @apiError ModelNotFoundException <code>404</code> User not found
     * @apiErrorExample Error-Response:
     *     User not found
     *
     *
     * @apiError PDOException <code>500</code> Internal Server Error
     * @apiErrorExample Error-Response:
     *     Internal Server Error
     */
    public function destroy($id)
    {

        $user = User::findOrFail($id);

        $user->delete();
        if ($user->trashed()) {
            return $this->setStatusCode(204)->respond();
        } else {
            throw new \PDOException();
        }
    }

    /**
     * @param $userId
     * @param Request $requestst
     * @param $roleId
     * @return \Illuminate\Http\JsonResponse
     * @throws RoleDeniedException
     */

    /**
     * @api {put} /users/:id/roles/:id  Update role for specific user
     * @apiName Update Users Role
     * @apiGroup Users
     *
     * @apiDescription Updates the role for user.
     *
     * @apiParam {Number} ID User ID
     * @apiParam {Number} ID Role ID
     *
     *
     * @apiSuccess {Json} User and Role like {key:value,}
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     * {
        "data": [
            {
            "id": 1,
            "first_name": "Dayna",
            "last_name": "Glover",
            "display_name": "jesse.crist",
            "email": "lcollier@example.org",
            "reputation": 959,
            "status_id": 2,
            "last_visit_at": "2016-01-03 22:07:14",
            "created_at": "2016-08-17 07:54:19",
            "updated_at": "2016-08-17 07:54:19"
            }
            {
     *      "role":{
                "name": "User",
                "slug": "user",
                "created_at": "2016-08-17 07:54:21",
                "updated_at": "2016-08-17 07:54:21",
                }
     *      }
     *      ]
     * }
     *
     * @apiError ModelNotFoundException <code>404</code> User not found
     * @apiErrorExample Error-Response:
     *     User not found
     *
     * @apiError ModelNotFoundException <code>404</code> Role not found
     * @apiErrorExample Error-Response:
     *     Role not found
     *
     */
    public function updateRole($userId, Request $requestst, $roleId)
    {
//        Auth::login(User::find(1));   //uncomment for test when there is no user Admin login in

        if(!Auth::user()->is('admin')){
            throw (new RoleDeniedException('Admin'));
        }
        $user = User::findOrFail($userId);
        $role = Role::findOrFail($roleId);
        $user->detachAllRoles();
        $user->attachRole($role);
        return $this->setStatusCode(200)->respond(['user' => $user, 'role' => $role] );
    }

    /**
     * @param $userId
     * @return \Illuminate\Http\JsonResponse
     */

    /**
     * @api {put} /users/:id/roles Show role for specific user
     * @apiName Show Users Role
     * @apiGroup Users
     *
     * @apiDescription Show role for user.
     *
     * @apiParam {Number} ID User ID

     *
     *
     * @apiSuccess {Json} User and Role like {key:value,}
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
    {
        "data": [
            {
            "id": 2,
            "name": "User",
            "slug": "user",
            "description": null,
            "parent_id": null,
            "created_at": null,
            "updated_at": null,
            "pivot": {
            "user_id": 2,
            "role_id": 2,
            "created_at": "2016-08-17 07:54:20",
            "updated_at": "2016-08-17 07:54:20",
            "granted": 1
            }
        }
        ],
        "_meta": {
            "user": {
                "id": 2,
                "first_name": "Pierce",
                "last_name": "Morissette",
                "display_name": "kreinger",
                "email": "dayne.hessel@example.com",
                "reputation": 472,
                "status_id": 2,
                "last_visit_at": "2016-05-17 10:26:08",
                "created_at": "2016-08-17 07:54:19",
                "updated_at": "2016-08-17 07:54:19"
            }
        }
    }
     *
     * @apiError ModelNotFoundException <code>404</code> User not found
     * @apiErrorExample Error-Response:
     *     User not found
     *
     *
     */
    public function getUserRole($userId)
    {
        $user = User::findOrFail($userId);
        $role = $user->grantedRoles()->get();

        return $this->setStatusCode(200)->respond($role, ['user' => $user]);

    }
    /**
     * @api {get} /user Show logged in user
     * @apiName Show logged in user
     * @apiGroup Users
     *
     * @apiDescription Returns the user.

     *
     * @apiSuccess {Json} User User like {key:value,}
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 Ok
     * {
        "data": [
            {
            "id": 1,
            "first_name": "Dayna",
            "last_name": "Glover",
            "display_name": "jesse.crist",
            "email": "lcollier@example.org",
            "reputation": 959,
            "status_id": 2,
            "last_visit_at": "2016-01-03 22:07:14",
            "created_at": "2016-08-17 07:54:19",
            "updated_at": "2016-08-17 07:54:19"
            }
            ]
     * }
     *
     *
     */
    public function getUser()
    {
        $user = Auth::user();
        if(!$user){
            return $this->setStatusCode(401)->respond();
        }
        return $this->setStatusCode(200)->respond($user);
    }
}
