<?php

namespace App\Models\Admin;

use App\Traits\FileTrait;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class FoodCategory extends Model
{
    use HasFactory,SoftDeletes,FileTrait;

    protected $fillable=[
        'name',
        'image',
        'description',
        'status',

    ];
    protected $casts = [
        'status' => 'boolean',
    ];

    public function image(): Attribute
    {
        return $this->castingFile(defaultPath: 'FoodCategory');
    }

    public function subFoodCategories(): HasMany
    {
        return $this->hasMany(SubFoodCategory::class, 'food_category_id');
    }

}
