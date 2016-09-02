<?php

use Illuminate\Database\Seeder;
use App\Models\Topic;
use App\Models\Vote;

class TagsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Models\Tag::class, 20)->create();
    }
}
