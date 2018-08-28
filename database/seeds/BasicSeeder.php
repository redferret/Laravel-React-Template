<?php

use Illuminate\Database\Seeder;

class BasicSeeder extends Seeder {
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
      App\User::create([
        'name'=>'Secret User',
        'email'=>'TestEmail@gmail.com',
        'password'=>bcrypt('secret')
      ]);

      // Add additional seeding below
    }
}
