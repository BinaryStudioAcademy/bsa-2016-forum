<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        $this->call(DropTables::class);
        $this->call(RoleTableSeeder::class);
        $this->call(UserStatusesTableSeeder::class);
        $this->call(UsersTableSeeder::class);
        $this->call(TopicsTableSeeder::class);
        $this->call(MessagesTableSeeder::class);
        $this->call(VoteTableSeeder::class);
        $this->call(CommentsTableSeeder::class);
        $this->call(PermissionsVoteTableSeeder::class);
        $this->call(VoteItemSeeder::class);
        $this->call(PermissionsVoteItemTableSeeder::class);
        $this->call(PermissionsCommentsTableSeeder::class);

        Model::reguard();
    }
}
