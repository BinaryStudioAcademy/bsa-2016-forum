<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use App\Http\Requests\CommentRequest;
use App\Models\Topic;
use App\Http\Requests;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class CommentController extends ApiController
{
    /**
     * @param Topic $topic
     * @param Comment $comment
     * @return bool
     */
    public function isCommentBelongsToTopic(Topic $topic, Comment $comment)
    {
        $topicWhichHasThisComment = $comment->topics()->get()->first();

        if($topicWhichHasThisComment && $topicWhichHasThisComment->id === $topic->id){
            return true;
        }
        return false;
    }

    /**
     * @param Topic $topic
     * @return \Illuminate\Http\JsonResponse
     */
    public function getTopicComments(Topic $topic)
    {
        $comments = $topic->comments()->get();
        return $this->setStatusCode(200)->respond($comments);
    }

    /**
     * @param Topic $topic
     * @param Comment $comment
     * @return \Illuminate\Http\JsonResponse
     */
    public function getTopicComment(Topic $topic, Comment $comment)
    {
        if($this->isCommentBelongsToTopic($topic, $comment)){
        return $this->setStatusCode(200)->respond($comment);
    }else{
            throw (new ModelNotFoundException)->setModel(Comment::class);
        }
    }

    /**
     * @param Topic $topic
     * @param CommentRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function storeTopicComment(Topic $topic, CommentRequest $request)
    {
        $comment = Comment::create($request->all());
        $comment = $topic->comments()->save($comment);
        return $this->setStatusCode(201)->respond($comment);
    }

    /**
     * @param Topic $topic
     * @param Comment $comment
     * @param CommentRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateTopicComment(Topic $topic, Comment $comment, CommentRequest $request)
    {
        if($this->isCommentBelongsToTopic($topic, $comment)){
            $comment->update($request->all());
            return $this->setStatusCode(200)->respond($comment);
        }else{
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
        if($this->isCommentBelongsToTopic($topic, $comment)){
            $comment->softDeletes();
            return $this->setStatusCode(204)->respond();
        }else{
            throw (new ModelNotFoundException)->setModel(Comment::class);
        }
    }
}
