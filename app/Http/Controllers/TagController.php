<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use App\Models\Topic;
use App\Models\Vote;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Http\Requests\TagRequest;

class TagController extends ApiController
{

    /**********  TOPIC SECTION START **********/

    /**
     * @param Topic $topic
     * @param Tag $tag
     * @return bool
     */
    protected function isTagBelongsToTopic(Topic $topic, Tag $tag)
    {
        $topicWhichHasThisTag = $tag->topics()->get()->first();

        return ($topicWhichHasThisTag && $topicWhichHasThisTag->id === $topic->id);
    }

    /**
     * @param Topic $topic
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAllTopicTags(Topic $topic)
    {

        $tags = $topic->tags()->get();
        return $this->setStatusCode(200)->respond($tags);
    }

    /**
     * @param Topic $topic
     * @param Tag $tag
     * @return \Illuminate\Http\JsonResponse
     */
    public function getTopicTag(Topic $topic, Tag $tag)
    {
        if ($this->isTagBelongsToTopic($topic, $tag)) {
            return $this->setStatusCode(200)->respond($tag);
        } else {
            throw (new ModelNotFoundException)->setModel(Tag::class);
        }
    }

    /**
     * @param Topic $topic
     * @param TagRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function storeTopicTag(Topic $topic, TagRequest $request)
    {
        $tag = Tag::create($request->all());
        $tag = $topic->tags()->save($tag);
        return $this->setStatusCode(201)->respond($tag);
    }

    /**
     * @param Topic $topic
     * @param Tag $tag
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroyTopicTag(Topic $topic, Tag $tag)
    {
        if ($this->isTagBelongsToTopic($topic, $tag)) {
            $tag->delete();
            return $this->setStatusCode(204)->respond();
        } else {
            throw (new ModelNotFoundException)->setModel(Tag::class);
        }
    }

    /**********  VOTE SECTION START **********/

    /**
     * @param Vote $vote
     * @param Tag $tag
     * @return bool
     */
    protected function isTagBelongsToVote(Vote $vote, Tag $tag)
    {
        $voteWhichHasThisTag = $tag->votes()->get()->first();

        return ($voteWhichHasThisTag && $voteWhichHasThisTag->id === $vote->id);
    }

    public function getAllVoteTags(Vote $vote)
    {
        $tags = $vote->tags()->get();
        return $this->setStatusCode(200)->respond($tags);
    }

    /**
     * @param Vote $vote
     * @param Tag $tag
     * @return \Illuminate\Http\JsonResponse
     */
    public function getVoteTag(Vote $vote, Tag $tag)
    {
        if ($this->isTagBelongsToVote($vote, $tag)) {
            return $this->setStatusCode(200)->respond($tag);
        } else {
            throw (new ModelNotFoundException)->setModel(Tag::class);
        }
    }

    /**
     * @param Vote $vote
     * @param TagRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function storeVoteTag(Vote $vote, TagRequest $request)
    {
        $tag = Tag::create($request->all());
        $tag = $vote->tags()->save($tag);
        return $this->setStatusCode(201)->respond($tag);
    }

    /**
     * @param Vote $vote
     * @param Tag $tag
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroyVoteTag(Vote $vote, Tag $tag)
    {
        if ($this->isTagBelongsToVote($vote, $tag)) {
            $tag->delete();
            return $this->setStatusCode(204)->respond();
        } else {
            throw (new ModelNotFoundException)->setModel(Tag::class);
        }
    }
}