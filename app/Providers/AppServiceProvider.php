<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repository\UserRepository;
use App\Interface\UserRepositoryInterface;
use App\Services\UserService;
use App\Repository\TransactionsRepository;
use App\Interface\TransactionsRepositoryInterface;
use App\Services\TransactionsService;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(TransactionsRepositoryInterface::class, TransactionsRepository::class);
        $this->app->bind(TransactionsService::class, function ($app) {
            return new TransactionsService($app->make(TransactionsRepositoryInterface::class));
        });
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
        $this->app->bind(UserService::class, function ($app) {
            return new UserService($app->make(UserRepositoryInterface::class));
        });
        
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
