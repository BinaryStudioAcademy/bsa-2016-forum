<?php

use Illuminate\Database\Seeder;
use App\Models\Status;
use App\Models\Role;
use App\Facades\CurlService;
use App\Facades\AvatarService;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $globalIds = [
            '56780606215c82267c1a3cc0',
            '567920fc215c82267c1a3cc3',
            '567a4f0f215c82267c1a3cc7',
            '567a5638b296f43825501236',
            '56782adb215c82267c1a3cc2',
            '567a6d5de07428ab2cc0b666',
            '567a6ebde07428ab2cc0b667',
            '567aa528af36a06513d96db2',
            '567aafcb4a25306f4ebeb0c9',
            '567ab1b24a25306f4ebeb0cd',
        ];
        $urlAvatars = [
            '/profile/api/files/get/a6a7ea6a-4781-4591-8fc4-27429f8727ed',
            '/profile/api/files/get/ac0fe7ff-fa30-420d-8c53-4b871c687bf6.jpg',
            '/profile/api/files/get/500eb588-814c-410f-8240-2a4caf0d4a9e.jpg',
            '/profile/api/files/get/8ab41d15-67d1-4eea-8513-93268ccc7173.png',
            '/profile/api/files/get/3ef47c77-1b5a-43ba-9e9a-cde4e8d19c46.jpg',
            '/profile/api/files/get/0d22855f-61dc-4335-9d21-e17d08be9740.png',
            '/profile/api/files/get/70e69cec-907e-4786-8328-5b0fa4d8bd60.jpg',
            '/profile/api/files/get/1e587bd2-cfc8-4d21-9e3e-1fe49dee5896.jpg',
            '/profile/api/files/get/a4031299-4c54-4cac-b0d8-17a91ab22e1b',
            '/profile/api/files/get/248d7890-f1d5-4425-964e-4a14b0b53495.png'
        ];

        $count_users = 10;
        $statuses = Status::all();

        $cookie = env('AUTH_COOKIE', null);
        if ($cookie) {
            $response = CurlService::sendUsersRequest(null, $cookie);
            $roleUser = Role::where('name', 'User')->first();
            foreach ($response as $companyUser) {
                $user = factory(App\Models\User::class)->make();
                $user->first_name = $companyUser->name;
                $user->last_name = $companyUser->surname;
                $user->display_name = $companyUser->name .  ' ' . $companyUser->surname;
                $user->email = $companyUser->email;
                $user->global_id = $companyUser->serverUserId;
                $randomStatus = $statuses->random();
                $user->status()->associate($randomStatus);
                $user->role()->associate($roleUser);
                $user->url_avatar = $companyUser->avatar->urlAva;
                $user->save();
            }

            $user = \App\Models\User::first();
            $roleAdmin = Role::where('name', 'Admin')->first();
            $user->role()->associate($roleAdmin);
            $user->save();

        } else {
            factory(App\Models\User::class, $count_users)
                ->make()
                ->each(function ($user) use ($statuses) {
                    $randomStatus = $statuses->random();
                    $user->status()->associate($randomStatus);
                    $user->save();
                });

            $users = App\Models\User::all();
            reset($globalIds);
            reset($urlAvatars);
            $roleUser = Role::where('name', 'User')->first();

            foreach ($users as $user) {
                $user->role()->associate($roleUser);
                $user->global_id = current($globalIds);
                $user->url_avatar = current($urlAvatars);
                next($globalIds);
                next($urlAvatars);
                $user->save();
            }
            /**
             * Set right role for required users
             */
        $user = \App\Models\User::first();
        $roleAdmin = Role::where('name', 'Admin')->first();
        $user->role()->associate($roleAdmin);
        $user->save();

        $user = \App\Models\User::all()->last();
        $user->global_id = '577a16659829fe050adb3f5c';
        $user->email = 'tester_a@example.com';
        $user->url_avatar = '/profile/api/files/get/2b3b1100-e747-47cc-969d-1060ea426853';
        $user->save();

        }
        
    }
}
