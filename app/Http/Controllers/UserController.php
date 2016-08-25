<?php

namespace App\Http\Controllers;

use App\Facades\CurlService;
use App\Models\Role;
use App\Models\User;

use Auth;
use Illuminate\Http\Request;

class UserController extends ApiController
{
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

        $this->authorize('show', $user);

        return $this->setStatusCode(200)->respond($user);
    }

    /**
     * @param $userId
     * @param $roleId
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateRole($userId, $roleId)
    {

        $user = User::findOrFail($userId);

        $this->authorize('updateRole', $user);

        $role = Role::findOrFail($roleId);
        $user->role()->associate($role);
        $user->save();

        return $this->setStatusCode(200)->respond(['user' => $user, 'role' => $role] );
    }

    /**
     * @param $userId
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUserRole($userId)
    {
        $user = User::findOrFail($userId);

        $this->authorize('getUserRole', $user);

        $role = $user->role()->first();

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
