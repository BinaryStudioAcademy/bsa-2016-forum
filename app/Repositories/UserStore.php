<?php
namespace App\Repositories;
use App\Repositories\Contracts\UserStoreInterface;
use App\Facades\CurlService;
use App\Models\User;
use App\Models\Role;
use App\Models\Status;

class UserStore implements UserStoreInterface
{
    /**
     * @param null $user
     * @return mixed
     * @throws ServiceUnavailableHttpException
     */
    public function all($user = null)
    {
        if ($user) {
            $usersInner[] = $user->toArray();
        } else {
            $usersInner = User::all()->toArray();
        }
        if (strtolower(env('APP_ENV')) <> 'local') {
            if ($user){
                $response = CurlService::sendUsersRequest($user->global_id);
            } else {
                $response = CurlService::sendUsersRequest();
            }

            if (key_exists('success', $response) && $response['success'] == false){
                throw new ServiceUnavailableHttpException;
            }
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
                    $role = Role::where('id', $r['role_id'])->value('name');
                    $status = Status::where('id', $r['status_id'])->value('name');
                    $r['role'] = $role;
                    $r['status'] = $status;
                    return $r;
                },
                $response
            );
        } else {
            $users = array_map(
                function($item) {
                    $item['city'] = '';
                    $item['country'] = '';
                    $item['birthday'] = '';
                    $item['local_id'] = '';
                    $item['avatar']['urlAva'] = '';
                    $item['avatar']['thumbnailUrlAva'] = '';
                    $role = Role::where('id', $item['role_id'])->value('name');
                    $status = Status::where('id', $item['status_id'])->value('name');
                    $item['role'] = $role;
                    $item['status'] = $status;
                    return $item;
                },
                $usersInner);
        }
        return $users;
    }
    
    public function get($user)
    {
        $user = $this->all($user);
        return array_shift($user);
    }
}