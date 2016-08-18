<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use App\Models\Topic;
use App\Http\Requests\TopicRequest;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class TopicController extends ApiController
{
    protected $searchStr = null;

    protected $tagIds = [];

    protected function topicTagsHandler($topic, $topicTags)
    {
        $topicTags = json_decode($topicTags, true);
        foreach ($topicTags as $tag) {
            if($tag['id']){
                $tag = Tag::find($tag['id']);
                $topic->tags()->save($tag);
            }else{
                $existedTag = Tag::where('name',$tag['name']);
                if($existedTag){
                    $topic->tags()->save($existedTag);
                }else{
                    Tag::create($tag);
                }
            }
        }
    }

    /**
     * Display a listing of the resource.
     *
     * @param  TopicRequest $request
     * @return \Illuminate\Http\JsonResponse
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
     * @param  TopicRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(TopicRequest $request)
    {
        $extendedTopic = $topic = Topic::create($request->all());
        $this->topicTagsHandler($topic, $request->tags);
        $extendedTopic->tags = $topic->tags()->get();
        return $this->setStatusCode(201)->respond($extendedTopic);
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $extendedTopic = $topic = Topic::findOrFail($id);
        $extendedTopic->tags = $topic->tags()->get();

        return $this->setStatusCode(200)->respond($extendedTopic);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int $id
     * @param  TopicRequest $request
     * @return \Illuminate\Http\Response
     */
    public function update($id, TopicRequest $request)
    {
        $topic = Topic::findOrFail($id);
        $extendedTopic = $topic = $topic->update($request->all());
        $this->topicTagsHandler($topic, $request->tags);
        $extendedTopic->tags = $topic->tags()->get();
        return $this->setStatusCode(200)->respond($extendedTopic);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
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
     * @param  TopicRequest $request
     * @return \Illuminate\Http\JsonResponse
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

        if (!$topics) {
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
    public function getUserTopic($userId, $topicId)
    {
        $user = User::findOrFail($userId);
        $topic = $user->topics()->where('id', $topicId)->first();
        if (!$topic) {
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
