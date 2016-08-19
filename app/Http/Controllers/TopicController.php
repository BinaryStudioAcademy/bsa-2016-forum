<?php

namespace App\Http\Controllers;

use App\Models\Topic;
use App\Http\Requests\TopicRequest;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class TopicController extends ApiController
{
    protected $searchStr = null;

    protected $tagIds = [];

    /**
     * Display a listing of the resource.
     *
     * @param  TopicRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */

    /**
     * @api {get} topics Index topic
     * @apiName Index Topic
     * @apiGroup Topics
     *
     * @apiDescription Returns the list of the topics.
     *
     * @apiParam No
     *
     * @apiSuccess {Json} List  of the Topics like {key:value,}, {key:value,}
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *
    {
        "data": [
            {
            "id": 1,
            "reviewed_number": 429,
            "name": "Maxime dolor hic similique unde sunt incidunt.",
            "description": "Et architecto at esse maiores.",
            "rating": 841,
            "user_id": 1,
            "created_at": "2016-08-17 07:54:21",
            "updated_at": "2016-08-17 07:54:21"
            },
            {
            "id": 2,
            "reviewed_number": 632,
            "name": "Et sequi ex est ratione.",
            "description": "Dolorem sunt assumenda est.",
            "rating": 279,
            "user_id": 5,
            "created_at": "2016-08-17 07:54:21",
            "updated_at": "2016-08-17 07:54:21"
            },
            {
            "id": 3,
            "reviewed_number": 648,
            "name": "Quae voluptate autem veniam nam assumenda.",
            "description": "Sint minus ducimus ullam vitae.",
            "rating": 615,
            "user_id": 4,
            "created_at": "2016-08-17 07:54:21",
            "updated_at": "2016-08-17 07:54:21"
            }
            }
        ],
        "_meta": []
    }
     *
     *
     */
    public function index(TopicRequest $request)
    {
        $this->setFiltersData($request);

        $topics = Topic::filterByQuery($this->searchStr)->filterByTags($this->tagIds)->get();

        return $this->setStatusCode(200)->respond($topics);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  TopicRequest  $request
     * @return \Illuminate\Http\Response
     */
    /**
     * @api {post} topics/  Create new topic
     * @apiName Create Topic
     * @apiGroup Topics
     *
     * @apiDescription Creates a new topic.
     *
     * @apiParam No
     *
     * @apiSuccess {Json} Topic the Topic like {key:value,}
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 201 Created
    {
        "data": [
            {
            "id": 1,
            "reviewed_number": 429,
            "name": "Maxime dolor hic similique unde sunt incidunt.",
            "description": "Et architecto at esse maiores.",
            "rating": 841,
            "user_id": 1,
            "created_at": "2016-08-17 07:54:21",
            "updated_at": "2016-08-17 07:54:21"
            }
        ],
        "_meta": []
    }
     *
     */
    public function store(TopicRequest $request)
    {
        $topic = Topic::create($request->all());

        return $this->setStatusCode(201)->respond($topic);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    /**
     * @api {get} topics/:id View specific Topic
     * @apiName View Topic
     * @apiGroup Topics
     *
     * @apiDescription Returns the unique Topic.
     *
     * @apiParam {Number} ID Topic ID
     *
     * @apiSuccess {Json} Topic the Topic like {key:value,}
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
    {
        "data": [
            {
            "id": 1,
            "reviewed_number": 429,
            "name": "Maxime dolor hic similique unde sunt incidunt.",
            "description": "Et architecto at esse maiores.",
            "rating": 841,
            "user_id": 1,
            "created_at": "2016-08-17 07:54:21",
            "updated_at": "2016-08-17 07:54:21"
            }
        ],
        "_meta": []
    }
     *
     * @apiError ModelNotFoundException <code>404</code> Topic not found

     * @apiErrorExample Error-Response:
     *   Topic not found

     */
    public function show($id)
    {
        $topic = Topic::findOrFail($id);

        return $this->setStatusCode(200)->respond($topic);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @param  TopicRequest  $request
     * @return \Illuminate\Http\Response
     */
    /**
     * @api {put} topics/:id  Update specific topic.
     * @apiName Update Topic
     * @apiGroup Topics
     *
     * @apiDescription Updates the unique topic.
     *
     * @apiParam {Number} ID Topic ID
     *
     * @apiSuccess {Json} Topic  the Topic like {key:value,}
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
    {
        "data": [
            {
            "id": 1,
            "reviewed_number": 429,
            "name": "Maxime dolor hic similique unde sunt incidunt.",
            "description": "Et architecto at esse maiores.",
            "rating": 841,
            "user_id": 1,
            "created_at": "2016-08-17 07:54:21",
            "updated_at": "2016-08-17 07:54:21"
            }
        ],
        "_meta": []
    }
     *
     *

     * @apiError ModelNotFoundException <code>404</code> Topic not found

     * @apiErrorExample Error-Response:
     *   Topic not found
     *
     */
    public function update($id, TopicRequest $request)
    {
        $topic = Topic::findOrFail($id);
        $topic->update($request->all());

        return $this->setStatusCode(200)->respond($topic);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    /**
     * @api {delete} topics/:id Delete specific topic
     * @apiName Delete topic
     * @apiGroup Topics
     *
     * @apiDescription Deletes the unique topic.
     *
     * @apiParam {Number} ID Topic ID
     *
     * @apiSuccess (Success 204 No content) Empty
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 204 No content
     *
     *
     * @apiError ModelNotFoundException <code>404</code> Topic not found

     * @apiErrorExample Error-Response:
     *   Topic not found

     */
    public function destroy($id)
    {
        $topic = Topic::findOrFail($id);

        $topic->delete();

        return $this->setStatusCode(204)->respond();
    }

    /**
     * Get all or filtering user's topics
     *
     * @param int $userId
     * @param  TopicRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */
    /**
     * @api {get} users/:id/topics Users topics
     * @apiName Index Topic
     * @apiGroup Topics
     *
     * @apiDescription Returns the list of the topics belongs to user.
     *
     * @apiParam {Number} ID User ID
     *
     * @apiSuccess {Json} List  of the Topics like {key:value,}, {key:value,}
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *
    {
        "data": [
        {
        "id": 4,
        "reviewed_number": 636,
        "name": "Rem expedita dolore aspernatur in.",
        "description": "Soluta numquam molestias dolor quia ad quam consectetur.",
        "rating": 808,
        "user_id": 2,
        "created_at": "2016-08-17 07:54:21",
        "updated_at": "2016-08-17 07:54:21"
        },
        {
        "id": 15,
        "reviewed_number": 257,
        "name": "Ex nam ut nobis voluptatem praesentium culpa eveniet.",
        "description": "Autem sapiente voluptate dolor expedita ab minus voluptatibus.",
        "rating": 446,
        "user_id": 2,
        "created_at": "2016-08-17 07:54:22",
        "updated_at": "2016-08-17 07:54:22"
        }
        ],
        "_meta": {
        "user": {
            "id": 2,
            "first_name": "Pierce",
            "last_name": "Morissette",
            "display_name": "kreinger",
            "email": "dayne.hessel@example.com",
            "reputation": 472,
            "status_id": 2,
            "last_visit_at": "2016-05-17 10:26:08",
            "created_at": "2016-08-17 07:54:19",
            "updated_at": "2016-08-17 07:54:19"
            }
        }
    }
     *
     * @apiError ModelNotFoundException <code>404</code> User not found
     * @apiErrorExample Error-Response:
     *     User not found
     *
     */
    public function getUserTopics($userId, TopicRequest $request)
    {
        $user = User::findOrFail($userId);

        $this->setFiltersData($request);

        $topics = $user->topics()
            ->getQuery()
            ->filterByQuery($this->searchStr)
            ->filterByTags($this->tagIds)
            ->get();

        if(!$topics){
            return $this->setStatusCode(200)->respond();
        }

        return $this->setStatusCode(200)->respond($topics, ['user' => $user]);
    }

    /**
     * Get selected user's topic
     *
     * @param int $userId
     * @param int $topicId
     * @return \Illuminate\Http\JsonResponse
     */
    /**
     * @api {get} users/:id/topics/:id Users topic
     * @apiName Users topic
     * @apiGroup Topics
     *
     * @apiDescription Returns the topic belongs to user.
     *
     * @apiParam {Number} ID User ID
     * @apiParam {Number} ID Topic ID
     *
     * @apiSuccess {Json} Topic the Topic like {key:value,}
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *
    {
        "data": {
            "id": 15,
            "reviewed_number": 257,
            "name": "Ex nam ut nobis voluptatem praesentium culpa eveniet.",
            "description": "Autem sapiente voluptate dolor expedita ab minus voluptatibus.",
            "rating": 446,
            "user_id": 2,
            "created_at": "2016-08-17 07:54:22",
            "updated_at": "2016-08-17 07:54:22"
        },
        "_meta": {
            "user": {
                "id": 2,
                "first_name": "Pierce",
                "last_name": "Morissette",
                "display_name": "kreinger",
                "email": "dayne.hessel@example.com",
                "reputation": 472,
                "status_id": 2,
                "last_visit_at": "2016-05-17 10:26:08",
                "created_at": "2016-08-17 07:54:19",
                "updated_at": "2016-08-17 07:54:19"
                }
        }
    }
     * @apiError ModelNotFoundException <code>404</code> User not found
     * @apiErrorExample Error-Response:
     *     User not found
     *
     * @apiError ModelNotFoundException <code>404</code> Topic not found
     * @apiErrorExample Error-Response:
     *     Topic not found
    */
    public function getUserTopic($userId, $topicId)
    {
        $user = User::findOrFail($userId);
        $topic = $user->topics()->where('id',$topicId)->first();
        if(!$topic){
            throw (new ModelNotFoundException)->setModel(Topic::class);
        }

        return $this->setStatusCode(200)->respond($topic, ['user' => $user]);

    }

    /**
     * Set parameters for filters
     *
     * @param TopicRequest $request
     */
    protected function setFiltersData(TopicRequest $request)
    {
        $this->searchStr = $request->get('query');
        $tagIds = $request->get('tag_ids');
        $this->tagIds = ($tagIds) ? explode(',', $tagIds) : [];
    }

}
