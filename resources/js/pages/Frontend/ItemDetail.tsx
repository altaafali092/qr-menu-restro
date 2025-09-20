import React, { useState } from "react";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { MenuItem } from "@/types/Frontend";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface MenuItemProps {
  menuItem: MenuItem;
}

const ItemDetail = ({ menuItem }: MenuItemProps) => {
  const [quantity, setQuantity] = useState(1);

  // Convert single image to array or use multiple if available
  // You can modify this based on your actual data structure

  
  const goBack = () => window.history.back();

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Header */}
      <div className="border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <button
            onClick={goBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image Carousel */}
          <div className="space-y-4">
            <div className="relative">
              {menuItem.image.length > 0 ? (
                <Carousel className="w-full">
                  <CarouselContent>
                    {menuItem.image.map((img, index) => (
                      <CarouselItem key={index}>
                        <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
                          <img
                            src={img}
                            alt={`${menuItem.name} ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {menuItem.image.length > 1 && (
                    <>
                      <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
                      <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
                    </>
                  )}
                </Carousel>
              ) : (
                <div className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-gray-400">No image available</div>
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-light text-gray-900 mb-4">
                {menuItem.name}
              </h1>
              
              {menuItem.description && (
                <p className="text-gray-600 leading-relaxed">
                  {menuItem.description}
                </p>
              )}
            </div>

            {/* Price */}
            <div className="text-2xl font-light text-gray-900">
              ${menuItem.price}
            </div>

            {/* Quantity */}
            <div className="space-y-3">
              <label className="block text-sm text-gray-600">Quantity</label>
              <div className="flex items-center border border-gray-200 rounded-md w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-50 transition-colors"
                  disabled={quantity === 1}
                >
                  −
                </button>
                <div className="px-4 py-2 border-x border-gray-200 min-w-[60px] text-center">
                  {quantity}
                </div>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-gray-50 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <button className="w-full bg-black text-white py-4 px-6 rounded-md hover:bg-gray-900 transition-colors flex items-center justify-center space-x-2">
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart · ${(menuItem.price * quantity).toFixed(2)}</span>
              </button>
              
              <div className="text-sm text-gray-500 text-center">
                Free delivery on orders over $50
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;