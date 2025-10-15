<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Property extends Model
{
    use HasFactory;

    protected $fillable = [
        'state',
        'city',
        'zip_code',
        'address',
        'beds',
        'baths'
    ];

    protected $casts = [
        'beds' => 'integer',
        'baths' => 'integer',
        'created_at' => 'datetime'
    ];

    /**
     * Get the listings for the property.
     */
    public function listings(): HasMany
    {
        return $this->hasMany(Listing::class);
    }
}
