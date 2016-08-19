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
            $topic->comments()->save($comment);
            
            $attachment = factory(App\Models\Attachment::class)->make();
            $topic->attachments()->save($attachment);

            $tag = factory(App\Models\Tag::class)->make();
            $topic->tags()->save($tag);

            $like = factory(App\Models\Like::class)->make();
            $topic->likes()->save($like);
            
        });
    }
}
