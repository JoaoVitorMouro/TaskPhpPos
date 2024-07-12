<?php

namespace App\Services;

use App\Interface\UserRepositoryInterface;

class UserService
{
    public function __construct(
        protected UserRepositoryInterface $userRepository
    ) {       
    }

    public function all() {
        return $this->userRepository->all();
    }

    public function create(array $data) {
        return $this->userRepository->create($data);
    }

    public function find(int $id) {
        return $this->userRepository->find($id);
    }

    public function update(array $data, int $id) {
        return $this->userRepository->update($data, $id);
    }

    public function delete(int $id) {
        return $this->userRepository->delete($id);
    }
}