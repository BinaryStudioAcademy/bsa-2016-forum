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
                'source' => 'sluggableurl'
            ]
        ];
    }

    public function getSluggableUrlAttribute() {
        $id = (!empty($this->id)) ? $this->id : static::orderBy('id', 'desc')->first()->id + 1;

        if (!empty($this->name)) {
            $slugFrom = $this->name;
        } else if (!empty($this->title)) {
            $slugFrom = $this->title;
        }

        if (is_numeric($slugFrom) === false) {
            return  $slugFrom;
        }

        return $slugFrom . ' ' . $id;
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
