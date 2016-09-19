<?php

use Illuminate\Database\Seeder;
use App\Models\Category;

class HCategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $names = [
            'Movies', 'Music',
            'Travels', 'Sport', 'Hobby',
            'Literature', 'Miscellaneous',
        ];
        foreach ($names as $name) {
            $slug = str_slug($name, '-');
            Category::create(['name' => $name, 'slug' => $slug]);
        }
    }
}
