<?php

use App\Models\VoteItem;
use DCN\RBAC\Models\Permission;
use DCN\RBAC\Models\Role;
use Illuminate\Database\Seeder;

class PermissionsVoteItemTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $updateVotePermission = Permission::create([
            'name' => 'Update voteitems',
            'slug' => 'update.voteitems',
            'model' => VoteItem::class,
        ]);

        $deleteVotePermission = Permission::create([
            'name' => 'Delete voteitems',
            'slug' => 'delete.voteitems',
            'model' => VoteItem::class,
        ]);

        $createVotePermission = Permission::create([
            'name' => 'Create voteitems',
            'slug' => 'create.voteitems',
            'model' => VoteItem::class,
        ]);

        $viewVotePermission = Permission::create([
            'name' => 'View voteitems',
            'slug' => 'view.voteitems',
            'model' => VoteItem::class,
        ]);

        $role = Role::where('name', 'User')->first();
        $role->attachPermission($createVotePermission);
        $role->attachPermission($viewVotePermission);

        $role = Role::where('name', 'Admin')->first();
        $role->attachPermission($createVotePermission);
        $role->attachPermission($viewVotePermission);
        $role->attachPermission($updateVotePermission);
        $role->attachPermission($deleteVotePermission);
    }
}
