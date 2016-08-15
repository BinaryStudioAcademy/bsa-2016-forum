<?php

use Illuminate\Database\Eloquent\Model;

class TopicTest extends TestCase
{

    public function testSave()
    {
        $topic = factory(App\Models\Topic::class)->create();
        $this->seeInDatabase('topics', [
            'id' => $topic->id,
            'name' => $topic->name,
            'description' => $topic->description,
            'user_id' => $topic->user_id
        ]);
    }
/*
    public function testUpdate()
    {
        $topic = App\Models\Topic::all()->last();

        $topic->reviewed_number += 1;
        $topic->name .= 'Updated';
        $topic->description .= 'Updated';
        $topic->rating += 1;
        $topic->user_id = factory(App\Models\Topic::class)->make()->user_id;;

        $topic->save();

        $this->seeInDatabase('topics', [
            'id' => $topic->id,
            'reviewed_number' => $topic->reviewed_number,
            'name' => $topic->name,
            'description' => $topic->description,
            'rating' => $topic->rating,
            'user_id' => $topic->user_id
        ]);
    }

    public function testSoftDelete()
    {

        $topic = App\Models\Topic::all()->first();
        $topicId = $topic->id;
        $topic->delete();
        $this->seeInDatabase('topics', ['id' => $topicId])
            ->notSeeInDatabase('topics', ['id' => $topicId, 'deleted_at' => null]);
    }

    public function testTopicCreateBookmark()
    {
        $user = \App\Models\User::all()->random(1);
        $topic = \App\Models\Topic::all()->random(1);
        $topic->bookmarks()->attach($user->id);
        $this->seeInDatabase('bookmarks', ['topic_id' => $topic->id, 'user_id' => $user->id]);
    }*/

}