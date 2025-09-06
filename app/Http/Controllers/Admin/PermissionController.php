<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Permission\StorePermissionRequest;
use App\Http\Requests\Admin\Permission\UpdatePermissionRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (!Auth::user()->can('view permission')) {
            return back()->with('error','You are not allowed to access Project.');
        }
        $permissions = Permission::latest()->paginate(6);
        return Inertia::render('Admin/Setting/Permission/Index', [
            'permissions' => $permissions,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        if (!Auth::user()->can('create permission')) {
            return back()->with('error','You are not allowed to access Project.');
        }
        return Inertia::render('Admin/Setting/Permission/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePermissionRequest $request)
    {
        if (!Auth::user()->can('create permission')) {
            return back()->with('error','You are not allowed to access Project.');
        }
        Permission::create($request->validated());
        return to_route('admin.permissions.index')
            ->with('success', 'Permission created successfully');
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
    public function edit(Permission $permission)
    {
        if (!Auth::user()->can('edit permission')) {
            return back()->with('error','You are not allowed to access Project.');
        }
        return Inertia::render('Admin/Setting/Permission/Edit', [
            'permission' => $permission,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePermissionRequest $request, Permission $permission)
    {
        if (!Auth::user()->can('create permission')) {
            return back()->with('error','You are not allowed to access Project.');
        }
        $permission->update($request->validated());
        return to_route('admin.permissions.index')
            ->with('success', 'Permission updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(permission $permission)
    {
        if (!Auth::user()->can('delete permission')) {
            return back()->with('error','You are not allowed to access Project.');
        }
        $permission->delete();

        return back()->with('success', 'permission deteled');
    }
}
