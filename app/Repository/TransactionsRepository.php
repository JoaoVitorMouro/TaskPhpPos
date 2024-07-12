<?php

namespace App\Repository;

use App\Interface\TransactionsRepositoryInterface;
use App\Models\Transactions;

class TransactionsRepository implements TransactionsRepositoryInterface
{
    public function all() {
        return Transactions::all();
    }

    public function find(int $id) {
        return Transactions::findOrFail($id);
    }

    public function create(array $data) {
        return Transactions::create($data);
    }

    public function update(array $data, int $id) {
        return Transactions::findOrFail($id)->update($data);
    }

    public function delete(int $id) {
        Transactions::findOrFail($id)->delete();
    }
    public function userTransactions(int $id) {
        return Transactions::where('user_id', $id)->cursor();
    }
}
