<?php


use App\Http\Controllers\FrontendController;
use Illuminate\Support\Facades\Route;



Route::get('/',[FrontendController::class, 'index'])->name('home');
Route::get('/order',[FrontendController::class, 'order'])->name('order');

Route::get('/subcategory/{foodCategory}',[FrontendController::class, 'subCategory'])->name('subcategory');
Route::get('/menu/{menuItem}',[FrontendController::class, 'itemDetail'])->name('itemDetail');





require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
