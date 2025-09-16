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

    public function show(Table $table)
    {
        return  Inertia::render('Admin/Table/Show', [
            'table' => $table,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Table $table)
    {
        return Inertia::render('Admin/Table/Edit', [
            'table' => $table,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTableRequest $request, Table $table)
    {
        $table->update($request->validated());

        if ($table->wasChanged('name') || !$table->qr_code_path) {
            $table->generateQrCode();
        }

        return to_route('admin.tables.index')
            ->with('success', 'Table updated successfully');
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
