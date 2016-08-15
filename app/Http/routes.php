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
    /*Routes for users topics*/
    Route::group(['prefix' => 'users/{user}/topics'], function () {
        Route::get('', 'TopicController@getUserTopics')->name('userTopics');
        Route::get('{topic}', 'TopicController@getUserTopic')->name('userTopic');
    });
    /*Routes for Topic tags*/
    Route::group(['prefix' => 'topics/{topic}/tags'], function () {
        Route::get('', 'TagController@getTopicTags')->name('topicTags');
        Route::post('', 'TagController@storeTopicTag')->name('storeTopicTag');
        Route::get('{tag}', 'TagController@getTopicTag')->name('topicTag');
        Route::put('{tag}', 'TagController@updateTopicTag')->name('updateTopicTag');
        Route::delete('{tag}', 'TagController@destroyTopicTag')->name('deleteTopicTag');
    });
    /*Routes for Vote tags*/
    Route::group(['prefix' => 'votes/{vote}/tags'], function () {
        Route::get('', 'TagController@getVoteTags')->name('voteTags');
        Route::post('', 'TagController@storeVoteTag')->name('storeVoteTag');
        Route::get('{tag}', 'TagController@getVoteTag')->name('voteTag');
        Route::put('{tag}', 'TagController@updateVoteTag')->name('updateVoteTag');
        Route::delete('{tag}', 'TagController@destroyVoteTag')->name('deleteVoteTag');
    });
    /*Routes for Topic comments*/
    Route::group(['prefix' => 'topics/{topic}/comments'], function () {
        Route::get('', 'CommentController@getTopicComments')->name('topicComments');
        Route::post('', 'CommentController@storeTopicComment')->name('storeTopicComment');
        Route::get('{comment}', 'CommentController@getTopicComment')->name('topicComment');
        Route::put('{comment}', 'CommentController@updateTopicComment')->name('updateTopicComment');
        Route::delete('{comment}', 'CommentController@destroyTopicComment')->name('deleteTopicComment');
        Route::get('{comment}/comments', 'CommentController@getTopicCommentChildren')->name('topicCommentChildren');
    });
    /*Routes for Vote comments*/
    Route::group(['prefix' => 'votes/{vote}/comments'], function () {
        Route::get('', 'CommentController@getVoteComments')->name('voteComments');
        Route::post('', 'CommentController@storeVoteComment')->name('storeVoteComment');
        Route::get('{comment}', 'CommentController@getVoteComment')->name('voteComment');
        Route::put('{comment}', 'CommentController@updateVoteComment')->name('updateVoteComment');
        Route::delete('{comment}', 'CommentController@destroyVoteComment')->name('deleteVoteComment');
        Route::get('{comment}/comments', 'CommentController@getVoteCommentChildren')->name('voteCommentChildren');
    });
    /*Routes for VoteItem comments*/
    Route::group(['prefix' => 'votes/{vote}/voteitem/{voteitem}/comments'], function () {
        Route::get('', 'CommentController@getVoteItemComments')->name('voteItemComments');
        Route::post('', 'CommentController@storeVoteItemComment')->name('storeVoteItemComment');
        Route::get('{comment}', 'CommentController@getVoteItemComment')->name('voteItemComment');
        Route::put('{comment}', 'CommentController@updateVoteItemComment')->name('updateVoteItemComment');
        Route::delete('{comment}', 'CommentController@destroyVoteItemComment')->name('deleteVoteItemComment');
    });
    /*Routes for Topic attachments*/
    Route::group(['prefix' => 'topics/{topic}/attachments'], function () {
        Route::get('', 'AttachmentController@getAllTopicAttachments')->name('allTopicAttachments');
        Route::get('{attachment}', 'AttachmentController@getTopicAttachment')->name('topicAttachment');
        Route::post('{attachment}', 'AttachmentController@storeTopicAttachment')->name('storeTopicAttachment');
        Route::delete('{attachment}', 'AttachmentController@deleteTopicAttachment')->name('deleteTopicAttachment');
    });
    Route::get('rss', 'rssController@index')->name('rss');
    Route::post('rss', 'rssController@subscribe')->name('rssSubscribe');
});
