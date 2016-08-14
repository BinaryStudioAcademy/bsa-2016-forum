<?php

namespace App\Http\Controllers;

use App\Models\Topic;
use App\Http\Requests\TopicRequest;
use App\Models\User;
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
        // query - search topics with title or description like '%query%'
        $searchQuery = $request->get('query');

        // tag_ids - search topics that has tags with IDs that in tag_ids (example tag_ids=1,2,3,4)
        $tagIds = $request->get('tag_ids');
        $tagIdsArray = explode(',', $tagIds);

        $topics = Topic::all();

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
        // query - search topics with title or description like '%query%'
        $searchQuery = $request->get('query');

        // tag_ids - search topics that has tags with IDs that in tag_ids (example tag_ids=1,2,3,4)
        $tagIds = $request->get('tag_ids');
        $tagIdsArray = explode(',', $tagIds);


        $user = User::findOrFail($userId);
        $topics = $user->topics()->get();
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
    public function filterByTags($topics, $tagsId)
    {
        if(!$topics){
            return Topic::whereHas('tags', function($q) use ($tagsId){
                $q->whereIn('id',$tagsId);
            })->get();

        } else {
            return $topics->whereHas('tags', function($q) use ($tagsId){
                $q->whereIn('id',$tagsId);
            })->get();
        }

    }
    public function filterByName($topics, $query)
    {
        if(!$topics){
            return Topic::where('name','LIKE','%'.$query.'%')->get();
        } else {
            return $topics->where('name','LIKE','%'.$query.'%')->get();
        }
    }
    public function filterByDescription($topics, $query)
    {
        if(!$topics){
            return Topic::where('description','LIKE','%'.$query.'%')->get();
        } else {
            $topics->where('description','LIKE','%'.$query.'%')->get();
        }
    }
}
