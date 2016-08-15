<?php

namespace App\Http\Controllers;

use App\Models\Topic;
use App\Http\Requests\TopicRequest;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\ModelNotFoundException;



class TopicController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @param TopicRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(TopicRequest $request)
    {
        $searchStr = $request->get('query');
        $tagIds = $request->get('tag_ids');
        $tagIdsArray = ($tagIds) ? explode(',', $tagIds) : [];

        $topics = (new Topic())->newQuery();

        $topics = $this->filterByQuery($topics, $searchStr);
        $topics = $this->filterByTags($topics, $tagIdsArray);

        $topics = $topics->get();

        return $this->setStatusCode(200)->respond($topics);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
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
    public function show($id)
    {
        $topic = Topic::findOrFail($id);

        return $this->setStatusCode(200)->respond($topic);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(TopicRequest $request, $id)
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
     * @param TopicRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUserTopics($userId, TopicRequest $request)
    {
        $user = User::findOrFail($userId);

        $searchStr = $request->get('query');
        $tagIds = $request->get('tag_ids');
        $tagIdsArray = ($tagIds) ? explode(',', $tagIds) : [];

        $topics = $user->topics()->getQuery();

        $topics = $this->filterByQuery($topics, $searchStr);
        $topics = $this->filterByTags($topics, $tagIdsArray);

        $topics = $topics->get();

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
     * Return Builder object with filter by tags
     *
     * @param Builder $query
     * @param array $tagIds
     * @return Builder
     */
    protected function filterByTags(Builder $query, array $tagIds)
    {
        if (!empty($tagIds)) {
            $query = $query->whereHas('tags', function($q) use ($tagIds){
                $q->whereIn('id', $tagIds);
            });
        }

        return $query;
    }

    /**
     * Return Builder object with filter by the topic's name and topic's description
     *
     * @param Builder $query
     * @param string|null $searchStr
     * @return Builder
     */
    protected function filterByQuery(Builder $query, $searchStr)
    {
        if ($searchStr) {
            $query = $query->where('name','LIKE','%'.$searchStr.'%')
                ->orWhere('description','LIKE','%'.$searchStr.'%');
        }

        return $query;
    }

}
