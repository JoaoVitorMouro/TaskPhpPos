<?php

namespace App\Services;

use App\Interface\TaskRepositoryInterface;

class TaskService
{
    public function __construct(
        protected TaskRepositoryInterface $taskRepository
    ) {       
    }

    public function all() {
        return $this->taskRepository->all();
    }

    public function create(array $data) {
        return $this->taskRepository->create($data);
    }

    public function find(int $id) {
        return $this->taskRepository->find($id);
    }

    public function update(array $data, int $id) {
        return $this->taskRepository->update($data, $id);
    }

    public function delete(int $id) {
        return $this->taskRepository->delete($id);
    }
}