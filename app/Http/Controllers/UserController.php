<?php

namespace App\Http\Controllers;

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
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
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
     * @param $roleId
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateRole($userId, $roleId)
    {
//        Auth::login(User::find(1));   //uncomment for test when there is no user Admin login in

        //TODO use permissions policies

        $user = User::findOrFail($userId);
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
        $role = $user->grantedRoles()->get();

        return $this->setStatusCode(200)->respond($role, ['user' => $user]);

    }

    public function getUser()
    {
        $user = Auth::authenticate();;

        return $this->setStatusCode(200)->respond($user);
    }
}
