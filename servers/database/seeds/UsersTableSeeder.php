<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->delete();

        DB::table('users')->insert(
            [
                'name' => 'Admin',
                'email' => 'admin@app.com',
                'address' => 'admin address',
                'role' => 'Admin',
                'phone' => '087727832938',
                'password' => bcrypt('password')
            ],
        );

        DB::table('users')->insert(
            [
                'name' => 'Pegawai',
                'email' => 'pegawai@app.com',
                'address' => 'pegawai address',
                'role' => 'Pegawai',
                'phone' => '087727832938',
                'password' => bcrypt('password')
            ],
        );

        DB::table('users')->insert(
            [
                'name' => 'Pengelola',
                'email' => 'pengelola@app.com',
                'address' => 'pegawai address',
                'role' => 'Pengelola',
                'phone' => '087727832938',
                'password' => bcrypt('password')
            ],
        );
    }
}
