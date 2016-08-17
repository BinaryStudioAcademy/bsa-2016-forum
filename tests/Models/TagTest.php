<?php

use App\Models\Tag;
use App\Models\Topic;
use App\Models\Vote;

class TagTest extends TestCase
{
    public function testCreateTagForTopic()
    {
        $tag = factory(Tag::class)->make();
        $tagArray = $tag->toArray();
        $topic = Topic::all()->random(1);
        $topic->tags()->save($tag);
        $this->seeInDatabase('tags', $tagArray);
    }

    public function testCreateTagForVote()
    {
        $tag = factory(Tag::class)->make();
        $tagArray = $tag->toArray();
        $vote = Vote::all()->random(1);
        $vote->tags()->save($tag);
        $this->seeInDatabase('tags', $tagArray);
    }

    public function testSoftDelete()
    {
        $tag = Tag::all()->first();
        $tagId = $tag->id;
        $tag->delete();
        $this->seeInDatabase('tags', ['id' => $tagId])
            ->notSeeInDatabase('tags', ['id' => $tagId, 'deleted_at' => null]);
    }
}