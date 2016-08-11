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
    return view('welcome');
});


Route::group(['middleware'=>'api', 'prefix'=>'api/v1'], function (){

    Route::get('/', function (){
        return 'Welcome to REST API v1';
    });

    Route::resource('user','UserController');
    Route::resource('topic','TopicController');
    Route::get('tags','TagController@getAll');
    Route::resource('vote','VoteController');


});