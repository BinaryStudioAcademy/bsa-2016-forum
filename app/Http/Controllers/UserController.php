<?php

namespace App\Http\Controllers;

use App\Models\User;

use Illuminate\Http\Request;

class UserController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::all();
        return $this->setStatusCode(200)->respond($users);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //if validation fail
//          return $this->setStatusCode(422)->respond($user);

        $user = User::create($request->all());

        return $this->setStatusCode(200)->respond($user);
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::find($id);
        if (!$user) {
            return $this->setStatusCode(404)->respond();
        }
        $user->books;
        return $this->setStatusCode(200)->respond($user);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //if validation fail
//          return $this->setStatusCode(422)->respondWithError('Request is not valid');

        $user = User::find($id);
        if(!$user){
            return $this->setStatusCode(404)->respond();
        }
        $user->update($request->all());

        return $this->setStatusCode(200)->respond($user);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //if validation fail
//          return $this->setStatusCode(422)->respondWithError('Request is not valid');

        $user = User::find($id);
        if(!$user){
            return $this->setStatusCode(404)->respond();
        }
        $user->delete();
        return $this->setStatusCode(204)->respond();

    }
}
