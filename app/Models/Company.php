<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'companies';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'postcode',
        'prefecture_id',
        'city',
        'local',
        'street_address',
        'business_hour',
        'regular_holiday',
        'phone',
        'fax',
        'url',
        'license_number',
        'image',
    ];

    /**
     * Get the prefecture associated with the company.
     */
    public function prefecture()
    {
        return $this->belongsTo(Prefecture::class);
    }
}
