<?php

use Illuminate\Database\Seeder;
use DCN\RBAC\Models\Permission;
use DCN\RBAC\Models\Role;

class PermissionsCommentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $updateCommentPermission = Permission::create([
            'name' => 'Update comment',
            'slug' => 'update.comment',
            'model' => 'App\Models\Comment',
        ]);

        $deleteCommentPermission = Permission::create([
            'name' => 'Delete comment',
            'slug' => 'delete.comment',
            'model' => 'App\Models\Comment',
        ]);

        $createCommentPermission = Permission::create([
            'name' => 'Create comment',
            'slug' => 'create.comment',
            'model' => 'App\Models\Comment',
        ]);

        $viewCommentPermission = Permission::create([
            'name' => 'View comment',
            'slug' => 'view.comment',
            'model' => 'App\Models\Comment',
        ]);

        $role = Role::where('name','=', 'User')->first();
        $role->attachPermission($createCommentPermission);
        $role->attachPermission($viewCommentPermission);

        $role = Role::where('name','=', 'Admin')->first();
        $role->attachPermission($createCommentPermission);
        $role->attachPermission($viewCommentPermission);
        $role->attachPermission($updateCommentPermission);
        $role->attachPermission($deleteCommentPermission);
    }
}
