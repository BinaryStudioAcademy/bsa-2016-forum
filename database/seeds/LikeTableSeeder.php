<?php

use Illuminate\Database\Seeder;

class LikeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Models\Like::class, 10)->create();
    }
}
