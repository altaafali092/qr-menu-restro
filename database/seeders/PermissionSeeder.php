<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Define permissions
        $permissions = [
            'view users',
            'edit users',
            'delete users',
            'create users',



            //others

            'view staff',
            'edit satff',
            'delete staff',
            'create staff',

            'view role',
            'edit role',
            'delete role',
            'create role',

            'view permission',
            'edit permission',
            'delete permission',
            'create permission',

            'view important call',
            'edit important call',
            'delete important call',
            'create important call',



        ];

        // Create permissions
        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }
    }
}
