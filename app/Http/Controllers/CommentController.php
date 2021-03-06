<?php

namespace App\Http\Controllers;

use App\Events\TopicNewCommentEvent;
use App\Events\VoteNewCommentEvent;
use App\Models\Comment;
use App\Models\Vote;
use App\Models\VoteItem;
use App\Http\Requests\CommentsRequest;
use App\Models\Topic;
use App\Events\NewBroadcastCommentEvent;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Gate;
use App\Facades\MarkdownService;
use App\Repositories\UserStore;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Models\Like;
use App\Services\CommentService;

class CommentController extends ApiController
{

    private function getItemMetaData($comment)
    {
        $user = Auth::user();

        $commentMeta = CommentService::commentMeta($user->id, $comment);

        return [
            'user' => UserStore::getUserWithAvatar($comment->user()->first()),
            'likes' => $comment->likes()->count(),
            'attachments' => $comment->attachments()->get(),
            'comments' => $comment->comments()->count(),
            'comments' => $comment->comments()->count(),
            'countOfLikes' => $commentMeta['countOfLikes'],
            'isUser' => $commentMeta['isUser'],
            'likeId' => $commentMeta['likeId'],
            'currentUser' => $user->id
        ];
    }

    private function getCollectionMetaData($comments)
    {
        $data = [];
        if ($comments) {
            foreach ($comments as $comment) {
                $data[$comment->id] = $this->getItemMetaData($comment);
            }
        }
        return $data;
    }

    /**
     * @param Comment $comment
     * @return bool
     */
    protected function isCommentHasAnyChild(Comment $comment)
    {
        return $comment->comments()->exists();
    }

    /**
     * @param Comment $comment
     * @param Comment $commentChild
     * @return bool
     */
    protected function isCommentChildBelongsToComment(Comment $comment, Comment $commentChild)
    {
        if ($comment->comments()->find($commentChild->id)) {
            return true;
        } else {
            return false;
        }
    }

    /**********  TOPIC SECTION START **********/

    /**
     * @param Topic $topic
     * @param Comment $comment
     * @return bool
     */
    protected function isCommentBelongsToTopic(Topic $topic, Comment $comment)
    {
        return !!$topic->comments()->find($comment->id);
    }

    /**
     * @param Topic $topic
     * @return \Illuminate\Http\JsonResponse
     */
    public function getTopicComments(Topic $topic)
    {
        $comments = $topic->comments()->get();

        $meta = $this->getCollectionMetaData($comments);
        return $this->setStatusCode(200)->respond($comments, $meta);
    }

    /**
     * @param Topic $topic
     * @param Comment $comment
     * @return \Illuminate\Http\JsonResponse
     */
    public function getTopicComment(Topic $topic, Comment $comment)
    {
        if ($this->isCommentBelongsToTopic($topic, $comment)) {
            $meta[$comment->id] = $this->getItemMetaData($comment);
            return $this->setStatusCode(200)->respond($comment, $meta);
        } else {
            throw (new ModelNotFoundException)->setModel(Comment::class);
        }
    }

    /**
     * @param Topic $topic
     * @param CommentsRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function storeTopicComment(Topic $topic, CommentsRequest $request)
    {
        $comment = Comment::create($request->all());
        $comment = $topic->comments()->save($comment);
        $comment->content_generated = MarkdownService::baseConvert($comment->content_origin);
        $comment->touchParent()->save();
        event(new TopicNewCommentEvent($topic, $comment));
        $meta[$comment->id] = $this->getItemMetaData($comment);
        return $this->setStatusCode(201)->respond($comment, $meta);
    }

    /**
     * @param Topic $topic
     * @param Comment $comment
     * @param CommentsRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateTopicComment(Topic $topic, Comment $comment, CommentsRequest $request)
    {
        $this->authorize('updateTopicsComment', [$comment, $topic]);

        if ($this->isCommentBelongsToTopic($topic, $comment)) {
            $comment->update($request->all());
            $comment->content_generated = MarkdownService::baseConvert($comment->content_origin);
            $comment->touchParent()->save();
            $meta[$comment->id] = $this->getItemMetaData($comment);
            return $this->setStatusCode(200)->respond($comment, $meta);
        } else {
            throw (new ModelNotFoundException)->setModel(Comment::class);
        }
    }

    /**
     * @param Topic $topic
     * @param Comment $comment
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroyTopicComment(Topic $topic, Comment $comment)
    {
        $this->authorize('deleteTopicsComment', [$comment, $topic]);

        if ($this->isCommentBelongsToTopic($topic, $comment)) {
            $comment->touchParent()->delete();
            return $this->setStatusCode(204)->respond();
        } else {
            throw (new ModelNotFoundException)->setModel(Comment::class);
        }
    }

    /**********  Topic CommentChild SECTION START **********/

    /**
     * @param Topic $topic
     * @param Comment $comment
     * @return \Illuminate\Http\JsonResponse
     */
    public function getTopicCommentChildren(Topic $topic, Comment $comment)
    {
        if ($this->isCommentBelongsToTopic($topic, $comment)) {
            $comments = $comment->comments()->get();
            $meta = $this->getCollectionMetaData($comments);
            return $this->setStatusCode(200)->respond($comments, $meta);
        } else {
            throw (new ModelNotFoundException)->setModel(Comment::class);
        }
    }

    /**
     * @param Topic $topic
     * @param Comment $comment
     * @param CommentsRequest $childCommentInput
     * @return \Illuminate\Http\JsonResponse
     */
    public function storeTopicCommentChild(Topic $topic, Comment $comment, CommentsRequest $childCommentInput)
    {
        if ($this->isCommentBelongsToTopic($topic, $comment)) {
            $childComment = Comment::create($childCommentInput->all());
            $topic->comments()->save($childComment);
            $childComment = $comment->comments()->save($childComment);
            $childComment->content_generated = MarkdownService::baseConvert($childComment->content_origin);
            $childComment->touchParent()->save();
            event(new TopicNewCommentEvent($topic, $childComment));
            $meta[$childComment->id] = $this->getItemMetaData($childComment);
            return $this->setStatusCode(201)->respond($childComment, $meta);
        } else {
            throw (new ModelNotFoundException)->setModel(Comment::class);
        }
    }

    /**
     * @param Topic $topic
     * @param Comment $comment
     * @param Comment $commentChild
     * @return \Illuminate\Http\JsonResponse
     */
    public function getTopicCommentChild(Topic $topic, Comment $comment, Comment $commentChild)
    {
        if ($this->isCommentBelongsToTopic($topic, $comment)
            && $this->isCommentChildBelongsToComment($comment, $commentChild)
        ) {
            $meta[$comment->id] = $this->getItemMetaData($commentChild);
            return $this->setStatusCode(200)->respond($commentChild, $meta);
        } else {
            throw (new ModelNotFoundException)->setModel(Comment::class);
        }
    }

    /**
     * @param Topic $topic
     * @param Comment $comment
     * @param Comment $commentChild
     * @param CommentsRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateTopicCommentChild(
        Topic $topic,
        Comment $comment,
        Comment $commentChild,
        CommentsRequest $request
    ) {

//        $this->authorize('updateTopicsComment', [$comment, $topic]);
        $this->authorize('updateTopicsComment', [$commentChild, $topic]);
        if ($this->isCommentBelongsToTopic($topic, $comment)
            && $this->isCommentChildBelongsToComment($comment, $commentChild)
        ) {
            $commentChild->update($request->all());
            $commentChild->content_generated = MarkdownService::baseConvert($commentChild->content_origin);
            $commentChild->touchParent()->save();
            $meta[$commentChild->id] = $this->getItemMetaData($commentChild);
            return $this->setStatusCode(200)->respond($commentChild, $meta);
        } else {
            throw (new ModelNotFoundException)->setModel(Comment::class);
        }
    }

    /**
     * @param Topic $topic
     * @param Comment $comment
     * @param Comment $commentChild
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroyTopicCommentChild(Topic $topic, Comment $comment, Comment $commentChild)
    {
//        $this->authorize('deleteTopicsComment', [$comment, $topic]);
        $this->authorize('deleteTopicsComment', [$commentChild, $topic]);
        if ($this->isCommentBelongsToTopic($topic, $comment)
            && $this->isCommentChildBelongsToComment($comment, $commentChild)
        ) {
            $commentChild->touchParent()->delete();
            return $this->setStatusCode(204)->respond();
        } else {
            throw (new ModelNotFoundException)->setModel(Comment::class);
        }
    }

    /**********  VOTE SECTION START **********/

    /**
     * @param Vote $vote
     * @param Comment $comment
     * @return bool
     */
    protected function isCommentBelongsToVote(Vote $vote, Comment $comment)
    {
        return !!$vote->comments()->find($comment->id);
    }

    /**
     * @param $comments
     * @return array
     */
    protected function makeCommentsMeta($comments)
    {
        $meta = [];

        foreach ($comments as $comment) {
            $meta[$comment->id]['user'] = UserStore::getUserWithAvatar($comment->user()->first());
        }

        return $meta;
    }

    /**
     * @param Vote $vote
     * @return \Illuminate\Http\JsonResponse
     */
    public function getVoteComments(Vote $vote)
    {
        $comments = $vote->comments()->get();
        $meta = $this->getCollectionMetaData($comments);

        return $this->setStatusCode(200)->respond($comments, $meta);
    }

    /**
     * @param Vote $vote
     * @param Comment $comment
     * @return \Illuminate\Http\JsonResponse
     */
    public function getVoteComment(Vote $vote, Comment $comment)
    {
        if ($this->isCommentBelongsToVote($vote, $comment)) {
            return $this->setStatusCode(200)->respond($comment, [$comment->id => $this->getItemMetaData($comment)]);
        } else {
            throw (new ModelNotFoundException)->setModel(Comment::class);
        }
    }

    /**
     * @param Vote $vote
     * @param CommentsRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function storeVoteComment(Vote $vote, CommentsRequest $request)
    {
        $comment = Comment::create($request->all());
        $comment = $vote->comments()->save($comment);
        $comment->content_generated = MarkdownService::baseConvert($comment->content_origin);
        $comment->touchParent()->save();
        $user = $comment->user()->first();

        event(new NewBroadcastCommentEvent($comment, [
            $comment->id => [
                'user' => $user
            ]
        ]));

        event(new VoteNewCommentEvent($vote, $comment));

        return $this->setStatusCode(201)->respond($comment, [$comment->id => $this->getItemMetaData($comment)]);
    }

    /**
     * @param Vote $vote
     * @param Comment $comment
     * @param CommentsRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateVoteComment(Vote $vote, Comment $comment, CommentsRequest $request)
    {
        $this->authorize('updateVotesComment', [$comment, $vote]);

        if ($this->isCommentBelongsToVote($vote, $comment)) {
            $comment->update($request->all());
            $comment->content_generated = MarkdownService::baseConvert($comment->content_origin);
            $comment->touchParent()->save();
            return $this->setStatusCode(200)->respond($comment, [$comment->id => $this->getItemMetaData($comment)]);
        } else {
            throw (new ModelNotFoundException)->setModel(Comment::class);
        }
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
        $comment = Comment::findOrFail($id);

        $user = Auth::user();

        $like = new Like();
        $like->user()->associate($user);

        //User can't add like to his own comment
        if($user->id != $comment->user_id){
            $comment->likes()->save($like);
        }

        $like = $comment->likes()->where('user_id', Auth::user()->id)->where('likeable_id', $comment->id)->get()->first();

        return $this->setStatusCode(200)->respond($like);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int $idTopic
     * @param  int $idLike
     * @return \Illuminate\Http\Response
     * @throws AuthorizationException
     */
    public function removeLike($idComment,$idLike)
    {
        $comment=Comment::findOrFail($idComment);

        $like = Like::findOrFail($idLike);

        $user = Auth::user();

        $like->delete();

        return $this->setStatusCode(204)->respond();
    }

    /**
     * @param Vote $vote
     * @param Comment $comment
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroyVoteComment(Vote $vote, Comment $comment)
    {
        $this->authorize('deleteVotesComment', [$comment, $vote]);

        if ($this->isCommentBelongsToVote($vote, $comment)) {
            $comment->touchParent()->delete();
            return $this->setStatusCode(204)->respond();
        } else {
            throw (new ModelNotFoundException)->setModel(Comment::class);
        }
    }

    /**********  VoteItem SECTION START **********/

    /**
     * @param VoteItem $voteItem
     * @param Comment $comment
     * @return bool
     */
    protected function isCommentBelongsToVoteItem(VoteItem $voteItem, Comment $comment)
    {
        return !!$voteItem->comments()->find($comment->id);
    }


    /**
     * @param Vote $vote
     * @param VoteItem $voteItem
     * @return \Illuminate\Http\JsonResponse
     */
    public function getVoteItemComments(Vote $vote, VoteItem $voteItem)
    {
        $comments = $voteItem->comments()->get();

        return $this->setStatusCode(200)->respond($comments, $this->getCollectionMetaData($comments));
    }

    /**
     * @param Vote $vote
     * @param VoteItem $voteItem
     * @param Comment $comment
     * @return \Illuminate\Http\JsonResponse
     */
    public function getVoteItemComment(Vote $vote, VoteItem $voteItem, Comment $comment)
    {
        if ($this->isCommentBelongsToVoteItem($voteItem, $comment)) {
            return $this->setStatusCode(200)->respond($comment, [$comment->id => $this->getItemMetaData($comment)]);
        } else {
            throw (new ModelNotFoundException)->setModel(Comment::class);
        }
    }

    /**
     * @param Vote $vote
     * @param VoteItem $voteItem
     * @param CommentsRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function storeVoteItemComment(Vote $vote, VoteItem $voteItem, CommentsRequest $request)
    {
        $comment = Comment::create($request->all());
        $comment = $voteItem->comments()->save($comment);
        $comment->content_generated = MarkdownService::baseConvert($comment->content_origin);
        $comment->touchParent()->save();
        event(new VoteNewCommentEvent($voteItem->vote, $comment));
        return $this->setStatusCode(201)->respond($comment, [$comment->id => $this->getItemMetaData($comment)]);
    }

    /**
     * @param Vote $vote
     * @param VoteItem $voteItem
     * @param Comment $comment
     * @param CommentsRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateVoteItemComment(Vote $vote, VoteItem $voteItem, Comment $comment, CommentsRequest $request)
    {
        $this->authorize('updateVoteItemsComment', [$comment, $voteItem]);

        if ($this->isCommentBelongsToVoteItem($voteItem, $comment)) {
            $comment->update($request->all());
            $comment->content_generated = MarkdownService::baseConvert($comment->content_origin);
            $comment->touchParent()->save();
            return $this->setStatusCode(200)->respond($comment, [$comment->id => $this->getItemMetaData($comment)]);
        } else {
            throw (new ModelNotFoundException)->setModel(Comment::class);
        }
    }

    /**
     * @param Vote $vote
     * @param VoteItem $voteItem
     * @param Comment $comment
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroyVoteItemComment(Vote $vote, VoteItem $voteItem, Comment $comment)
    {
        $this->authorize('deleteVoteItemsComment', [$comment, $voteItem]);

        if ($this->isCommentBelongsToVoteItem($voteItem, $comment)) {
            $comment->touchParent()->delete();
            return $this->setStatusCode(204)->respond();
        } else {
            throw (new ModelNotFoundException)->setModel(Comment::class);
        }
    }


}
