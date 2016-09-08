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
        $this->call(TagsSeeder::class);
        $this->call(UserStatusesTableSeeder::class);
        $this->call(UsersTableSeeder::class);
        $this->call(CategoriesTableSeeder::class);
        $this->call(TopicsTableSeeder::class);
        $this->call(MessagesTableSeeder::class);
        $this->call(VoteTableSeeder::class);
        $this->call(VoteItemSeeder::class);
        $this->call(VoteResultsSeeder::class);
        $this->call(CommentsSeeder::class);

        $this->call(SubscriptionsSeeder::class);
        $this->call(LikesSeeder::class);

        Model::reguard();
    }
}
