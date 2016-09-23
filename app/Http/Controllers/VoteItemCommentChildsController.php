<?php

namespace App\Http\Controllers;

use App\Events\VoteNewCommentEvent;
use App\Facades\MarkdownService;
use App\Models\Comment;
use App\Models\Vote;
use App\Models\VoteItem;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use App\Http\Requests\CommentsRequest;
use App\Repositories\UserStore;
use Illuminate\Support\Facades\Auth;

use App\Http\Requests;

class VoteItemCommentChildsController extends ApiController
{
    protected function isCommentBelongsToCommentable($commentable, Comment $comment)
    {
        return !!$commentable->comments()->find($comment->id);
    }

    private function getItemMetaData($comment)
    {
        $data = [];

        if (!empty($currentUser = $comment->likes()->where('user_id', Auth::user()->id)->get()->first())) {
            $isUser = true;
            $likeId = $currentUser->id;
            $countOfLikes = $comment->likes()->count();
        } else {
            $isUser = false;
            $likeId = null;
            $countOfLikes = 0;
        }

        $user = Auth::user();
        
        $data[$comment->id] = [
            'user' => UserStore::getUserWithAvatar($comment->user()->first()),
            'likes' => $comment->likes()->count(),
            'attachments' => $comment->attachments()->get(),
            'comments' => $comment->comments()->count(),
            'countOfLikes' => $countOfLikes,
            'isUser' => $isUser,
            'likeId' => $likeId,
            'currentUser' => $user->id
        ];

        return $data;
    }

    private function getCollectionMetaData($comments)
    {
        $data = [];

        foreach ($comments as $comment) {

            $data += $this->getItemMetaData($comment);
        }

        return $data;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($vote, VoteItem $voteItem, Comment $comment)
    {
        if ($this->isCommentBelongsToCommentable($voteItem, $comment)) {
            $comments = $comment->comments()->orderBy('id', 'asc')->get();

            return $this->setStatusCode(200)->respond($comments, $this->getCollectionMetaData($comments));
        } else {
            throw (new ModelNotFoundException)->setModel(Comment::class);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Vote $vote, VoteItem $voteItem, Comment $comment, CommentsRequest $childCommentInput)
    {
        //$comment = Comment::findOrFail($comment);
        if ($this->isCommentBelongsToCommentable($voteItem, $comment)) {
            $childComment = Comment::create($childCommentInput->all());
            $childComment = $comment->comments()->save($childComment);
            $childComment->content_generated = MarkdownService::baseConvert($childComment->content_origin);
            $childComment->save();
            event(new VoteNewCommentEvent($vote, $childComment));
            return $this->setStatusCode(201)->respond($childComment, $this->getItemMetaData($childComment));
        } else {
            throw (new ModelNotFoundException)->setModel(Comment::class);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($vote, VoteItem $voteItem, Comment $comment, $commentChild)
    {
        $commentChild = Comment::findOrFail($commentChild);
        if ($this->isCommentBelongsToCommentable($voteItem, $comment)
            && $this->isCommentBelongsToCommentable($comment, $commentChild)
        ) {
            return $this->setStatusCode(200)->respond($commentChild, $this->getItemMetaData($commentChild));
        } else {
            throw (new ModelNotFoundException)->setModel(Comment::class);
        }
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update($vote, VoteItem $voteItem,
        Comment $comment,
        $commentChild,
        CommentsRequest $request)
    {
        $commentChild = Comment::findOrFail($commentChild);
        $this->authorize('updateVoteItemsCommentChild', [$comment, $commentChild]);

        if ($this->isCommentBelongsToCommentable($voteItem, $comment)
            && $this->isCommentBelongsToCommentable($comment, $commentChild)
        ) {
            $commentChild->update($request->all());
            $commentChild->content_generated = MarkdownService::baseConvert($commentChild->content_origin);
            $commentChild->save();
            return $this->setStatusCode(200)->respond($commentChild, $this->getItemMetaData($commentChild));
        } else {
            throw (new ModelNotFoundException)->setModel(Comment::class);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Vote $vote, VoteItem $voteItem, Comment $comment, $commentChild)
    {
        $commentChild = Comment::findOrFail($commentChild);
        $this->authorize('deleteVoteItemsCommentChild', [$comment, $commentChild]);

        if ($this->isCommentBelongsToCommentable($voteItem, $comment)
            && $this->isCommentBelongsToCommentable($comment, $commentChild)
        ) {
            $commentChild->delete();
            return $this->setStatusCode(204)->respond();
        } else {
            throw (new ModelNotFoundException)->setModel(Comment::class);
        }
    }
}
