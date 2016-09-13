<?php

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Topic;
use App\Models\Tag;
use App\Models\Category;
use Illuminate\Database\Eloquent\Collection;

class TopicsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $topicsCount  = 20;
        $users = User::all();
        $tags = Tag::all();
        $categories = Category::all();

        factory(App\Models\Topic::class, $topicsCount)
            ->make()
            ->each(function($topic) use ($users, $tags, $categories) {
                $randomUser = $users->random();
                $randomCategory = $categories->random();
                $topic->user()->associate($randomUser);
                $topic->category()->associate($randomCategory);
                $topic->save();
                $tagCount = rand(1, 4);
                $randomTags = $tags->random($tagCount);
                if (!$randomTags instanceof Collection) {
                    $randomTags =  new Collection([$randomTags]);
                }
                $topic->tags()->saveMany($randomTags);
            });
    }
}
