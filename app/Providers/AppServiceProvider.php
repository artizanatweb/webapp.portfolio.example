<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\CategoryRepository;
use App\Repositories\ProductRepository;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(\App\Repositories\Interfaces\CategoryRepository::class, CategoryRepository::class);
        $this->app->bind(\App\Repositories\Interfaces\ProductRepository::class, ProductRepository::class);
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
