<?php
namespace App\Repositories;
use Illuminate\Http\Request;
use App\Repositories\Contracts\UserStoreInterface;
use App\Facades\CurlService;
use App\Models\User;
use App\Models\Role;
use App\Models\Status;
use Symfony\Component\HttpKernel\Exception\ServiceUnavailableHttpException;

class UserStore implements UserStoreInterface
{
    protected $status = null;
    protected $limit = null;
    protected $searchStr = null;
    protected $order = null;
    protected $orderType = null;

    /**
     * @param null $user
     * @param Request $request
     * @return mixed
     * @throws ServiceUnavailableHttpException
     */
    public function all($user = null, Request $request = null)
    {
        if ($request) {
            $this->setFiltersParameters($request);
        }

        if ($user) {
            $usersInner[] = $user->toArray();
        } else {
            $usersInner = User::filterByQuery($this->searchStr)
                ->filterByStatus($this->status)
                ->take($this->limit)
                ->get()
                ->toArray();
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
                    $tr['global_id'] = $userFunc->serverUserId;
                    $userInner = array_filter($usersInner,
                        function ($item) use ($tr) {
                            if ($item['global_id'] == $tr['global_id']) {
                                return $item;
                            }
                        });
                    if ($userInner) {
                        $r['first_name'] = $userFunc->name;
                        $r['last_name'] = $userFunc->surname;
                        $r['email'] = $userFunc->email;
                        $r['city'] = $userFunc->city;
                        $r['country'] = $userFunc->country;
                        $r['birthday'] = $userFunc->birthday;
                        $r['local_id'] = $userFunc->id;
                        $r['global_id'] = $userFunc->serverUserId;
                        $userInner = array_shift($userInner);
                        $r['url_avatar'] =$userInner['url_avatar'];
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
                    }
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
                    $role = Role::where('id', $item['role_id'])->value('name');
                    $status = Status::where('id', $item['status_id'])->value('name');
                    $item['role'] = $role;
                    $item['status'] = $status;
                    return $item;
                },
                $usersInner);
        }

        $usersNew = [];
        foreach ($users as $user){
            if ($user != null){
                $usersNew[] = $user;
            }
        }
        return $usersNew;
    }

    public function get($user)
    {
        $user = $this->all($user);
        return array_shift($user);
    }

    protected function setFiltersParameters(Request $request)
    {
        $this->status = $request->get('status');
        $this->limit = $request->get('limit');
        $this->searchStr = $request->get('query');
        $this->order = $request->get('order');
        $this->orderType = $request->get('orderType');
    }

    public static function getUserWithAvatar($user)
    {
        if ($user instanceof User){
            $urlAvatar = config('authserver.urlBaseAvatar') . $user->url_avatar;
            $user->url_avatar = $urlAvatar;
        } else {
            $urlAvatar = config('authserver.urlBaseAvatar') . $user['url_avatar'];
            $user['url_avatar'] = $urlAvatar;
        }
        return $user;
    }
}