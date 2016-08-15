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
    Route::get('users/{user}/topics', 'TopicController@getUserTopics')->name('userTopics');
    Route::get('users/{user}/topics/{topic}', 'TopicController@getUserTopic')->name('userTopic');

    /*Routes for Topic tags*/
    Route::get('topics/{topic}/tags', 'TagController@getTopicTags')->name('topicTags');
    Route::post('topics/{topic}/tags', 'TagController@storeTopicTag')->name('storeTopicTag');
    Route::get('topics/{topic}/tags/{tag}', 'TagController@getTopicTag')->name('topicTag');
    Route::put('topics/{topic}/tags/{tag}', 'TagController@updateTopicTag')->name('updateTopicTag');
    Route::delete('topics/{topic}/tags/{tag}', 'TagController@destroyTopicTag')->name('deleteTopicTag');

    /*Routes for Vote tags*/
    Route::get('votes/{vote}/tags', 'TagController@getVoteTags')->name('voteTags');
    Route::post('votes/{vote}/tags', 'TagController@storeVoteTag')->name('storeVoteTag');
    Route::get('votes/{vote}/tags/{tag}', 'TagController@getVoteTag')->name('voteTag');
    Route::put('votes/{vote}/tags/{tag}', 'TagController@updateVoteTag')->name('updateVoteTag');
    Route::delete('votes/{vote}/tags/{tag}', 'TagController@destroyVoteTag')->name('deleteVoteTag');

    /*Routes for Topic comments*/
    Route::get('topics/{topic}/comments', 'CommentController@getTopicComments')->name('topicComments');
    Route::post('topics/{topic}/comments', 'CommentController@storeTopicComment')->name('storeTopicComment');
    Route::get('topics/{topic}/comments/{comment}', 'CommentController@getTopicComment')->name('topicComment');
    Route::put('topics/{topic}/comments/{comment}', 'CommentController@updateTopicComment')->name('updateTopicComment');
    Route::delete('topics/{topic}/comments/{comment}',
        'CommentController@destroyTopicComment')->name('deleteTopicComment');
    Route::get('topics/{topic}/comments/{comment}/comments',
        'CommentController@getTopicCommentChildren')->name('topicCommentChildren');

    /*Routes for Vote comments*/
    Route::get('votes/{vote}/comments', 'CommentController@getVoteComments')->name('voteComments');
    Route::post('votes/{vote}/comments', 'CommentController@storeVoteComment')->name('storeVoteComment');
    Route::get('votes/{vote}/comments/{comment}', 'CommentController@getVoteComment')->name('voteComment');
    Route::put('votes/{vote}/comments/{comment}', 'CommentController@updateVoteComment')->name('updateVoteComment');
    Route::delete('votes/{vote}/comments/{comment}', 'CommentController@destroyVoteComment')->name('deleteVoteComment');
    Route::get('votes/{vote}/comments/{comment}/comments',
        'CommentController@getVoteCommentChildren')->name('voteCommentChildren');

    /*Routes for VoteItem comments*/
    Route::get('votes/{vote}/voteitem/{voteitem}/comments',
        'CommentController@getVoteItemComments')->name('voteItemComments');
    Route::post('votes/{vote}/voteitem/{voteitem}/comments',
        'CommentController@storeVoteItemComment')->name('storeVoteItemComment');
    Route::get('votes/{vote}/voteitem/{voteitem}/comments/{comment}',
        'CommentController@getVoteItemComment')->name('voteItemComment');
    Route::put('votes/{vote}/voteitem/{voteitem}/comments/{comment}',
        'CommentController@updateVoteItemComment')->name('updateVoteItemComment');
    Route::delete('votes/{vote}/voteitem/{voteitem}/comments/{comment}',
        'CommentController@destroyVoteItemComment')->name('deleteVoteItemComment');


    Route::get('rss', 'rssController@index')->name('rss');
    Route::post('rss', 'rssController@subscribe')->name('rssSubscribe');
});
