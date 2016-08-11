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

Route::get('/library', function(){
    return view ('library.index');
});

Route::resource('users','UserController');

Route::group(['prefix' => 'comments/'],function(){
    Route::resource('','CommentController');
    Route::resource('comment.vote','UserController@turnbook');
    Route::put('getbook/{id}/{id_user}','UserController@getbook');
});
Route::auth();

Route::get('/home', 'HomeController@index');

Route::get('/auth/github', 'SocialAuthController@redirectToProvider');
Route::get('/auth/github/callback', 'SocialAuthController@handleProviderCallback');
