<?php

use Illuminate\Database\Seeder;

class TopicsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Models\Topic::class, 20)->create()->each(function($topic) {
            $comment = factory(App\Models\Comment::class)->make();
            $comment = $topic->comments()->save($comment);
            
            $tag = factory(App\Models\Tag::class)->make();
            $comment = $topic->tags()->save($tag);
        });
    }
}
