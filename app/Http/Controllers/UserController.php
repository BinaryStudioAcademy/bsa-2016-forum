<?php
namespace App\Http\Controllers;
use App\Models\Role;
use App\Models\User;
use App\Repositories\UserStore;
use Auth;
use Illuminate\Http\Request;
class UserController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(UserStore $userStore, Request $request)
    {
        $this->setFiltersParameters($request);
        $users = $userStore->all();

        if ($this->status) {
            $users = $this->getUsersByStatus($users, $this->status);
        }

        return $this->setStatusCode(200)->respond($users);
    }

    public function getUsersByStatus($users, $status) {
        $filteredUsers = [];

        foreach ($users as $user) {
            if ($user['status'] == $status) {
                array_push($filteredUsers, $user);
            }
        }

        return $filteredUsers;
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show(UserStore $userStore, $id)
    {
        $user = User::findOrFail($id);
        $this->authorize('show', $user);
        $userProfile = $userStore->get($user);
        return $this->setStatusCode(200)->respond($userProfile);
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
    public function getUser(UserStore $userStore)
    {
        $user = Auth::user();
        if(!$user){
            return $this->setStatusCode(401)->respond();
        }
        $userProfile = $userStore->get($user);
        return $this->setStatusCode(200)->respond($userProfile);
    }

    protected function setFiltersParameters(Request $request)
    {
        $this->status = $request->get('status');
        $this->limit = $request->get('limit');
        $this->order = $request->get('order');
        $this->orderType = $request->get('orderType');
    }
}