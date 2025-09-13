<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Table\StoreTableRequest;
use App\Http\Requests\Admin\Table\UpdateTableRequest;
use App\Models\Admin\MenuItem;
use App\Models\Admin\Table;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TableController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tables = Table::latest()->paginate(7);
        return Inertia::render('Admin/Table/Index', [
            'tables' => $tables,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Table/Create');
    }



    public function store(StoreTableRequest $request)
    {
        $table = Table::create($request->validated());
        $table->generateQrCode();

        return to_route('admin.tables.index')
            ->with('success', 'Table created with QR code!');
    }

    public function show(MenuItem $menuItem)
    {
        return  Inertia::render('Admin/Table/Show', [
            'menuItem' => $menuItem,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MenuItem $menuItem)
    {
        return Inertia::render('Admin/Table/Edit', [
            'menuItem' => $menuItem,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTableRequest $request, MenuItem $menuItem)
    {
        $menuItem->update($request->validated());
        return to_route('admin.menuItems.index')
            ->with('success', 'Menu item updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Table $table)
    {
        $table->delete();
        return back()
            ->with('success', 'Table deleted successfully');
    }

    public function updateStatus(Table $table)
    {
        $table->update([
            'status' => !$table->status,
        ]);
        return  back()
            ->with('success', 'Status updated successfully');
    }
}
