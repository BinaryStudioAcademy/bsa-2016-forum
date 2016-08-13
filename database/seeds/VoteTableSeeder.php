<?php

use Illuminate\Database\Seeder;

class VoteTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      
        $count_votes = 5;

        factory(App\Models\Vote::class, $count_votes)->create();

    }
}
