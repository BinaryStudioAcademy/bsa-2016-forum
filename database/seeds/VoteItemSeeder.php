<?php

use Illuminate\Database\Seeder;

class VoteItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Models\VoteItem::class, 10)->create();
    }
}
