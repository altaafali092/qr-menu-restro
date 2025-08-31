<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class AuthSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
     public function run(): void
    {
        {
            // Create or get superadmin role
            $superAdminRole = Role::updateOrCreate(['name' => 'superadmin']);

            // Create superadmin user
            $user = User::updateOrCreate(
                ['email' => 'admin@admin.com'],
                [
                    'name' => 'Super Admin',
                    'password' => Hash::make('password')
                ]
            );

            // Assign role to user
            $user->assignRole($superAdminRole);

            // Give all permissions to superadmin role
            $permissions = Permission::all(); // Make sure PermissionSeeder runs first
            $superAdminRole->syncPermissions($permissions);
        }

    }
}
