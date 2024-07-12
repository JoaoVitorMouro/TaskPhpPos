<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\TransactionsController;


Route::apiResource('/users', UserController::class);
Route::apiResource('/transactions', TransactionsController::class);
Route::get('transactions/{id}/usertransactions', [TransactionsController::class, 'userTransactions']);