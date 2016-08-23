<?php

namespace App\Http\Controllers;

use App\Models\Topic;
use App\Models\Bookmark;
use App\Http\Requests\TopicRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class TopicController extends ApiController
{
    protected $searchStr = null;

    protected $tagIds = [];

    #TODO: Delete this after the authorization implement
    public function __construct()
    {
        $users = User::all();
        Auth::login($users[1]);
    }

    /**
     * @param $topics array
     * @return array $data array
     */
    private function getMetaData($topics)
    {
        $bookmark = new Bookmark();
        if (!(Auth::user()->allowed('view.bookmarks', $bookmark)))
            throw new PermissionDeniedException('view');

        $data = [];
        foreach ($topics as $topic) {
            $bookmark = $topic->bookmarks(Auth::user()->id)->first();
            if ($bookmark !== null) {
                $data['bookmark'][$topic->id] = $topic->bookmarks(Auth::user()->id)->first();
            }
        }
        return $data;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  TopicRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(TopicRequest $request)
    {
        $this->setFiltersData($request);

        $topics = Topic::filterByQuery($this->searchStr)->filterByTags($this->tagIds)->get();

        $meta = $this->getMetaData($topics);

        return $this->setStatusCode(200)->respond($topics, $meta);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  TopicRequest  $request
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
     * @param  int  $id
     * @param  TopicRequest  $request
     * @return \Illuminate\Http\Response
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
