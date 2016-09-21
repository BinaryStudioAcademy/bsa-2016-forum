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
use App\Facades\MarkdownService;
use App\Repositories\UserStore;

class TopicController extends ApiController
{
    protected $searchStr = null;
    protected $tagIds = [];

    /**
     * @param Topic $topic
     * @return array
     */
    private function getMetaDataForModel(Topic $topic)
    {
        return [
            $topic->id => [
                'subscription' => $topic->subscription(Auth::user()->id),
                'category' => $topic->category,
                'user' => UserStore::getUrlAvatar($topic->user()->first()),
                'likes' => $topic->likes()->count(),
                'comments' => $topic->comments()->count(),
                'bookmark' => $topic->bookmarks()->where('user_id', Auth::user()->id)->first(),
            ]
        ];
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

    public function getTopicSubscribers(Topic $topic)
    {
        $subscribers = $topic->subscribers;
        $subscribersNew =array();
        foreach($subscribers as $subscriber)
        {
            $subscribersNew[] = UserStore::getUrlAvatar($subscriber);
        }
        return $this->setStatusCode(200)->respond($subscribersNew);
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

        $topics = Topic::filterByQuery($this->searchStr)->filterByTags($this->tagIds)
            ->filterByLimit($this->limit)->get();

        foreach ($topics as $topic) {
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
        $this->setFiltersData($request);

        if (is_numeric($catId) === false) {
            $catId = Category::where('slug', '=', $catId)->firstOrFail()->id;
        }

        if ($request->page) {
            $paginationObject = Topic::where('category_id', $catId)
                ->filterByQuery($this->searchStr)
                ->filterByTags($this->tagIds)
                ->paginate(15);
            $topics = $paginationObject->getCollection();
            $meta = $this->getMetaDataForCollection($topics);
            $meta['hasMorePages'] = $paginationObject->hasMorePages();
        } else {
            $topics = Topic::where('category_id', $catId)
                ->filterByQuery($this->searchStr)
                ->filterByTags($this->tagIds)->get();
            $meta = $this->getMetaDataForCollection($topics);
        }

        foreach ($topics as $topic) {
            $topic->usersCount = $topic->activeUsersCount();
            $topic->answersCount = $topic->comments()->count();
        }
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
        $topic->generated_description = MarkdownService::baseConvert($topic->description);
        $topic->save();
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
        $topic = Topic::getSluggableModel($id);
        $topic->tags = $topic->tags()->get();
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
        $topic = Topic::getSluggableModel($id);

        $this->authorize('update', $topic);

        $topic->update($request->all());

        TagService::TagsHandler($topic, $request->tags);

        $topic->generated_description = MarkdownService::baseConvert($topic->description);
        $topic->save();
        $topic->tags = $topic->tags()->get();
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
        $topic = Topic::getSluggableModel($id);

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

        if ($request->page) {
            $paginationObject = $user->topics()
                ->getQuery()
                ->filterByQuery($this->searchStr)
                ->filterByTags($this->tagIds)
                ->paginate(15);
            $topics = $paginationObject->getCollection();
            $meta = $this->getMetaDataForCollection($topics);
            $meta['hasMorePages'] = $paginationObject->hasMorePages();
        } else {
            $topics = $user->topics()
                ->getQuery()
                ->filterByQuery($this->searchStr)
                ->filterByTags($this->tagIds)
                ->get();
            $meta = $this->getMetaDataForCollection($topics);
        }

        if (!$topics) {
            return $this->setStatusCode(200)->respond();
        }

        foreach ($topics as $topic) {
            $topic->usersCount = $topic->activeUsersCount();
            $topic->answersCount = $topic->comments()->count();
        }

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
        $this->limit = $request->get('limit');
    }

}
