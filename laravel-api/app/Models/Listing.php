<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Listing extends Model
{
    use HasFactory;

    protected $fillable = [
        'property_id',
        'agent_id',
        'title',
        'price'
    ];

    protected $casts = [
        'price' => 'float',
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    /**
     * Get the property associated with the listing.
     */
    public function property(): BelongsTo
    {
        return $this->belongsTo(Property::class);
    }

    /**
     * Get the agent associated with the listing.
     */
    public function agent(): BelongsTo
    {
        return $this->belongsTo(Agent::class);
    }
}
