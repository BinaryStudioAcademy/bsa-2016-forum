<?php
Route::group(['middleware'=>'api', 'prefix'=>'api/v1'], function (){

    Route::get('/', function (){
        return 'Welcome to REST API v1';
    });

    Route::resource('users','UserController');
    Route::resource('topics','TopicController');
    Route::resource('votes','VoteController');


});