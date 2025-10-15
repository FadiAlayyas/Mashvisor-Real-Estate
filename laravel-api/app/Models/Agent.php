<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Agent extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone'
    ];

    protected $casts = [
        'created_at' => 'datetime'
    ];

    /**
     * Get the listings for the agent.
     */
    public function listings(): HasMany
    {
        return $this->hasMany(Listing::class);
    }
}
