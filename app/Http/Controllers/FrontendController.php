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
    public function subCategory(FoodCategory $foodCategory)
    {
        $subFoodCategories = $foodCategory
            ->subFoodCategories()
            ->where('status', 1)
            ->with('foodCategory') // include parent info
            ->latest()
            ->get();

        return Inertia::render('Frontend/SubCategory', [
            'foodCategory'      => $foodCategory,
            'subFoodCategories' => $subFoodCategories,
        ]);
    }

  
    public function itemDetail(MenuItem $menuItem)
    {
        $menuItem->load(['subFoodCategory','subFoodCategory.foodCategory']);
        return Inertia::render('Frontend/ItemDetail', [
            'menuItem' => $menuItem
        ]);
    }
    public function order()
    {
        return Inertia::render('Frontend/Order');
    }
}
