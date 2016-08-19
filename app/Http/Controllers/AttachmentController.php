<?php

namespace App\Http\Controllers;

use App\Models\Attachment;
use App\Models\Comment;
use App\Models\Message;
use App\Models\Topic;
use App\Models\Vote;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use App\Facades\AttachmentService;

use App\Http\Requests;

class AttachmentController extends ApiController
{

    /**********  TOPIC SECTION START **********/

    /*
     * @param Topic $topic
     * @param Attachment $attachment
     * @return bool
     */
    protected function isAttachmentBelongsToTopic(Topic $topic, Attachment $attachment)
    {
        $topicWhichHasThisAttachment = $attachment->topics()->get()->first();

        return ($topicWhichHasThisAttachment && $topicWhichHasThisAttachment->id === $topic->id);
    }


    /**
     * @api {get} topics/:id/attachments List attachments of the topic
     * @apiName Index topic-attachments
     * @apiGroup Attachments-Topic
     *
     * @apiDescription Returns the list of the topic attachments
     *
     * @apiParam {Number} id Topic ID
     *
     * @apiSuccess {Json} List List of the Topic attachments
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *{
     *   "data": [
     *  {
     *   "id": 51,
     *   "url": "http://lorempixel.com/640/480/?56978",
     *   "cloud_public_id": "195",
     *   "type": "image/x-portable-graymap",
     *   "created_at": "2016-08-18 20:03:46",
     *   "updated_at": "2016-08-18 20:03:46",
     *   "pivot": {
     *   "attachmenttable_id": 81,
     *   "attachment_id": 51
     *   }
     *   }
     *   ],
     *   "_meta": []
     *   }
     * @apiError 404   Topic not found
     *
     * @apiErrorExample Error-Response 404:
     *     HTTP/1.1 404 Not Found
     *     {
     *      Topic not found
     *     }
     */

    /*
     * @param Topic $topic
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAllTopicAttachments(Topic $topic)
    {
        $attachments = $topic->attachments()->get();
        return $this->setStatusCode(200)->respond($attachments);
    }

    /**
     * @api {get} topics/:id/attachments/:id  Get the topic attachment
     * @apiName View topic-attachment
     * @apiGroup Attachments-Topic
     *
     * @apiDescription Returns the attachment of the topic
     *
     * @apiParam {Number} id Topic ID, Attachment ID
     *
     * @apiSuccess {Json} Json Topic attachment
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *{
    *"data": {
    *"id": 52,
    *"url": "http://lorempixel.com/640/480/?45068",
    *"cloud_public_id": "958",
    *"type": "application/vnd.kenameaapp",
    *"created_at": "2016-08-18 20:03:46",
    *"updated_at": "2016-08-18 20:03:46"
    *},
    *"_meta": []
    *}
     *
     * @apiError 404   Topic not found,  Attachment not found
     *
     * @apiErrorExample Error-Response 404:
     *     HTTP/1.1 404 Not Found
     *     {
     *      Topic not found
     *     }
     *
     * @apiErrorExample Error-Response 404:
     *     HTTP/1.1 404 Not Found
     *     {
     *      Attachment not found
     *     }
     */

    /*
     * @param Topic $topic
     * @param Attachment $attachment
     * @return \Illuminate\Http\JsonResponse
     */
    public function getTopicAttachment(Topic $topic, Attachment $attachment)
    {
        if ($this->isAttachmentBelongsToTopic($topic, $attachment)) {
            return $this->setStatusCode(200)->respond($attachment);
        } else {
            throw (new ModelNotFoundException)->setModel(Attachment::class);
        }
    }

    /**
     * @api {post} topics/:id/attachments/ Upload attachment of the topic
     * @apiName upload topic-attachment
     * @apiGroup Attachments-Topic
     *
     * @apiDescription Upload attachment of specific topic. Cloud upload storage
     *
     * @apiParam {Number} id Topic ID
     * @apiParam {file} Key File  to upload, types are ...
     * @apiHeader {String} Content-Type    multipart/form-data
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 201 OK
     *
     * @apiError 404   Topic not found
     *
     * @apiErrorExample Error-Response 404:
     *     HTTP/1.1 404 Not Found
     *     {
     *      Topic not found
     *     }
     */
    /*
     * @param Topic $topic
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function storeTopicAttachment(Topic $topic, Request $request)
    {
        $attachment_data = AttachmentService::uploadAttachmentToCloud($request);
        $attachment = Attachment::create($attachment_data);
        $attachment = $topic->attachments()->save($attachment);
        return $this->setStatusCode(201)->respond($attachment);
    }
    
    /**
     * @api {delete} topics/:id/attachments/:id  Delete the attachment of the topic
     * @apiName Delete topic-attachment
     * @apiGroup Attachments-Topic
     *
     * @apiDescription Delete specific attachment of specific topic. Cloud upload storage
     *
     * @apiParam {Number} id Topic ID,  Attachment ID
     *
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 204 No Content
     *
     * @apiError 404   Topic not found,  Attachment not found
     *
     * @apiErrorExample Error-Response 404:
     *     HTTP/1.1 404 Not Found
     *     {
     *      Topic not found
     *     }
     *@apiErrorExample Error-Response 404:
     *     HTTP/1.1 404 Not Found
     *     {
     *      Attachment  not found
     *     }
     */
    
    /*
     * @param Topic $topic
     * @param Attachment $attachment
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroyTopicAttachment(Topic $topic, Attachment $attachment)
    {
        if ($this->isAttachmentBelongsToTopic($topic, $attachment)) {
            AttachmentService::deleteAttachmentFromCloud($attachment->cloud_public_id);
            $attachment->delete();
            return $this->setStatusCode(204)->respond();
        } else {
            throw (new ModelNotFoundException)->setModel(Attachment::class);
        }
    }

    /**********  VOTE SECTION START **********/

    /**
     * @param Vote $vote
     * @param Attachment $attachment
     * @return bool
     */
    protected function isAttachmentBelongsToVote(Vote $vote, Attachment $attachment)
    {
        $voteWhichHasThisAttachment = $attachment->votes()->get()->first();

        return ($voteWhichHasThisAttachment && $voteWhichHasThisAttachment->id === $vote->id);
    }

    /**
     * @api {get} votes/:id/attachments List attachments of the vote
     * @apiName Index vote-attachments
     * @apiGroup Attachments-Vote
     *
     * @apiDescription Returns the list of the attachments of the vote
     *
     * @apiParam {Number} id Vote ID
     *
     * @apiSuccess {Json} List List of the Vote attachments
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *{
     *
     *"data": [
     *{
     *"id": 72,
     *"url": "http://lorempixel.com/640/480/?60000",
     *"cloud_public_id": "610",
     *"type": "video/webm",
     *"created_at": "2016-08-18 20:03:54",
     *"updated_at": "2016-08-18 20:03:54",
     *"pivot": {
     *"attachmenttable_id": 83,
     *"attachment_id": 72
     *}
     *}
     *],
     *"_meta": []
     *}
     * @apiError 404   Vote  not found
     *
     * @apiErrorExample Error-Response 404:
     *     HTTP/1.1 404 Not Found
     *     {
     *      Vote not found
     *     }
     */
    /**
     * @param Vote $vote
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAllVoteAttachments(Vote $vote)
    {
        $attachments = $vote->attachments()->get();
        return $this->setStatusCode(200)->respond($attachments);
    }

    /**
     * @api {get} votes/:id/attachments/:id Get the vote attachment
     * @apiName View vote-attachment
     * @apiGroup Attachments-Vote
     *
     * @apiDescription Returns the specific attachment for specific vote
     *
     * @apiParam {Number} id Vote ID, Attachment ID
     *
     * @apiSuccess {Json} Json Vote attachment
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
    *{
    *"data": {
    *"id": 72,
    *"url": "http://lorempixel.com/640/480/?60000",
    *"cloud_public_id": "610",
    *"type": "video/webm",
    *"created_at": "2016-08-18 20:03:54",
    *"updated_at": "2016-08-18 20:03:54"
    *},
    *"_meta": []
    *}
     *
     * @apiError 404   Vote not found,  Attachment not found
     *
     * @apiErrorExample Error-Response 404:
     *     HTTP/1.1 404 Not Found
     *     {
     *      Vote not found
     *     }
     *
     * @apiErrorExample Error-Response 404:
     *     HTTP/1.1 404 Not Found
     *     {
     *      Attachment not found
     *     }
     */

    /**
     * @param Vote $vote
     * @param Attachment $attachment
     * @return \Illuminate\Http\JsonResponse
     */
    public function getVoteAttachment(Vote $vote, Attachment $attachment)
    {
        if ($this->isAttachmentBelongsToVote($vote, $attachment)) {
            return $this->setStatusCode(200)->respond($attachment);
        } else {
            throw (new ModelNotFoundException)->setModel(Attachment::class);
        }
    }

    /**
     * @api {post} votes/:id/attachments/ Upload attachment of the vote
     * @apiName upload vote-attachment
     * @apiGroup Attachments-Vote
     *
     * @apiDescription Upload attachment for specific vote. Cloud upload storage
     *
     * @apiParam {Number} id Vote ID
     * @apiParam {file} Key File  to upload, types are ...
     * @apiHeader {String} Content-Type    multipart/form-data
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 201 OK
     *
     * @apiError 404   Vote not found
     *
     * @apiErrorExample Error-Response 404:
     *     HTTP/1.1 404 Not Found
     *     {
     *      Vote not found
     *     }
     */
    /**
     * @param Vote $vote
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function storeVoteAttachment(Vote $vote, Request $request)
    {
        $attachment_data = AttachmentService::uploadAttachmentToCloud($request);
        $attachment = Attachment::create($attachment_data);
        $attachment = $vote->attachments()->save($attachment);
        return $this->setStatusCode(201)->respond($attachment);
    }
    /**
     * @api {delete} votes/:id/attachments/:id  Delete the attachment of the vote
     * @apiName Delete vote-attachment
     * @apiGroup Attachments-Vote
     *
     * @apiDescription Delete specific attachment of specific vote. Cloud upload storage
     *
     * @apiParam {Number} ID Vote ID, Attachment ID
     *
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 204 No Content
     *
     * @apiError 404   Vote not found,  Attachment not found
     *
     * @apiErrorExample Error-Response 404:
     *     HTTP/1.1 404 Not Found
     *     {
     *      Vote  not found
     *     }
     *
     *@apiErrorExample Error-Response 404:
     *     HTTP/1.1 404 Not Found
     *     {
     *      Attachment  not found
     *     }
     */


    /**
     * @param Vote $vote
     * @param Attachment $attachment
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroyVoteAttachment(Vote $vote, Attachment $attachment)
    {
        if ($this->isAttachmentBelongsToVote($vote, $attachment)) {
            AttachmentService::deleteAttachmentFromCloud($attachment->cloud_public_id);
            $attachment->delete();
            return $this->setStatusCode(204)->respond();
        } else {
            throw (new ModelNotFoundException)->setModel(Attachment::class);
        }
    }

    /**********  COMMENT SECTION START **********/

    /**
     * @param Comment $comment
     * @param Attachment $attachment
     * @return bool
     */
    protected function isAttachmentBelongsToComment(Comment $comment, Attachment $attachment)
    {
        $commentWhichHasThisAttachment = $attachment->comments()->get()->first();

        return ($commentWhichHasThisAttachment && $commentWhichHasThisAttachment->id === $comment->id);
    }

    /**
     * @param Comment $comment
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAllCommentAttachments(Comment $comment)
    {
        $attachments = $comment->attachments()->get();
        return $this->setStatusCode(200)->respond($attachments);
    }

    /**
     * @param Comment $comment
     * @param Attachment $attachment
     * @return \Illuminate\Http\JsonResponse
     */
    public function getCommentAttachment(Comment $comment, Attachment $attachment)
    {
        if ($this->isAttachmentBelongsToComment($comment, $attachment)) {
            return $this->setStatusCode(200)->respond($attachment);
        } else {
            throw (new ModelNotFoundException)->setModel(Attachment::class);
        }
    }

    /**
     * @param Comment $comment
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function storeCommentAttachment(Comment $comment, Request $request)
    {
        $attachment_data = AttachmentService::uploadAttachmentToCloud($request);
        $attachment = Attachment::create($attachment_data);
        $attachment = $comment->attachments()->save($attachment);
        return $this->setStatusCode(201)->respond($attachment);
    }

    /**
     * @param Comment $comment
     * @param Attachment $attachment
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroyCommentAttachment(Comment $comment, Attachment $attachment)
    {
        if ($this->isAttachmentBelongsToComment($comment, $attachment)) {
            AttachmentService::deleteAttachmentFromCloud($attachment->cloud_public_id);
            $attachment->delete();
            return $this->setStatusCode(204)->respond();
        } else {
            throw (new ModelNotFoundException)->setModel(Attachment::class);
        }
    }

    /**********  MESSAGE SECTION START **********/

    /**
     * @param Message $message
     * @param Attachment $attachment
     * @return bool
     */
    protected function isAttachmentBelongsToMessage(Message $message, Attachment $attachment)
    {
        $messageWhichHasThisAttachment = $attachment->messages()->get()->first();

        return ($messageWhichHasThisAttachment && $messageWhichHasThisAttachment->id === $message->id);
    }

    /**
     * @param Message $message
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAllMessageAttachments(Message $message)
    {
        $attachments = $message->attachments()->get();
        return $this->setStatusCode(200)->respond($attachments);
    }

    /**
     * @param Message $message
     * @param Attachment $attachment
     * @return \Illuminate\Http\JsonResponse
     */
    public function getMessageAttachment(Message $message, Attachment $attachment)
    {
        if ($this->isAttachmentBelongsToMessage($message, $attachment)) {
            return $this->setStatusCode(200)->respond($attachment);
        } else {
            throw (new ModelNotFoundException)->setModel(Attachment::class);
        }
    }

    /**
     * @param Message $message
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function storeMessageAttachment(Message $message, Request $request)
    {
        $attachment_data = AttachmentService::uploadAttachmentToCloud($request);
        $attachment = Attachment::create($attachment_data);
        $attachment = $message->attachments()->save($attachment);
        return $this->setStatusCode(201)->respond($attachment);
    }

    /**
     * @param Message $message
     * @param Attachment $attachment
     * @return \Illuminate\Http\JsonResponse
     * @throws \Exception
     */
    public function destroyMessageAttachment(Message $message, Attachment $attachment)
    {
        if ($this->isAttachmentBelongsToMessage($message, $attachment)) {
            AttachmentService::deleteAttachmentFromCloud($attachment->cloud_public_id);
            $attachment->delete();
            return $this->setStatusCode(204)->respond();
        } else {
            throw (new ModelNotFoundException)->setModel(Attachment::class);
        }
    }
}
