<?php

namespace App\Http\Controllers;

use App\Models\Admin\MenuItem;
use CartService;
use Illuminate\Http\Request;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(CartService $cartService)
    {

        dd($cartService);
        // $cartItems = $cartService->getCartItems();
        // return response()->json($cartItems);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, CartService $cartService, MenuItem $menuItem)
    {
        $request->mergeIfMissing([
            'menu_item' => $menuItem->id,
        ]);

        $data = $request->validate([
            'menu_item' => ['required', 'exists:menu_items,id'],
            'quantity' => ['required', 'integer', 'min:1'],
        ]);
        $cartService->addItemToCart(
            $menuItem,
            $data['quantity'],
            $request
        );
        return back()->with('success', 'Item added to cart');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CartService $cartService, MenuItem $menuItem, int $quantity)
    {

        $request->validate([
            'quantity' => ['required', 'integer', 'min:1'],
        ]);
        $cartService->updateCartItem($menuItem, $quantity);
        return back()->with('success', 'Cart item updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy( CartService $cartService, MenuItem $menuItem)
    {
        $cartService->removeFromCart($menuItem);
        return back()->with('success', 'Item removed from cart');
    }
}
