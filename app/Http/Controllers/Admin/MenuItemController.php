<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\MenuItem\StoreMenuItemRequest;
use App\Http\Requests\Admin\MenuItem\UpdateMenuItemRequest;
use App\Models\Admin\MenuItem;
use App\Models\Admin\SubFoodCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MenuItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $menuItems=MenuItem::with('subFoodCategory')->latest()->paginate(7);
        return Inertia::render('Admin/MenuItem/Index',[
            'menuItems'=>$menuItems,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $subFoodCategories=SubFoodCategory::where   ('status',1)->latest()->get();
        return Inertia::render('Admin/MenuItem/Create',[
            'subFoodCategories'=>$subFoodCategories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMenuItemRequest $request)
    {
        MenuItem::create($request->validated());
        return to_route('admin.menu-items.index')
        ->with('success','Menu Item Created Successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MenuItem $menuItem)
    {
        $subFoodCategory=SubFoodCategory::with('status',1)->latest()->get();
        return Inertia::render('Admin/MenuItem/Edit',[
            'subFoodCategory'=>$subFoodCategory,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMenuItemRequest $request, MenuItem $menuItem)
    {

        $data = $request->validated();

        if ($request->hasFile('image')) {

            if ($menuItem->getRawOriginal('image') && Storage::disk('public')->exists($menuItem->getRawOriginal('image'))) {
                Storage::disk('public')->delete($menuItem->getRawOriginal('image'));
            }

            $path = $request->file('image')->store('menuItem', 'public');
            $data['image'] = $path;
        } else {

            $data['image'] = $menuItem->getRawOriginal('image');
        }

        $menuItem->update($data);
        return to_route('admin.menu-items.index')
        ->with('success','Menu Item updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MenuItem $menuItem)
    {
        $imagePath = $menuItem->getRawOriginal('image');
        if ($imagePath && Storage::disk('public')->exists($imagePath)) {
            Storage::disk('public')->delete($imagePath);
        }
        $menuItem->delete();
        return back()
        ->with('success','Menu Item deleted Sucessfully');
    }

    public function updateStatus(MenuItem $menuItem)
    {
        $menuItem->update([
            'status'=>!$menuItem->status,
        ]);
        return back()
        ->with('success','Menu Item updated sucessfully');

    }
}
