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
        'first_name' => $faker->firstNameMale,
        'last_name' => $faker->lastName,
        'display_name' => $faker->unique()->userName,
        'email' => $faker->safeEmail,
        'reputation' => $faker->numberBetween(0, 1000),
        'last_visit_at' => $faker->dateTimeThisYear
    ];
});

$factory->define(App\Models\Topic::class, function (Faker\Generator $faker) {
//    $name = $faker->unique()->sentence;
//    $slug = str_slug($name, '-');

    return [
        'reviewed_number' => $faker->numberBetween(0, 50),
//        'name' => $name,
//        'description' => $faker->sentence,
//        'generated_description' => $faker->text,
        'rating' => $faker->numberBetween(0, 100),
//        'slug' => $slug,
    ];
});

$factory->define(App\Models\Comment::class, function (Faker\Generator $faker) {
    return [
//        'content_origin' => $faker->text,
        'rating' => $faker->numberBetween(0, 100),
//        'content_generated' => $faker->text,
    ];
});

//$factory->define(App\Models\Message::class, function (Faker\Generator $faker) {
//    return [
//        'message' => $faker->text,
//        'is_read' => $faker->numberBetween(0, 1)
//    ];
//});

$factory->define(App\Models\Vote::class, function (Faker\Generator $faker) {
//    $title = $faker->unique()->word;
//    $slug = str_slug($title, '-');

//    return [
//        'title' => $title,
//        'description' => $faker->paragraph,
//        'description_generated' => $faker->paragraph,
//        'is_public' => $faker->numberBetween(0, 1),
//        'is_saved' => $faker->numberBetween(0, 1),
//        'finished_at' => date('Y:m:d H:m:s', strtotime('+' . $faker->numberBetween(5, 15) . ' days')),
//        'slug' => $slug
//    ];

    return [
//        'is_public' => $faker->numberBetween(0, 1),
//        'is_single' => rand(0, 1),
        'is_saved' => 1,
        'finished_at' => date('Y:m:d H:i:s', strtotime(
                '+' .
                rand(-10, 10) . ' days ' .
                rand(1, 23) . ' hours ' .
                rand(0, 59) . ' minutes ' .
                rand(1, 59) . ' seconds'
            )
        ),
//        'slug' => $slug
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
    $name = $faker->unique()->word . ' ' . $faker->unique()->word;
    $slug = str_slug($name, '-');

    return [
        'name' => $name,
        'slug' => $slug
    ];
});
