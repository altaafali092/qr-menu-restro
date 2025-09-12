<?php

namespace App\Models\Admin;

use App\Traits\FileTrait;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MenuItem extends Model
{
    use HasFactory,FileTrait;
    protected $fillable=[
        'sub_food_category_id',
        'name',
        'description',
        'price',
        'image',
        'status',

    ];
    protected $casts=[
        'status'=>'boolean',
    ];

    public function image(): Attribute
    {
        return $this->castingFile(defaultPath: 'Menu Items');
    }
    public function subFoodCategory(): BelongsTo
    {
        return $this->belongsTo(SubFoodCategory::class); // ✅ Fixed
    }
}


