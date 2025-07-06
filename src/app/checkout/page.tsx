'use client';

import { useCart } from '@/contexts/cart-context';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Image from 'next/image';
import { useEffect } from 'react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  address: z.string().min(5, { message: 'Please enter a valid address.' }),
  city: z.string().min(2, { message: 'Please enter a valid city.' }),
  zip: z.string().min(5, { message: 'Please enter a valid zip code.' }),
});

export default function CheckoutPage() {
  const { cartItems, subtotal, clearCart, setIsCartOpen } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    setIsCartOpen(false);
  }, [setIsCartOpen]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      address: '',
      city: '',
      zip: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (cartItems.length === 0) {
      toast({
        variant: 'destructive',
        title: 'Your cart is empty',
        description: 'Add items to your cart before checking out.',
      });
      return;
    }

    try {
      await addDoc(collection(db, 'orders'), {
        userId: user?.uid || null,
        email: user?.email || 'guest',
        shippingAddress: values,
        items: cartItems.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            size: item.size
        })),
        subtotal: subtotal,
        status: 'pending',
        createdAt: serverTimestamp(),
      });

      toast({
        title: 'Order Placed!',
        description: 'Thank you for your purchase. We will process your order shortly.',
      });

      clearCart();
      router.push('/profile');
    } catch (error) {
      console.error('Error placing order:', error);
      toast({
        variant: 'destructive',
        title: 'Order Failed',
        description: 'There was a problem placing your order. Please try again.',
      });
    }
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-center mb-12">
        Checkout
      </h1>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street Address</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Perfume Lane" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="New York" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="zip"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Zip Code</FormLabel>
                          <FormControl>
                            <Input placeholder="10001" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                   <Button type="submit" className="w-full mt-6" size="lg" disabled={cartItems.length === 0 || form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? 'Placing Order...' : `Place Order ($${subtotal.toFixed(2)})`}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              {cartItems.length > 0 ? (
                <div className="space-y-4">
                  {cartItems.map(item => (
                    <div key={`${item.id}-${item.size}`} className="flex items-center justify-between">
                       <div className="flex items-center gap-4">
                            <Image src={item.image} alt={item.name} width={64} height={64} className="rounded-md" />
                            <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-muted-foreground">
                                    {item.size} &times; {item.quantity}
                                </p>
                            </div>
                        </div>
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <p>Subtotal</p>
                    <p>${subtotal.toFixed(2)}</p>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">Your cart is empty.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
