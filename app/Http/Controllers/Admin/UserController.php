<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\User\StoreUserRequest;
use App\Http\Requests\Admin\User\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users=User::with('roles')->latest()->paginate(7);
        return Inertia::render('Admin/Setting/User/Index',[
            'users'=>$users
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $roles=Role::orderby('name', 'asc')->get();
        return Inertia::render('Admin/Setting/User/Create',[
            'roles'=>$roles
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        // dd($request->all());
        $user=User::create(array_merge(
            $request->validated(),
            ['password' => bcrypt($request->password)]
        ));
        $roles = Role::whereIn('id', $request->role)->pluck('name')->toArray();
        $user->syncRoles($roles);

        return to_route('admin.users.index')->with('success', 'User created successfully.');
    }



    public function show(User $user)
    {
        $user->load('roles');

        return Inertia::render('Admin/Setting/User/Show',[
         'user'=>$user
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        $roles = Role::orderBy('name', 'ASC')->get();
        $hasRoles = $user->roles->pluck('name')->toArray();
        return Inertia::render('Admin/Setting/User/Edit', [
            'user' => $user,
            'roles' => $roles,
            'hasRoles' => $hasRoles,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();

        // If password is filled, hash it, otherwise remove from update
        if (!empty($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        } else {
            unset($data['password']);
        }

        $user->update($data);

        // Sync roles
        $roles = Role::whereIn('id', $request->role)->pluck('name')->toArray();
        $user->syncRoles($roles);

        return to_route('admin.users.index')->with('success', 'User updated successfully.');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {

        if ($user->id == Auth::user()->id) {

            return back()->with('error', 'You cannot delete yourself.');
        }
        if ($user->hasRole('Super Admin')) {
            return back()->with('toast', [
                'type' => 'error',
                'message' => 'You cannot delete Super Admin.'
            ]);
        }
        if ($user->status === 1) {
            return back()->with('toast', [
                'type' => 'error',
                'message' => 'User deleted successfully.'
            ]);
        }
        $user->delete();
        return back();
    }
}
