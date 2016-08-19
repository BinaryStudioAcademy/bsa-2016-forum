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


    /**
    * @api {get} votes/:id/tags List tags of the vote
    * @apiName Index vote-tags
    * @apiGroup Tags-Vote
    *
    * @apiDescription Returns the list of tags of the specific vote
    *
    * @apiParam {Number} id Vote ID
    *
    * @apiSuccess {Json} List List of the Vote tags
    *
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 200 OK
    *{
    *"data": [
    *{
    *"id": 182,
    *"name": "qui",
    *"created_at": "2016-08-18 20:03:54",
    *"updated_at": "2016-08-18 20:03:54",
    *"pivot": {
    *"taggable_id": 83,
    *"tag_id": 182
    *}
    *}
    *],
    *"_meta": []
    *}
    * @apiError 404   Vote not found
    *
    * @apiErrorExample Error-Response 404:
    *     HTTP/1.1 404 Not Found
    *     {
    *      Vote not found
    *     }
    */

    /**
    * @api {get} votes/:id/tags/:id  Get the tag of the vote
    * @apiName View vote-tag
    * @apiGroup Tags-Vote
    *
    * @apiDescription Returns the specific tag of the specific vote
    *
    * @apiParam {Number} id Vote ID, Tag ID
    *
    * @apiSuccess {Json} Json Vote tag
    *
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 200 OK
    *{
    *"data": {
    *"id": 182,
    *"name": "qui",
    *"created_at": "2016-08-18 20:03:54",
    *"updated_at": "2016-08-18 20:03:54"
    *},
    *"_meta": []
    *}
    *
    * @apiError 404   Vote not found,  Tag not found
    *
    * @apiErrorExample Error-Response 404:
    *     HTTP/1.1 404 Not Found
    *     {
    *      Vote not found
    *     }
    *
    * @apiErrorExample Error-Response 404:
    *     HTTP/1.1 404 Not Found
    *     {
    *      Tag not found
    *     }
    */

    /**
    * @api {post} votes/:id/tags/ Add tag to the vote
    * @apiName add vote-tag
    * @apiGroup Tags-Vote
    *
    * @apiDescription Add tag to the specific vote.
    *
    * @apiParam {Number} id  Vote ID
    * @apiParam {String} Name  Name of the tag
    *
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 201 OK
    *{
    *"data": {
    *"name": "ascc",
    *"updated_at": "2016-08-19 00:07:54",
    *"created_at": "2016-08-19 00:07:54",
    *"id": 202
    *},
    *"_meta": []
    *}
    *
    * @apiError 404   Vote not found
    *
    * @apiErrorExample Error-Response 404:
    *     HTTP/1.1 404 Not Found
    *     {
    *      Vote not found
    *     }
    *
    * @apiError 400   Bad request
    *
    * @apiErrorExample Error-Response 400:
    *     HTTP/1.1 400 Bad request
    *{
    *"name": [
    *"Name is required"
    *]
    *}
    */

    /**
    * @api {put} votes/:id/tags/:id Update the tag of the vote
    * @apiName update vote-tag
    * @apiGroup Tags-Vote
    *
    * @apiDescription Update specific tag of specific vote.
    *
    * @apiParam {Number} id  Vote ID, Tag ID
    * @apiParam {String} Name  Name of the tag
    *
    *
    * @apiError 405   Method not allowed
    *
    * @apiErrorExample Error-Response 405:
    *     HTTP/1.1 404 Method Not Allowed
    *     {
    *    Method Not Allowed
    *     }
    */

    /**
    * @api {delete} votes/:id/tags/:id Delete the tag of the vote
    * @apiName delete vote-tag
    * @apiGroup Tags-Vote
    *
    * @apiDescription Delete specific tag of specific vote.
    *
    * @apiParam {Number} id  Vote ID, Tag ID
    *
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 204 No content
    *
    * @apiError 404   Vote not found
    *
    * @apiErrorExample Error-Response 404:
    *     HTTP/1.1 404 Not Found
    *     {
    *      Vote not found
    *     }
    * @apiErrorExample Error-Response 404:
    *     HTTP/1.1 404 Not Found
    *     {
    *      Tag not found
    *     }
    */




    /**
    * @api {get} topics/:id/tags List tags of the topic
    * @apiName Index topic-tags
    * @apiGroup Tags-Topic
    *
    * @apiDescription Returns the list of tags of the specific topic
    *
    * @apiParam {Number} id Topic ID
    *
    * @apiSuccess {Json} List List of the Topic tags
    *
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 200 OK
    *{
    *"data": [
    *{
    *"id": 185,
    *"name": "qui",
    *"created_at": "2016-08-18 23:03:54",
    *"updated_at": "2016-08-18 23:03:54",
    *"pivot": {
    *"taggable_id": 88,
    *"tag_id": 185
    *}
    *}
    *],
    *"_meta": []
    *}
    * @apiError 404   Topic not found
    *
    * @apiErrorExample Error-Response 404:
    *     HTTP/1.1 404 Not Found
    *     {
    *      Topic not found
    *     }
    */

    /**
    * @api {get} topics/:id/tags/:id  Get the tag of the topic
    * @apiName View topic-tag
    * @apiGroup Tags-Topic
    *
    * @apiDescription Returns the specific tag of the specific topic
    *
    * @apiParam {Number} id Topic ID, Tag ID
    *
    * @apiSuccess {Json} Json Topic tag
    *
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 200 OK
    *{
    *"data": {
    *"id": 185,
    *"name": "qui",
    *"created_at": "2016-08-18 23:03:54",
    *"updated_at": "2016-08-18 23:03:54"
    *},
    *"_meta": []
    *}
    *
    * @apiError 404   Topic not found,  Tag not found
    *
    * @apiErrorExample Error-Response 404:
    *     HTTP/1.1 404 Not Found
    *     {
    *      Topic not found
    *     }
    *
    * @apiErrorExample Error-Response 404:
    *     HTTP/1.1 404 Not Found
    *     {
    *      Tag not found
    *     }
    */

    /**
    * @api {post} topics/:id/tags/ Add tag to the topic
    * @apiName add topic-tag
    * @apiGroup Tags-Topic
    *
    * @apiDescription Add tag to the specific topic.
    *
    * @apiParam {Number} id  Topic ID
    * @apiParam {String} Name  Name of the tag
    *
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 201 OK
    *{
    *"data": {
    *"name": "ajsjsj",
    *"updated_at": "2016-08-19 00:07:54",
    *"created_at": "2016-08-19 00:07:54",
    *"id": 206
    *},
    *"_meta": []
    *}
    *
    * @apiError 404   Topic not found
    *
    * @apiErrorExample Error-Response 404:
    *     HTTP/1.1 404 Not Found
    *     {
    *      Topic not found
    *     }
    *
    * @apiError 400   Bad request
    *
    * @apiErrorExample Error-Response 400:
    *     HTTP/1.1 400 Bad request
    *{
    *"name": [
    *"Name is required"
    *]
    *}
    */

    /**
    * @api {put} topics/:id/tags/:id Update the tag of the topic
    * @apiName update topic-tag
    * @apiGroup Tags-Topic
    *
    * @apiDescription Update specific tag of specific topic.
    *
    * @apiParam {Number} id  Topic ID, Tag ID
    * @apiParam {String} Name  Name of the tag
    *
    *
    * @apiError 405   Method not allowed
    *
    * @apiErrorExample Error-Response 405:
    *     HTTP/1.1 404 Method Not Allowed
    *     {
    *    Method Not Allowed
    *     }
    */

    /**
    * @api {delete} topics/:id/tags/:id Delete the tag of the topic
    * @apiName delete vote-tag
    * @apiGroup Tags-Topic
    *
    * @apiDescription Delete specific tag of specific topic.
    *
    * @apiParam {Number} id Topic ID, Tag ID
    *
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 204 No content
    *
    * @apiError 404   Topic not found
    *
    * @apiErrorExample Error-Response 404:
    *     HTTP/1.1 404 Not Found
    *     {
    *      Topic not found
    *     }
    * @apiErrorExample Error-Response 404:
    *     HTTP/1.1 404 Not Found
    *     {
    *      Tag not found
    *     }
    */