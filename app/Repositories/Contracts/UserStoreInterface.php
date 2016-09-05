<?php
namespace App\Repositories\Contracts;



interface UserStoreInterface {

    public function all();

    public function get($id);


}