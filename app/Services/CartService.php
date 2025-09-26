<?php

use App\Models\Admin\MenuItem;
use App\Models\CartItem;
use Illuminate\Http\Request;

class CartService
{
    public function addItemToCart(MenuItem $menuItem, int $quantity =1,$request )
    {
        $cartItem = new CartItem();
        $cartItem->menu_item_id = $menuItem->id;
        $cartItem->quantity = $request->quantity;
        $cartItem->save();
    }
    public function updateCartItem(MenuItem $menuItem, int $quantity)
    {
       //
    }
    public function removeFromCart(MenuItem $menuItem)
    {
        $cartItem = CartItem::where('menu_item_id', $menuItem->id)->first();
        if ($cartItem) {
            $cartItem->delete();
        }
    }

}