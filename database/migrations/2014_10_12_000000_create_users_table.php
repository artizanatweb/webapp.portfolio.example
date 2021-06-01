<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\User;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * composer require laravel/passport
     * php artisan migrate
     * php artisan passport:install
     * php artisan passport:client --password
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name', 250);
            $table->string('surname', 250);
            $table->string('email', 250)->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password', 250);
            $table->integer('user_type_id')->default(2);
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }

    private function populate()
    {
        User::create([
            'name' => 'Admin',
            'surname' => 'User',
            'email' => env('ADMIN_CREDENTIALS_EMAIL'),
            'password' => Hash::make(env('ADMIN_CREDENTIALS_PASSWD')),
            'user_type_id' => 1,
        ]);
    }
}
