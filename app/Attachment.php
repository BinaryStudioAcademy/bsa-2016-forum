<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Attachment extends Model
{
    use SoftDeletes;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'description'];

    /**
     * Get all of the topics that have this attachment
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphToMany
     */
    public function topics()
    {
        return $this->morphedByMany('App\Topic', 'attachmenttable');
    }

    /**
     * Get all of the votes that have this attachment
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphToMany
     */
    public function votes()
    {
        return $this->morphedByMany('App\Vote', 'attachmenttable');
    }

    /**
     * Get all of the comments that have this attachment
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphToMany
     */
    public function comments()
    {
        return $this->morphedByMany('App\Comment', 'attachmenttable');
    }

    /**
     * Get all of the messages that have this attachment
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphToMany
     */
    public function messages()
    {
        return $this->morphedByMany('App\Message', 'attachmenttable');
    }

}
