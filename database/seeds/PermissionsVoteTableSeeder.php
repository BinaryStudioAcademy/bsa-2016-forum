<?php

use Illuminate\Database\Seeder;
use DCN\RBAC\Models\Permission;
use DCN\RBAC\Models\Role;

class PermissionsVoteTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $updateVotePermission = Permission::create([
            'name' => 'Update votes',
            'slug' => 'update.votes',
            'model' => 'App\Models\Vote',
        ]);

        $deleteVotePermission = Permission::create([
            'name' => 'Delete votes',
            'slug' => 'delete.votes',
            'model' => 'App\Models\Vote',
        ]);

        $createVotePermission = Permission::create([
            'name' => 'Create votes',
            'slug' => 'create.votes',
            'model' => 'App\Models\Vote',
        ]);

        $viewVotePermission = Permission::create([
            'name' => 'View votes',
            'slug' => 'view.votes',
            'model' => 'App\Models\Vote',
        ]);

        $role = Role::where('name','=', 'User')->first();
        $role->attachPermission($createVotePermission);
        $role->attachPermission($viewVotePermission);

        $role = Role::where('name','=', 'Admin')->first();
        $role->attachPermission($createVotePermission);
        $role->attachPermission($viewVotePermission);
        $role->attachPermission($updateVotePermission);
        $role->attachPermission($deleteVotePermission);
    }
}
