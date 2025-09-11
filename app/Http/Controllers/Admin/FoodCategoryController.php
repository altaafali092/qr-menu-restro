<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\FoodCategory\StoreFoodCategoryRequest;
use App\Http\Requests\Admin\FoodCategory\UpdateFoodCategoryRequest;
use App\Models\Admin\FoodCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class FoodCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $foodCategorys=FoodCategory::latest()->paginate(7);
        return Inertia::render('Admin/FoodCategory/Index',[
            'foodCategorys'=>$foodCategorys,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/FoodCategory/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFoodCategoryRequest $request)
    {

        FoodCategory::create($request->validated());
        return to_route('admin.food-categorys.index')
        ->with('success','FoodCategory is addded successfuly');
    }

    /**
     * Display the specified resource.
     */
    public function show(FoodCategory $foodCategory)
    {
        return Inertia::render('Admin/FoodCategory/Show',[
            'foodCategory'=>$foodCategory
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(FoodCategory $foodCategory)
    {
        return Inertia::render('Admin/FoodCategory/Edit',[
            'foodCategory'=>$foodCategory,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */

    public function update(UpdateFoodCategoryRequest $request, FoodCategory $foodCategory)
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            // New image is uploaded, delete the old one
            if ($foodCategory->getRawOriginal('image') && Storage::disk('public')->exists($foodCategory->getRawOriginal('image'))) {
                Storage::disk('public')->delete($foodCategory->getRawOriginal('image'));
            }

            // Store new image
            $path = $request->file('image')->store('FoodCategory', 'public');
            $data['image'] = $path;
        } elseif (array_key_exists('image', $data) && $data['image'] === null) {
            // Image field is null, so user wants to remove the image
            if ($foodCategory->getRawOriginal('image') && Storage::disk('public')->exists($foodCategory->getRawOriginal('image'))) {
                Storage::disk('public')->delete($foodCategory->getRawOriginal('image'));
            }
            // The 'image' key in $data is already null from validation
        } else {
            // No new image uploaded and no explicit removal, so keep the old image.
            // We achieve this by unsetting the 'image' key from the data array,
            // so the update operation doesn't change it.
            unset($data['image']);
        }

        $foodCategory->update($data);

        return to_route('admin.food-categorys.index')
            ->with('success', 'Food Category updated successfully.');
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FoodCategory $foodCategory)
    {
        $imagePath = $foodCategory->getRawOriginal('image');

        if ($imagePath && Storage::disk('public')->exists($imagePath)) {
            Storage::disk('public')->delete($imagePath);
        }

        $foodCategory->delete();

        return back()->with('success', 'Food Category deleted successfully.');
    }
    public function updateStatus(FoodCategory $foodCategory)
    {
        $foodCategory->update([
            'status' => !$foodCategory->status,
        ]);
        return back()->with('success', 'Food Category Status Updated Successfully');
    }
}
