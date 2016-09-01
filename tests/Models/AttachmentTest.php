<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

// In app we use only Create and Delete methods for attachments

class AttachmentTest extends TestCase
{

    public function testCreate()
    {
        $data = [
            'url' => 'http://SomeUrl.zone/file.ext',
            'cloud_public_id' => 'someCloudId',
            'type' => 'fileType'
        ];
        $attachment = \App\Models\Attachment::create($data);
        $this->seeInDatabase('attachments', [
            'id' => $attachment->id,
            'url' => $attachment->url,
            'cloud_public_id' => $attachment->cloud_public_id,
            'type' => $attachment->type,
        ]);
    }

    public function testAttachAttachmentToTopic()
    {
        $attachment = App\Models\Attachment::whereNull('deleted_at')->first();
        $topic = App\Models\Topic::whereNull('deleted_at')->first();
        $topic->attachments()->save($attachment);
        $this->assertEquals($topic->attachments()->find($attachment->id)->id, $attachment->id);
    }

    public function testAttachAttachmentToVote()
    {
        $attachment = App\Models\Attachment::whereNull('deleted_at')->first();
        $vote = App\Models\Vote::whereNull('deleted_at')->first();
        $vote->attachments()->save($attachment);
        $this->assertEquals($vote->attachments()->find($attachment->id)->id, $attachment->id);
    }

    public function testAttachAttachmentToComment()
    {
        $attachment = App\Models\Attachment::whereNull('deleted_at')->first();
        $comment = App\Models\Comment::whereNull('deleted_at')->first();
        $comment->attachments()->save($attachment);
        $this->assertEquals($comment->attachments()->find($attachment->id)->id, $attachment->id);
    }

    public function testAttachAttachmentToVoteItem()
    {
        $attachment = App\Models\Attachment::whereNull('deleted_at')->first();
        $voteItem = App\Models\VoteItem::whereNull('deleted_at')->first();
        $voteItem->attachments()->save($attachment);
        $this->assertEquals($voteItem->attachments()->find($attachment->id)->id, $attachment->id);
    }

    public function testAttachAttachmentToMessage()
    {
        $attachment = App\Models\Attachment::whereNull('deleted_at')->first();
        $message = App\Models\Message::whereNull('deleted_at')->first();
        $message->attachments()->save($attachment);
        $this->assertEquals($message->attachments()->find($attachment->id)->id, $attachment->id);
    }

    public function testSoftDelete()
    {
        $attachment = App\Models\Attachment::whereNull('deleted_at')->first();
        $attachmentId = $attachment->id;
        $attachment->delete();
        $this->seeInDatabase('attachments', ['id' => $attachmentId])
            ->notSeeInDatabase('attachments', ['id' => $attachmentId, 'deleted_at' => null]);
    }
}