<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

use App\Http\Requests;

class MessageController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @param $userId
     * @return \Illuminate\Http\Response
     */
    public function index($userId)
    {
        $userFrom = User::findOrFail($userId);

        $messages = $userFrom->messages()->get();
        if (!$messages) {
            return $this->setStatusCode(200)->respond();
        }
        $usersToIds = $messages->pluck('user_to_id');
        $usersTo = User::whereIn('id', $usersToIds)->get();

        return $this->setStatusCode(200)->respond(
            $messages,
            ['user_from' => $userFrom, 'users_to' => $usersTo]
        );
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param $userId
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store($userId, Request $request)
    {
        $userFrom = User::findOrFail($userId);
        $message = new Message($request->all());
        $message->user()->associate($userFrom);
        $message->save();

        $this->setStatusCode(201)->respond($message);

    }

    /**
     * Display the specified resource.
     *
     * @param $userId
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($userId, $id)
    {
        $userFrom = User::findOrFail($userId);
        $message = $userFrom->messages()->where('id', $id)->first();
        if (!$message) {
            throw (new ModelNotFoundException)->setModel(Message::class);
        }
        $userTo = User::findOrFail($message->user_to_id);

        return $this->setStatusCode(200)->respond(
            $message,
            ['user_from' => $userFrom, 'user_to' => $userTo]
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param $userId
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update($userId, Request $request, $id)
    {
        $user = User::findOrFail($userId);
        $message = $user->messages()->where('id', $id)->first();
        if (!$message) {
            throw (new ModelNotFoundException)->setModel(Message::class);
        }
        $message->update($request->all());
        return $this->setStatusCode(200)->respond($message);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($userId, $id)
    {
        $user = User::findOrFail($userId);
        $message = $user->messages()->where('user_from_id', $userId)->first();
        if (!$message) {
            throw (new ModelNotFoundException)->setModel(Message::class);
        }
        $message->delete();
        return $this->setStatusCode(204)->respond();
    }

    /**
    * @api {get} users/:id/messages List user messages
    * @apiName Index user-messages
    * @apiGroup Messages
    *
    * @apiDescription Returns the list of messages  of the specific user
    *
    * @apiParam {Number} id User ID
    *
    * @apiSuccess {Json} List List of the User messages
    *
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 200 OK
    *{
    *"data": [
    *{
    *"id": 41,
    *"user_from_id": 51,
    *"user_to_id": 55,
    *"message": "Voluptatem sequi ab quas qui quaerat voluptatibus at. Quo omnis in est. Magni ipsa minima culpa qui molestias ex minus. Magni ea commodi est inventore.",
    *"is_read": 1,
    *"created_at": "2016-08-18 20:03:52",
    *"updated_at": "2016-08-18 20:03:52"
    *}
    *],
    *"_meta": {
    *"user_from": {
    *"id": 51,
    *"first_name": "Aditya",
    *"last_name": "Jaskolski",
    *"display_name": "verna.leffler",
    *"email": "jefferey.kilback@example.com",
    *"reputation": 281,
    *"status_id": 12,
    *"last_visit_at": "2016-02-12 05:17:40",
    *"created_at": "2016-08-18 20:03:44",
    *"updated_at": "2016-08-18 20:03:44"
    *},
    *"users_to": [
    *{
    *"id": 55,
    *"first_name": "Joana",
    *"last_name": "Leffler",
    *"display_name": "johanna.rippin",
    *"email": "pjohnston@example.net",
    *"reputation": 236,
    *"status_id": 11,
    *"last_visit_at": "2016-06-04 21:12:32",
    *"created_at": "2016-08-18 20:03:44",
    *"updated_at": "2016-08-18 20:03:44"
    *}
    *]
    *}
    *}
    * @apiError 404   User not found
    *
    * @apiErrorExample Error-Response:
    *     HTTP/1.1 404 Not Found
    *     {
    *      User not found
    *     }
    */

    /**
    * @api {get} users/:id/messages/:id  Get the user message
    * @apiName View user-message
    * @apiGroup Messages
    *
    * @apiDescription Returns the specific message of the specific user
    *
    * @apiParam {Number} id User ID, Message ID
    *
    * @apiSuccess {Json} Json User message
    *
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 200 OK
    *{
    *"data": {
    *"id": 41,
    *"user_from_id": 51,
    *"user_to_id": 55,
    *"message": "Voluptatem sequi ab quas qui quaerat voluptatibus at. Quo omnis in est. Magni ipsa minima culpa qui molestias ex minus. Magni ea commodi est inventore.",
    *"is_read": 1,
    *"created_at": "2016-08-18 20:03:52",
    *"updated_at": "2016-08-18 20:03:52"
    *},
    *"_meta": {
    *"user_from": {
    *"id": 51,
    *"first_name": "Aditya",
    *"last_name": "Jaskolski",
    *"display_name": "verna.leffler",
    *"email": "jefferey.kilback@example.com",
    *"reputation": 281,
    *"status_id": 12,
    *"last_visit_at": "2016-02-12 05:17:40",
    *"created_at": "2016-08-18 20:03:44",
    *"updated_at": "2016-08-18 20:03:44"
    *},
    *"user_to": {
    *"id": 55,
    *"first_name": "Joana",
    *"last_name": "Leffler",
    *"display_name": "johanna.rippin",
    *"email": "pjohnston@example.net",
    *"reputation": 236,
    *"status_id": 11,
    *"last_visit_at": "2016-06-04 21:12:32",
    *"created_at": "2016-08-18 20:03:44",
    *"updated_at": "2016-08-18 20:03:44"
    *}
    *}
    *}
    *
    * @apiError 404   User not found,  Message not found
    *
    * @apiErrorExample Error-Response:
    *     HTTP/1.1 404 Not Found
    *     {
    *      User not found
    *     }
    *
    * @apiErrorExample Error-Response:
    *     HTTP/1.1 404 Not Found
    *     {
    *      Message not found
    *     }
    */

    /**
    * @api {delete} users/:id/messages/:id Delete the message of the user
    * @apiName delete user-message
    * @apiGroup Messages
    *
    * @apiDescription Delete specific user message.
    *
    * @apiParam {Number} id  User ID, Message ID
    *
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 204 No content
    *
    * @apiError 404   User not found, Message not found
    *
    * @apiErrorExample Error-Response 404:
    *     HTTP/1.1 404 Not Found
    *     {
    *      User not found
    *     }
    * @apiErrorExample Error-Response 404:
    *     HTTP/1.1 404 Not Found
    *     {
    *      Message not found
    *     }
    */
}
