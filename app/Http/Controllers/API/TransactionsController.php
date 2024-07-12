<?php

namespace App\Http\Controllers\API;

use App\Services\TransactionsService;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TransactionsController extends Controller
{

    public function __construct(
        protected TransactionsService $transactionService
    ) {
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $transactions = $this->transactionService->all();
        
        return response()->json([
            'success' => true,
            'data' => $transactions,
            'message' => 'All transactions retrivied.'
        ], Response::HTTP_OK);
    }
    
   

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'price' => 'required|numeric',
            'description' => 'required|string|max:100',
            'category' => 'required|string|max:50',
            'type' => 'required|string|max:10',
            'user_id' => 'required|integer',
        ]);

        $transaction = $this->transactionService->create($data);

        return response()->json([
            'success' => true,
            'data' => $transaction,
            'message' => 'transaction created.'
        ], Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        $transaction = $this->transactionService->find($id);
        return response()->json([
            'success' => true,
            'data' => $transaction,
            'message' => 'transaction found.'
        ], Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        $data = $request->validate([
            'price' => 'numeric',
            'description' => 'string|max:100',
            'category' => 'string|max:50',
            'type' => 'string|max:10',
            'user_id' => 'required|integer',
        ]);

        $transaction = $this->transactionService->update($data, $id);

        return response()->json([
            'success' => true,
            'data' => $transaction,
            'message' => 'transaction updated.'
        ], Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $this->transactionService->delete($id);

        return response()->json([], Response::HTTP_NO_CONTENT);
    }

     public function userTransactions(int $id)
    {
        $transactions = $this->transactionService->userTransactions($id);
        
        return response()->json([
            'success' => true,
            'data' => $transactions,
            'message' => 'All transactions retrivied.'
        ], Response::HTTP_OK);
    }
}
