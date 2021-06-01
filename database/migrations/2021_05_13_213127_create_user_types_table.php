<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\UserType;

class CreateUserTypesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * php artisan migrate:refresh --path=database/migrations/2021_02_21_002525_create_companies_table.php
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_types', function (Blueprint $table) {
            $table->id();
            $table->string('code', 250)->unique();
            $table->string('name', 250);
            $table->timestamps();
        });

        $this->populate();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_types');
    }

    /**
     * Populate table with default platform values
     *
     * @return void
     */
    private function populate()
    {
        UserType::create([
            'id' => 1,
            'code' => 'admin',
            'name' => 'Admin user'
        ]);

        UserType::create([
            'id' => 2,
            'code' => 'client',
            'name' => 'Client user'
        ]);
    }
}
