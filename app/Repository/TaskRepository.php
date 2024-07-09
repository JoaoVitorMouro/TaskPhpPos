<?php

namespace App\Repository;

use App\Interface\TaskRepositoryInterface;
use App\Models\Task;

class TaskRepository implements TaskRepositoryInterface
{
    public function all() {
        return Task::all();
    }

    public function find(int $id) {
        return Task::findOrFail($id);
    }

    public function create(array $data) {
        return Task::create($data);
    }

    public function update(array $data, int $id) {
        return Task::findOrFail($id)->update($data);
    }

    public function delete(int $id) {
        Task::findOrFail($id)->delete();
    }
}
