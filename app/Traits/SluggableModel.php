<?php
namespace App\Traits;

use Cviebrock\EloquentSluggable\Sluggable;

/**
 * Class SlugIdModel
 */
trait SluggableModel
{
    use Sluggable;

    public static function getSluggableModel($id) {
        if (is_numeric($id) === false) {
            return  static::where('slug', '=', $id)->firstOrFail();
        }

        return static::findOrFail($id);
    }

    /**
     * Return the sluggable configuration array for this model.
     *
     * @return array
     */
    public function sluggable()
    {
        return [
            'slug' => [
                'source' => 'name'
            ]
        ];
    }

    /**
     * Get the route key for the model.
     *
     * @return string
     */
    public function getRouteKeyName()
    {
        return 'slug';
    }
}
