<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repository\TaskRepository;
use App\Interface\TaskRepositoryInterface;
use App\Services\TaskService;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(TaskRepositoryInterface::class, TaskRepository::class);
        $this->app->bind(TaskService::class, function ($app) {
            return new TaskService($app->make(TaskRepositoryInterface::class));
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
