<?php

namespace App\Services;

use App\Interface\TransactionsRepositoryInterface;

class TransactionsService
{
    protected $transactionsRepository;

    public function __construct(TransactionsRepositoryInterface $transactionsRepository)
    {
        $this->transactionsRepository = $transactionsRepository;
    }

    public function all() {
        return $this->transactionsRepository->all();
    }
    

    public function create(array $data) {
        return $this->transactionsRepository->create($data);
    }

    public function find(int $id) {
        return $this->transactionsRepository->find($id);
    }

    public function update(array $data, int $id) {
        return $this->transactionsRepository->update($data, $id);
    }

    public function delete(int $id) {
        return $this->transactionsRepository->delete($id);
    }

    public function userTransactions(int $id) {
        return $this->transactionsRepository->userTransactions($id);
    }
}