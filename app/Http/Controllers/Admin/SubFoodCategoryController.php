<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\SubFoodCategory\StoreSubFoodCategoryRequest;
use App\Http\Requests\Admin\SubFoodCategory\UpdateSubFoodCategoryRequest;
use App\Models\Admin\FoodCategory;
use App\Models\Admin\SubFoodCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SubFoodCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $subFoodCategories=SubFoodCategory::with('foodCategory')->latest()->paginate(7);
        return Inertia::render('Admin/SubFoodCategory/Index',[
            'subFoodCategories'=>$subFoodCategories,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $foodCategories=FoodCategory::where('status',1)->latest()->get();
        return Inertia::render('Admin/SubFoodCategory/Create',[
            'foodCategories'=>$foodCategories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSubFoodCategoryRequest $request)
    {
        SubFoodCategory::create($request->validated());
        return to_route('admin.sub-food-categories.index')
        ->with('success','Sub Food Category Added sucessfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(SubFoodCategory $subFoodCategory)
    {
        return Inertia::render('Admin/SubFoodCategory/Show',[
        'SubFoodCategory'=> $subFoodCategory,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SubFoodCategory $subFoodCategory)
    {
        $foodCategories = FoodCategory::where('status', 1)->latest()->get();
        return Inertia::render('Admin/SubFoodCategory/Edit',[
            'subFoodCategory'=>$subFoodCategory,
            'foodCategories'=>$foodCategories,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSubFoodCategoryRequest $request, SubFoodCategory $subFoodCategory)
    {

        $data = $request->validated();

        if ($request->hasFile('image')) {

            if ($subFoodCategory->getRawOriginal('image') && Storage::disk('public')->exists($subFoodCategory->getRawOriginal('image'))) {
                Storage::disk('public')->delete($subFoodCategory->getRawOriginal('image'));
            }

            $path = $request->file('image')->store('SubFoodCategory', 'public');
            $data['image'] = $path;
        } else {

            $data['image'] = $subFoodCategory->getRawOriginal('image');
        }

        $subFoodCategory->update($data);
        return to_route('admin.sub-food-categories.index')
        ->with('success','Sub Food Category updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SubFoodCategory $subFoodCategory)
    {
        $imagePath = $subFoodCategory->getRawOriginal('image');
        if ($imagePath && Storage::disk('public')->exists($imagePath)) {
            Storage::disk('public')->delete($imagePath);
        }

        $subFoodCategory->delete();
        return back()->with('success', 'Food Category deleted successfully.');
    }

    public function updateStatus(SubFoodCategory $subFoodCategory)
    {
        $subFoodCategory->update([
            'status' => !$subFoodCategory->status,
        ]);
        return back()->with('success', 'Sub Food Category Status Updated Successfully');
    }
}
