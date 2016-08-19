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
      
        $count_votes = 20;

        factory(App\Models\Vote::class, $count_votes)->create()->each(function($vote) {
            $comment = factory(App\Models\Comment::class)->make();
            $vote->comments()->save($comment);
            $attachment = factory(App\Models\Attachment::class)->make();
            $vote->attachments()->save($attachment);
                $tag = factory(App\Models\Tag::class)->make();
                $vote->tags()->save($tag);

                $like = factory(App\Models\Like::class)->make();
                $vote->likes()->save($like);

        });

    }
}
