<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

$factory->define(App\Models\User::class, function (Faker\Generator $faker) {
    return [
        'first_name' => $faker->firstName,
        'last_name' => $faker->lastName,
        'display_name' => $faker->unique()->userName,
        'email' => $faker->safeEmail,
        'reputation' => $faker->numberBetween(0, 1000),
        'status_id' => App\Models\Status::all()->random(1)->id,
        'last_visit_at' => $faker->dateTimeThisYear
    ];
});

$factory->define(App\Models\Topic::class, function (Faker\Generator $faker) {
    return [
        'reviewed_number' => $faker->numberBetween(0, 1000),
        'name' => $faker->unique()->sentence,
        'description' => $faker->sentence,
        'rating' => $faker->numberBetween(0, 1000),
        'user_id' => App\Models\User::all()->random(1)->id,
        'category_id' => App\Models\Category::all()->random(1)->id
    ];
});

$factory->define(App\Models\Comment::class, function (Faker\Generator $faker) {
    return [
        'content_origin' => $faker->text,
        'rating' => $faker->numberBetween(0, 1000),
        'content_generated' => $faker->text,
        'user_id' => App\Models\User::all()->random(1)->id
    ];
});

$factory->define(App\Models\Message::class, function (Faker\Generator $faker) {
    $from_id = App\Models\User::all()->random(1)->id;
    $to_id = App\Models\User::all()->except($from_id)->random(1)->id;


    return [
        'user_from_id' => $from_id,
        'user_to_id' => $to_id,
        'message' => $faker->text,
        'is_read' => $faker->numberBetween(0, 1)
    ];
});

$factory->define(App\Models\Vote::class, function (Faker\Generator $faker) {
    return [
        'title' => $faker->word,
        'is_public' => $faker->numberBetween(0, 1),
        'is_saved' => $faker->numberBetween(0, 1),
        'user_id' => App\Models\User::all()->random(1)->id,
        'finished_at' => date('Y:m:d H:m:s', strtotime('+' . $faker->numberBetween(5, 15) . ' days'))
    ];
});

$factory->define(App\Models\VoteItem::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->unique()->sentence
    ];
});

$factory->define(App\Models\Tag::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->unique()->word
    ];
});

$factory->define(App\Models\Category::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->unique()->word
    ];
});

$factory->define(App\Models\Notification::class, function () {
    return [
        'user_id' => App\Models\User::all()->random(1)->id
    ];
});

$factory->define(App\Models\Like::class, function (Faker\Generator $faker) {
    return [];
});
