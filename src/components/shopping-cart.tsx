'use client';

import { useCart } from '@/contexts/cart-context';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import Image from 'next/image';
import { Trash2, Minus, Plus } from 'lucide-react';
import Link from 'next/link';
import { Separator } from './ui/separator';
import { PerfumeRecommendations } from './perfume-recommendations';

export function ShoppingCart() {
  const { cartItems, removeFromCart, updateQuantity, subtotal, isCartOpen, setIsCartOpen, clearCart } = useCart();

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-6">
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        {cartItems.length > 0 ? (
          <>
            <ScrollArea className="flex-1">
              <div className="px-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-start justify-between gap-4 py-4">
                    <div className="flex items-center gap-4">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="rounded-md object-cover"
                      />
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.size}</p>
                        <p className="text-sm font-medium">${item.price.toFixed(2)}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-muted-foreground" onClick={() => removeFromCart(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <div className="px-6">
                <PerfumeRecommendations />
              </div>
            </ScrollArea>
            <SheetFooter className="px-6 py-4 bg-background border-t">
              <div className="w-full space-y-4">
                <div className="flex justify-between font-semibold">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-muted-foreground">Shipping and taxes calculated at checkout.</p>
                <SheetClose asChild>
                  <Button asChild className="w-full">
                    <Link href="#">Proceed to Checkout</Link>
                  </Button>
                </SheetClose>
                 <Button variant="outline" className="w-full" onClick={clearCart}>Clear Cart</Button>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <h3 className="text-lg font-medium">Your cart is empty</h3>
            <p className="text-sm text-muted-foreground">Add some perfumes to get started.</p>
            <SheetClose asChild>
              <Button asChild>
                <Link href="/">Continue Shopping</Link>
              </Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
