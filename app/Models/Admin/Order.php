<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    use HasFactory;
    protected $fillable = [
        'table_id',
        'status',
        'subtotal_cents',
        'service_charge_cents',
        'tax_cents',
        'total_cents',
        'customer_name',
        'customer_phone',
        'payment_status',
        'meta'
    ];
    protected $casts = ['meta' => 'array'];

    public function table():BelongsTo
    {
        return $this->belongsTo(Table::class);
    }
    public function items():HasMany
    {
        return $this->hasMany(OrderItem::class);
    }
}
