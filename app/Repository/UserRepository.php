<?php

namespace App\Repository;

use App\Interface\UserRepositoryInterface;
use App\Models\User;

class UserRepository implements UserRepositoryInterface
{
    public function all() {
        return User::all();
    }

    public function find(int $id) {
        return User::findOrFail($id);
    }

    public function create(array $data) {
        return User::create($data);
    }

    public function update(array $data, int $id) {
        return User::findOrFail($id)->update($data);
    }

    public function delete(int $id) {
        User::findOrFail($id)->delete();
    }
}
