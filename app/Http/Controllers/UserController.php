<?php

namespace App\Http\Controllers;

use App\Facades\CurlService;
use App\Models\User;

use Illuminate\Support\Facades\Auth;
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
    public function index()
    {
        $users = User::all();
        return $this->setStatusCode(200)->respond($users);
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::findOrFail($id);

        return $this->setStatusCode(200)->respond($user);
    }

    /**
     * @param $userId
     * @param Request $requestst
     * @param $roleId
     * @return \Illuminate\Http\JsonResponse
     * @throws RoleDeniedException
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
    public function getUserRole($userId)
    {
        $user = User::findOrFail($userId);
        $role = $user->grantedRoles()->get();

        return $this->setStatusCode(200)->respond($role, ['user' => $user]);

    }

    /**
     * Return AuthUser Profile to the frontend
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUser()
    {
        $user = Auth::user();
        if(!$user){
            return $this->setStatusCode(401)->respond();
        }
        if (strtolower(env('APP_ENV')) == 'local') {
            return $this->setStatusCode(200)->respond($user);
        } else {
            $userProfile = CurlService::sendUserRequest($user->global_id);
            $userProfile['id'] = $user->id;
            return $this->setStatusCode(200)->respond($userProfile);
        }
    }
}
