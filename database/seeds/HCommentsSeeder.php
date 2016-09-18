<?php

use Illuminate\Database\Seeder;
use App\Models\Topic;
use App\Models\VoteItem;
use App\Models\Vote;
use App\Models\User;
use App\Models\Comment;
use Illuminate\Database\Eloquent\Collection;
use App\Facades\MarkdownService;

class HCommentsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $topicComments = [
            [
                'cmnt' => 'I was never mad at him.',
                'sub' => []
            ],
            [
                'cmnt' => 'ABSOLUTELY HE SHOULD WORK AGAIN! Hes an alcoholic bi-polar. Anything else? I mean the man has been one of the most charming and unpretentious big stars of my generation. Bad husband? Ok, but thats not our business. The thing is he never beat her, and he still is in good relations with his first wife where he went to when his world crashed down, so hes not a monster. He got screwed.',
                'sub' => []
            ],
            [
                'cmnt' => 'I liked a lot of his movies before his "breakdown" or whatever it was. The guy obviously has some issues - and once they go beyond personal or relationship stuff (i.e. getting into public displays of racism or antisemitism) it can cause irreparable damage.',
                'sub' => ['He said some things about gays that got him in trouble, and he certainly isnt the first person to comment or bitch about jews in hollywood. Now I dont mean to sound like Archie Bunker but Mel Gibson is from Australia. Now Hit Girl can pummel me publicly for saying this if Im wrong, but most australian men are veeeery chauvanistic and act tough i.e. talk bad about gays. Thats just the way they are, it doesnt mean theyre evil. You know what I mean?',
                ]
            ],
            [
                'cmnt' => '10 years latter? wow you hold a grudge a long time :)',
                'sub' => [
                    'Hahaha I phrased that wrong I\'ve never really cared that much because I can separate art from personality, but I respect people who can\'t. :)',
                    'Ya, I was just funnin\' ya. I like Mel! Good director, great actor. So he said a few stupid things when he was drunk an angry. Most everybody in Hollywood has done that. He should have made the 4th Mad Max picture. But I bet he\'s got some projects going. ',
                    'Mm. I loved Tom Hardys portrayal, but I have to agree. It would have revitalized his career. Hardy would be a star regardless.',
                    'You\'re telling me you\'d buy a 59 year old Max doing the things that Hardy did in Fury Road? \'Cause I sure as hell wouldn\'t. It\'d be pathetic. Just like the last Indy movie and the last Terminator movie. '
                ]
            ],
            [
                'cmnt' => 'As long as he promises not to make a "Passion of the Christ II" and maybe finds a way to make a second "Payback", sure.',
                'sub' => []
            ],
            [
                'cmnt' => 'As long as he does not commit anything prison worthy, why not? ',
                'sub' => []
            ],
            [
                'cmnt' => 'I think Mel Gibson should have played Max in Fury Road and Tom Hardy could have been his second-in-command. I would not have been opposed to Tom Hardy having more screen time than Mel Gibson, either. Tom Hardy just doesn\'t feel like Max to me. ',
                'sub' => []
            ],
            [
                'cmnt' => 'No, it would have to be a totally different film. Or have Gibson be his dad or grandfather in supporting role. Sort of like they did with the last Star War films. ',
                'sub' => []
            ],
            [
                'cmnt' => 'I swear we typed that at the same time, SC must be reading my mind. ',
                'sub' => []
            ],
            [
                'cmnt' => 'I don\'t know if Tom Hardy should have necessarily been Max\'s son, but maybe fans could speculate to themselves that he is. ',
                'sub' => []
            ],
            [
                'cmnt' => 'I kind of like the idea that there are many different interpretations of Max in the universe. I think Miller once said this awhile back, that their all the same Max\'s, but it\'s just how the people view him. I don\'t know I maybe spouting a bunch of stupid bs, but I could have sworn I read it somewhere. ',
                'sub' => []
            ],
            [
                'cmnt' => "Certainly. I have a friend with very different political opinions of my own who once said that he \"hated it when people had to go away for saying the wrong thing.\" I've always liked the way he put that.\n\n

Mel Gibson said a lot of things I don't like, and so have a lot of other people whose art I don't admire and whose presence I don't miss. But overall, I like the cultural trade of a world where we hear offensive things a bit more often and don't need to banish the people who say them from the public eye. I'd like to see a sharper distinction between speech and speaker, and just a generally higher cultural tolerance for even the things we don't like.",
                'sub' => ['Well said. Your friend was a smart man.']
            ],
            [
                'cmnt' => 'Yes! He\'s one of my favorite actors and I think many people respect him enough to forgive him for something that happened ten years ago. ',
                'sub' => []
            ],

        ];

        $votes = Vote::all();
        $voteItems = VoteItem::all();
        $users = User::all();

        $topic = Topic::where('id', 1)->first();
        $addMin = 2;
        $addSec = 0;
        $time = $topic->created_at;

        foreach ($topicComments as $topicComment) {
            $comment = factory(Comment::class)->make();
            $comment->content_origin = $topicComment['cmnt'];
            $comment->content_generated = MarkdownService::baseConvert($topicComment['cmnt']);
            $randomUser = $users->random();
            $comment->user()->associate($randomUser);
            $comment->created_at = $time->addMinutes($addMin)->addSeconds($addSec);
            $addMin = rand(1, 15);
            $addSec = rand(5, 25);
            $comment->save();
            $topic->comments()->save($comment);
            $topic->updated_at = $comment->updated_at;
            $topic->save();
            $subCommentStartTime = $comment->created_at;
            foreach ($topicComment['sub'] as $subComment) {
                $childComment = factory(Comment::class)->make();
                $childComment->content_origin = $subComment;
                $childComment->content_generated = MarkdownService::baseConvert($subComment);
                $randomUser = $users->random();
                $childComment->user()->associate($randomUser);
                $addMin = rand(2, 40);
                $addSec = rand(5, 25);
                $childComment->created_at = $subCommentStartTime->addMinutes($addMin)->addSeconds($addSec);
                $childComment->save();
                $topic->comments()->save($childComment);
                $topic->updated_at = $childComment->updated_at;
                $topic->save();
                $comment->comments()->save($childComment);
            }
        }


//        foreach ($topics as $topic) {
//            $commentCount = rand(1, 5);
//            $comments = factory(Comment::class, $commentCount)->make();
//            if (!$comments instanceof Collection) {
//                $comments =  new Collection([$comments]);
//            }
//            $comments->each(function ($comment) use ($users) {
//                $randomUser = $users->random();
//                $comment->user()->associate($randomUser);
//                $comment->save();
//            });
//
//            $topic->comments()->saveMany($comments);
//        }

        foreach ($votes as $vote) {
            $commentCount = rand(1, 5);
            $comments = factory(Comment::class, $commentCount)
                ->make();
            if (!$comments instanceof Collection) {
                $comments =  new Collection([$comments]);
            }
            $comments->each(function ($comment) use ($users) {
                $randomUser = $users->random();
                $comment->user()->associate($randomUser);
                $comment->save();
            });

            $vote->comments()->saveMany($comments);
        }

        foreach ($voteItems as $voteItem) {
            $commentCount = rand(1, 5);
            $comments = factory(Comment::class, $commentCount)
                ->make();
            if (!$comments instanceof Collection) {
                $comments =  new Collection([$comments]);
            }
            $comments->each(function ($comment) use ($users) {
                $randomUser = $users->random();
                $comment->user()->associate($randomUser);
                $comment->save();
            });

            $voteItem->comments()->saveMany($comments);
        }

    }
}
