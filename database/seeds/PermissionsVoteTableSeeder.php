<?php

use Illuminate\Database\Seeder;
use DCN\RBAC\Models\Permission;

class PermissionsVoteTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $editVotePermission = Permission::create([
            'name' => 'Edit votes',
            'slug' => 'edit.votes',
            'model' => 'App\Models\Vote',
        ]);

        $deleteVotePermission = Permission::create([
            'name' => 'Delete votes',
            'slug' => 'delete.votes',
            'model' => 'App\Models\Vote',
        ]);
    }
}
