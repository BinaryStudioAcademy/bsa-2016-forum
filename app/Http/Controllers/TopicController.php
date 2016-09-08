<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Topic;
use App\Http\Requests\TopicRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\Eloquent\Collection;
use App\Facades\TagService;
use App\Models\Like;


class TopicController extends ApiController
{
    protected $searchStr = null;

    private function getTopicModel($id) {
        if (is_numeric($id) === false) {
            return  Topic::where('slug', '=', $id)->firstOrFail();
        }

        return Topic::findOrFail($id);
    }

    /**
     * @param Topic $topic
     * @return array
     */
    private function getMetaDataForModel(Topic $topic)
    {
        $data = [];
        $bookmark = $topic->bookmarks()
            ->where('user_id', Auth::user()->id)->first();

        if ($bookmark !== null) {
            $data['bookmark'][$topic->id] = $topic->bookmarks()
                ->where('user_id', Auth::user()->id)->first();
        }

        // requires common standards in the future
        $data[$topic->id] = [
            'subscription' => $topic->subscription(Auth::user()->id)
        ];

        return $data;
    }

    /**
     * @param Topic $topic
     * @return array
     */
    private function getLikesOfTopic(Topic $topic)
    {
        $topic->countOfLikes = $topic->likes()->count();

        $like = $topic->likes()->where('user_id', Auth::user()->id)->first();
        if(!empty($topic->likes()->where('user_id', Auth::user()->id)->get()->first()))
        {
            $topic->is_user = true;
            $topic->like_id = $topic->likes()->where('user_id', Auth::user()->id)->get()->first()->id;
        }
        else
        {
            $topic->is_user= false;
            $topic->like_id = null;
        }

        return $topic;
    }


    /**
     * @param Collection $topics
     * @return array
     */
    private function getMetaDataForCollection(Collection $topics)
    {
        $data = [];

        foreach ($topics as $topic) {
            $data += $this->getMetaDataForModel($topic);
        }

        return $data;
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

        foreach ($topics as $topic) {
            $topic=$this->getLikesOfTopic($topic);
            $topic->usersCount = $topic->activeUsersCount();
            $topic->answersCount = $topic->comments()->count();
        }

        $meta = $this->getMetaDataForCollection($topics);

        return $this->setStatusCode(200)->respond($topics, $meta);
    }


    /**
     * @param $catId
     * @param TopicRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function indexInCategory($catId, TopicRequest $request)
    {
        $user = Auth::user();

        $this->setFiltersData($request);

        $topics = Topic::where('category_id', $catId)
            ->filterByQuery($this->searchStr)
            ->filterByTags($this->tagIds)
            ->paginate(15)->getCollection();

        foreach ($topics as $topic) {
            $topic=$this->getLikesOfTopic($topic);
            $topic->usersCount = $topic->activeUsersCount();
            $topic->answersCount = $topic->comments()->count();
            $topic->currentUser = $user->id;
        }
        $meta = $this->getMetaDataForCollection($topics);

        return $this->setStatusCode(200)->respond($topics, $meta);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  TopicRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(TopicRequest $request)
    {
        $topic = Topic::create($request->all());
        if ($request->tags) {
            TagService::TagsHandler($topic, $request->tags);
        }

        $topic->tags = $topic->tags()->get();
        return $this->setStatusCode(201)->respond($topic);
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $topic = $this->getTopicModel($id);
        $topic->tags = $topic->tags()->get();
        $topic=$this->getLikesOfTopic($topic);

        $meta = $this->getMetaDataForModel($topic);

        return $this->setStatusCode(200)->respond($topic, $meta);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int $id
     * @param  TopicRequest $request
     * @return \Illuminate\Http\Response
     * @throws AuthorizationException
     */
    public function update($id, TopicRequest $request)
    {
        $topic = $this->getTopicModel($id);

        $this->authorize('update', $topic);

        $topic->update($request->all());

        TagService::TagsHandler($topic, $request->tags);
        
        $topic->tags = $topic->tags()->get();
        return $this->setStatusCode(200)->respond($topic);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int $idTopic
     * @return \Illuminate\Http\Response
     * @throws AuthorizationException
     */
    public function addLike($id)
    {
        $topic = Topic::findOrFail($id);

        $user=Auth::user();

        $like = new Like();
        $like->user()->associate($user);

        //User can't add like to his own topic
        if($user->id!=$topic->user_id)
        {
            $topic->likes()->save($like);
        }

        return $this->setStatusCode(200)->respond($topic);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int $idTopic
     * @param  int $idLike
     * @return \Illuminate\Http\Response
     * @throws AuthorizationException
     */
    public function removeLike($idTopic,$idLike)
    {
        $topic = Topic::findOrFail($idTopic);

        $like = Like::findOrFail($idLike);

        $user=Auth::user();

        $like->delete();

        return $this->setStatusCode(200)->respond($topic);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     * @throws AuthorizationException
     */
    public function destroy($id)
    {
        $topic = $this->getTopicModel($id);

        $this->authorize('delete', $topic);

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
            ->paginate(15)->getCollection();

        if (!$topics) {
            return $this->setStatusCode(200)->respond();
        }

        foreach ($topics as $topic) {
            $topic=$this->getLikesOfTopic($topic);
            $topic->usersCount = $topic->activeUsersCount();
            $topic->answersCount = $topic->comments()->count();
        }

        $meta = $this->getMetaDataForCollection($topics);
        $meta['user'] = $user;

        return $this->setStatusCode(200)->respond($topics, $meta);
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
