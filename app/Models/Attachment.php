<?php

namespace App\Models;

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
    protected $fillable = ['cloud_public_id', 'type', 'url'];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['deleted_at'];
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = ['deleted_at'];
    /**
     * Get all of the topics that have this attachment
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphToMany
     */

    public function topics()
    {
        return $this->morphedByMany(Topic::class, 'attachmenttable');
    }

    /**
     * Get all of the votes that have this attachment
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphToMany
     */
    public function votes()
    {
        return $this->morphedByMany(Vote::class, 'attachmenttable');
    }

    /**
     * Get all of the comments that have this attachment
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphToMany
     */
    public function comments()
    {
        return $this->morphedByMany(Comment::class, 'attachmenttable');
    }

    /**
     * Get all of the messages that have this attachment
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphToMany
     */
    public function messages()
    {
        return $this->morphedByMany(Message::class, 'attachmenttable');
    }

}
