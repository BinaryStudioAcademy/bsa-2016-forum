<?php
/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/
Route::get('/', function () {
    return view('main');
});
Route::group(['middleware' => 'api', 'prefix' => 'api/v1'], function () {
    Route::get('/', function () {
        return 'Welcome to REST API v1';
    });
    /*Routes for Users*/
    Route::group(['middleware' => 'auth-service'], function () {
        Route::resource('users', 'UserController', [
            'except' => ['edit', 'create'],
            'names' => [
                'index' => 'users.index',
                'store' => 'users.store',
                'show' => 'users.show',
                'update' => 'users.update',
                'destroy' => 'users.destroy',
            ],
        ]);
    });
    /*Routes for users Role*/
    Route::group(['middleware' => 'auth-service', 'prefix' => 'users/{user}/roles'], function () {
        Route::get('', 'UserController@getUserRole')->name('userRole');
        Route::put('{role}', 'UserController@updateRole')->name('updateRole');
    });
    /*Routes for roles*/
    Route::get('roles', 'RoleController@index')->name('roles')->middleware(['auth-service']);
    /*Routes for Topics*/
    Route::group(['middleware' => 'auth-service'], function() {
        Route::resource('topics', 'TopicController', [
            'except' => ['edit', 'create'],
            'names' => [
                'index' => 'topics.index',
                'store' => 'topics.store',
                'show' => 'topics.show',
                'update' => 'topics.update',
                'destroy' => 'topics.destroy',
            ],
        ]);
    });
    /*Routes for Votes*/
    Route::group(['middleware' => 'auth-service'], function() {
        Route::resource('votes', 'VoteController', [
            'except' => ['edit', 'create'],
            'names' => [
                'index' => 'votes.index',
                'store' => 'votes.store',
                'show' => 'votes.show',
                'update' => 'votes.update',
                'destroy' => 'votes.destroy',
            ],
        ]);
    });
    /*Routes for Users Messages*/
    Route::group(['middleware' => 'auth-service'], function() {
        Route::resource('users/{user}/messages', 'MessageController', [
            'except' => ['edit', 'create'],
            'names' => [
                'index' => 'messages.index',
                'store' => 'messages.store',
                'show' => 'messages.show',
                'update' => 'messages.update',
                'destroy' => 'messages.destroy',
            ],
        ]);
    });
    /*Routes for Vote voteItems */
    Route::group(['middleware' => 'auth-service'], function() {
        Route::resource('votes/{vote}/voteitems', 'VoteItemController', [
            'except' => ['edit', 'create'],
            'names' => [
                'index' => 'voteItems.index',
                'store' => 'voteItems.store',
                'show' => 'voteItems.show',
                'update' => 'voteItems.update',
                'destroy' => 'voteItems.destroy'
            ]
        ]);
    });
    /*Routes for users topics*/
    Route::group(['middleware' => 'auth-service', 'prefix' => 'users/{user}/topics'], function () {
        Route::get('', 'TopicController@getUserTopics')->name('userTopics');
        Route::get('{topic}', 'TopicController@getUserTopic')->name('userTopic');
    });
    /*Routes for users votes*/
    Route::group(['middleware' => 'auth-service', 'prefix' => 'users/{user}/votes'], function () {
        Route::get('', 'VoteController@getUserVotes')->name('userVotes');
        Route::get('{vote}', 'VoteController@getUserVote')->name('userVote');
    });
    /*Routes for Topic tags*/
    Route::group(['middleware' => 'auth-service','prefix' => 'topics/{topic}/tags'], function () {
        Route::get('', 'TagController@getAllTopicTags')->name('topicTags');
        Route::post('', 'TagController@storeTopicTag')->name('storeTopicTag');
        Route::get('{tag}', 'TagController@getTopicTag')->name('topicTag');
        Route::delete('{tag}', 'TagController@destroyTopicTag')->name('deleteTopicTag');
    });
    /*Routes for Vote tags*/
    Route::group(['middleware' => 'auth-service', 'prefix' => 'votes/{vote}/tags'], function () {
        Route::get('', 'TagController@getAllVoteTags')->name('voteTags');
        Route::post('', 'TagController@storeVoteTag')->name('storeVoteTag');
        Route::get('{tag}', 'TagController@getVoteTag')->name('voteTag');
        Route::delete('{tag}', 'TagController@destroyVoteTag')->name('deleteVoteTag');
    });
    /*Routes for Topic comments*/
    Route::group(['middleware' => 'auth-service', 'prefix' => 'topics/{topic}/comments'], function () {
        Route::get('', 'CommentController@getTopicComments')->name('topicComments');
        Route::post('', 'CommentController@storeTopicComment')->name('storeTopicComment');
        Route::get('{comment}', 'CommentController@getTopicComment')->name('topicComment');
        Route::put('{comment}', 'CommentController@updateTopicComment')->name('updateTopicComment');
        Route::delete('{comment}', 'CommentController@destroyTopicComment')->name('deleteTopicComment');
        Route::get('{comment}/comments', 'CommentController@getTopicCommentChildren')->name('topicCommentChildren');
    });
    /*Routes for Vote comments*/
    Route::group(['middleware' => 'auth-service', 'prefix' => 'votes/{vote}/comments'], function () {
        Route::get('', 'CommentController@getVoteComments')->name('voteComments');
        Route::post('', 'CommentController@storeVoteComment')->name('storeVoteComment');
        Route::get('{comment}', 'CommentController@getVoteComment')->name('voteComment');
        Route::put('{comment}', 'CommentController@updateVoteComment')->name('updateVoteComment');
        Route::delete('{comment}', 'CommentController@destroyVoteComment')->name('deleteVoteComment');
        Route::get('{comment}/comments', 'CommentController@getVoteCommentChildren')->name('voteCommentChildren');
    });
    /*Routes for VoteItem comments*/
    Route::group(['middleware' => 'auth-service', 'prefix' => 'votes/{vote}/voteitem/{voteitem}/comments'], function () {
        Route::get('', 'CommentController@getVoteItemComments')->name('voteItemComments');
        Route::post('', 'CommentControl ler@storeVoteItemComment')->name('storeVoteItemComment');
        Route::get('{comment}', 'CommentController@getVoteItemComment')->name('voteItemComment');
        Route::put('{comment}', 'CommentController@updateVoteItemComment')->name('updateVoteItemComment');
        Route::delete('{comment}', 'CommentController@destroyVoteItemComment')->name('deleteVoteItemComment');
    });
    /*Routes for Topic attachments*/
    Route::group(['middleware' => 'auth-service', 'prefix' => 'topics/{topic}/attachments'], function () {
        Route::get('', 'AttachmentController@getAllTopicAttachments')->name('allTopicAttachments');
        Route::get('{attachment}', 'AttachmentController@getTopicAttachment')->name('topicAttachment');
        Route::post('', 'AttachmentController@storeTopicAttachment')->name('storeTopicAttachment');
        Route::delete('{attachment}', 'AttachmentController@destroyTopicAttachment')->name('deleteTopicAttachment');
    });

    /*Routes for Vote attachments*/
    Route::group(['middleware' => 'auth-service', 'prefix' => 'votes/{vote}/attachments'], function () {
        Route::get('', 'AttachmentController@getAllVoteAttachments')->name('allVoteAttachments');
        Route::get('{attachment}', 'AttachmentController@getVoteAttachment')->name('voteAttachment');
        Route::post('', 'AttachmentController@storeVoteAttachment')->name('storeVoteAttachment');
        Route::delete('{attachment}', 'AttachmentController@destroyVoteAttachment')->name('deleteVoteAttachment');
    });

    /*Routes for Comment attachments*/
    Route::group(['middleware' => 'auth-service', 'prefix' => 'comments/{comment}/attachments'], function () {
        Route::get('', 'AttachmentController@getAllCommentAttachments')->name('allCommentAttachments');
        Route::get('{attachment}', 'AttachmentController@getCommentAttachment')->name('commentAttachment');
        Route::post('', 'AttachmentController@storeCommentAttachment')->name('storeCommentAttachment');
        Route::delete('{attachment}', 'AttachmentController@destroyCommentAttachment')->name('deleteCommentAttachment');
    });

    /*Routes for Message attachments*/
    Route::group(['middleware' => 'auth-service', 'prefix' => 'messages/{message}/attachments'], function () {
        Route::get('', 'AttachmentController@getAllMessageAttachments')->name('allMessageAttachments');
        Route::get('{attachment}', 'AttachmentController@getMessageAttachment')->name('messageAttachment');
        Route::post('', 'AttachmentController@storeMessageAttachment')->name('storeMessageAttachment');
        Route::delete('{attachment}', 'AttachmentController@destroyMessageAttachment')->name('deleteMessageAttachment');
    });

    Route::get('rss', 'rssController@index')->name('rss')->middleware(['auth-service']);
    Route::post('rss', 'rssController@subscribe')->name('rssSubscribe')->middleware(['auth-service']);
    
});