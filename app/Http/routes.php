<?php

Route::group(['middleware'=>'api', 'prefix'=>'api/v1'], function (){

    Route::get('/', function (){
        return 'Welcome to REST API v1';
    });

    Route::resource('user','UserController');
    Route::resource('topic','TopicController');
    Route::resource('vote','VoteController');
});

