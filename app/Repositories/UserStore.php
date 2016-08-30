<?php

namespace App\Repositories;

use App\Repositories\Contracts\UserStoreInterface;
use App\Facades\CurlService;
use App\Models\User;
use DB;

class UserStore implements UserStoreInterface
{

    public function get($user)
    {
        if (strtolower(env('APP_ENV')) <> 'local') {
            $response = CurlService::sendUsersRequest($user->global_id);
            $users = array_map(
                function ($userFunc) {
                    $r['first_name'] = $userFunc->name;
                    $r['last_name'] = $userFunc->surname;
                    $r['email'] = $userFunc->email;
                    $r['city'] = $userFunc->city;
                    $r['country'] = $userFunc->country;
                    $r['birthday'] = $userFunc->birthday;
                    $r['local_id'] = $userFunc->id;
                    $r['avatar'] = $userFunc->avatar;
                    return $r;
                },
                $response
            );
            $userProfile = array_shift($users);

        } else {

            $userProfile['first_name'] = $user->first_name;
            $userProfile['last_name'] = $user->last_name;
            $userProfile['email'] = $user->email;
            $userProfile['city'] = '';
            $userProfile['country'] = '';
            $userProfile['birthday'] = '';
            $userProfile['local_id'] = '';
            $userProfile['avatar']['urlAva'] = '';
            $userProfile['avatar']['thumbnailUrlAva'] = '';

        }
        $userProfile['id'] = $user->id;
        $userProfile['global_id'] = $user->global_id;
        $userProfile['display_name'] = $user->display_name;
        $userProfile['reputation'] = $user->reputation;
        $userProfile['status_id'] = $user->status_id;
        $userProfile['last_visit_at'] = $user->last_visit_at;
        $userProfile['role_id'] = $user->role_id;

        $role = \DB::table('roles')->where('id', $user->role_id)->value('name');
        $status = \DB::table('user_statuses')->where('id', $user->status_id)->value('name');
        $userProfile['role'] = $role;
        $userProfile['status'] = $status;

        return $userProfile;
    }

    public function all()
    {
        $usersInner = User::all()->toArray();

        if (strtolower(env('APP_ENV')) <> 'local') {
            $response = CurlService::sendUsersRequest();
            
            $users = array_map(
                function ($userFunc) use ($usersInner) {
                    $r['first_name'] = $userFunc->name;
                    $r['last_name'] = $userFunc->surname;
                    $r['email'] = $userFunc->email;
                    $r['city'] = $userFunc->city;
                    $r['country'] = $userFunc->country;
                    $r['birthday'] = $userFunc->birthday;
                    $r['local_id'] = $userFunc->id;
                    $r['global_id'] = $userFunc->serverUserId;
                    $r['avatar'] = $userFunc->avatar;

                    $userInner = array_filter($usersInner,
                        function ($item) use ($r) {
                            if ($item['global_id'] == $r['global_id']) {
                                return $item;
                            }
                        });

                    $userInner = array_shift($userInner);

                    $r['id'] = $userInner['id'];
                    $r['display_name'] = $userInner['display_name'];
                    $r['reputation'] = $userInner['reputation'];
                    $r['status_id'] = $userInner['status_id'];
                    $r['last_visit_at'] = $userInner['last_visit_at'];
                    $r['role_id'] = $userInner['role_id'];

                    $role = \DB::table('roles')->where('id', $r['role_id'])->value('name');
                    $status = \DB::table('user_statuses')->where('id', $r['status_id'])->value('name');
                    $r['role'] = $role;
                    $r['status'] = $status;

                    return $r;
                },
                $response
            );
        } else {
            $users = array_map(
                function ($item) {
                    $item['city'] = '';
                    $item['country'] = '';
                    $item['birthday'] = '';
                    $item['local_id'] = '';
                    $item['avatar']['urlAva'] = '';
                    $item['avatar']['thumbnailUrlAva'] = '';
                    $role = \DB::table('roles')->where('id', $item['role_id'])->value('name');
                    $status = \DB::table('user_statuses')->where('id', $item['status_id'])->value('name');
                    $item['role'] = $role;
                    $item['status'] = $status;

                    return $item;
                },
                $usersInner);
        }
        return $users;
    }
}