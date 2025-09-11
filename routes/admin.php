<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\FoodCategoryController;
use App\Http\Controllers\Admin\PermissionController;
use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'dashboard'])->name('dashboard');
    Route::resource('permissions', PermissionController::class);
    Route::resource('roles',RoleController::class);
    Route::resource('users',UserController::class);
    Route::resource('food-categorys',FoodCategoryController::class);
    Route::get('food-categorys/{foodCategory}/update-status', [FoodCategoryController::class, 'updateStatus'])->name('food-categorys.updateStatus');
});
