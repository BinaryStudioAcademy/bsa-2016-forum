<?php

namespace App\Http\Controllers;

use App\Models\Topic;
use App\Http\Requests\TopicRequest;
use App\Models\User;


class TopicController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
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
    public function getUserTopics($userId)
    {
        $user = User::findOrFail($userId);  //check userId exist
        $topics = Topic::where('user_id',$userId)->get();
        if(!$topics){
            return $this->setStatusCode(404)->respond();
        }
        return $this->setStatusCode(200)->respond($topics, ['user' => $user]);
    }
    public function getUserTopic($userId, $topicId)
    {
        $user = User::findOrFail($userId);      //need for checking if user exist
        $topic = Topic::where('id',$topicId)->where('user_id',$userId)->first();
        if(!$topic){
            return $this->setStatusCode(404)->respond();
        }
        return $this->setStatusCode(200)->respond($topic,['user' => $user]);

    }
}
