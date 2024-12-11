<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostCode extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'post_codes';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'public_body_code',
        'old_postcode',
        'postcode',
        'prefecture_kana',
        'city_kana',
        'local_kana',
        'prefecture',
        'city',
        'local',
        'indicator_1',
        'indicator_2',
        'indicator_3',
        'indicator_4',
        'indicator_5',
        'indicator_6',
    ];

    /**
     * Define any relationships if needed.
     */
    public function prefecture()
    {
        return $this->belongsTo(Prefecture::class, 'prefecture', 'display_name');
    }
}
