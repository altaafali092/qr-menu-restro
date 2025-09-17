<?php

namespace App\Http\Controllers;

use App\Models\Admin\FoodCategory;
use App\Models\Admin\SubFoodCategory;
use App\Models\Admin\MenuItem;
use Inertia\Inertia;

class FrontendController extends Controller
{
    public function index()
    {
        $foodCategories = FoodCategory::where('status', 1)->latest()->get();
        return Inertia::render('Frontend/welcome', [
            'foodCategories' => $foodCategories
        ]);
    }
    public function subCategory(SubFoodCategory $subFoodCategory){
        $subFoodCategory->load('foodCategory');
        return Inertia::render('Frontend/SubCategory', [
            'subFoodCategory' => $subFoodCategory,

        ]);
    }
    public function menu()
    {
        $menuItems = MenuItem::where('status', 1)->latest()->get();
        return Inertia::render('Frontend/Menu', [
            'menuItems' => $menuItems
        ]);
    }
    public function order()
    {
        return Inertia::render('Frontend/Order');
    }
}
