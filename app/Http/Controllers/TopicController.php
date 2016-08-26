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


class TopicController extends ApiController
{
    protected $searchStr = null;

    protected $tagIds = [];

    /**
    /**
     * @param $topics array
     * @return array $data array
     */
    private function getMetaData($topics)
    {
        $data = [];

        if ($topics instanceof Collection) {
            foreach ($topics as $topic) {
                $bookmark = $topic->bookmarks()
                    ->where('user_id', Auth::user()->id)->first();

                if ($bookmark !== null) {
                    $data['bookmark'][$topic->id] = $topic->bookmarks()
                        ->where('user_id', Auth::user()->id)->first();
                }
            }

            return $data;
        }

        $bookmark = $topics->bookmarks()->where('user_id', Auth::user()->id)->first();
        if ($bookmark !== null) {
            $data['bookmark'] = $topics->bookmarks()->where('user_id', Auth::user()->id)->first();
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

        $meta = $this->getMetaData($topics);

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

        $topics = Topic::where('category_id', $catId)
            ->filterByQuery($this->searchStr)
            ->filterByTags($this->tagIds)->get();
        
        $meta = $this->getMetaData($topics);

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
        $topic = Topic::findOrFail($id);
        $topic->tags = $topic->tags()->get();
        $meta = $this->getMetaData($topic);
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

        $topic = Topic::findOrFail($id);

        $this->authorize('update', $topic);

        $topic->update($request->all());

        if ($request->tags) {
            TagService::TagsHandler($topic, $request->tags);
        }
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
        $topic = Topic::findOrFail($id);

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
