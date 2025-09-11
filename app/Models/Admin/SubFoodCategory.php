<?php

namespace App\Models\Admin;

use App\Traits\FileTrait;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class SubFoodCategory extends Model
{
    use HasFactory,SoftDeletes,FileTrait;
    protected $fillable=[
        'food_category_id',
        'name',
        'image',
        'status',
        'description',
    ];
    protected $casts=[
        'status' => 'boolean',
    ];

    public function image(): Attribute
    {
        return $this->castingFile(defaultPath: 'SubFoodCategory');
    }
    public function foodCategory(): BelongsTo
    {
        return $this->belongsTo(foodCategory::class);
    }
}
