<?php

    Route::get('/', function (){
        return view('main');
    });

    Route::resource('user','UserController');
    Route::resource('topic','TopicController');
    Route::resource('vote','VoteController');
