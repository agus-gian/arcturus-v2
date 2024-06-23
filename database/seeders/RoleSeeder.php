<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // create roles
        Role::create(['name' => 'super-admin']);
        Role::create(['name' => 'transport']);
        Role::create(['name' => 'affiliate']);
        Role::create(['name' => 'travel-agent']);
        Role::create(['name' => 'admin-hotel']);
        Role::create(['name' => 'staff-hotel']);
    }
}
