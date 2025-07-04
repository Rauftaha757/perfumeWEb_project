'use client';

import { perfumes } from '@/lib/perfumes';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useCart } from '@/contexts/cart-context';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck } from 'lucide-react';

export default function PerfumePage({ params }: { params: { id: string } }) {
  const perfume = perfumes.find((p) => p.id === parseInt(params.id));
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const { addToCart } = useCart();

  if (!perfume) {
    notFound();
  }

  const handleAddToCart = () => {
    if (perfume && selectedSize) {
      addToCart(perfume, selectedSize);
    } else {
        alert("Please select a size.");
    }
  };
  
  if (!selectedSize && perfume.sizes.length > 0) {
      setSelectedSize(perfume.sizes[0]);
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div className="aspect-square w-full">
          <Image
            src={perfume.image}
            alt={perfume.name}
            data-ai-hint={perfume.dataAiHint}
            width={800}
            height={800}
            className="rounded-lg object-cover shadow-xl"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {perfume.name}
          </h1>
          <p className="mt-4 text-2xl font-semibold text-primary">${perfume.price.toFixed(2)}</p>
          <p className="mt-6 text-base text-muted-foreground">{perfume.description}</p>
          
          <div className="mt-8">
            <h3 className="text-lg font-medium">Scent Notes</h3>
            <div className="mt-2 flex flex-wrap gap-2">
                {perfume.notes.map(note => (
                    <Badge key={note} variant="secondary">{note}</Badge>
                ))}
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium">Size</h3>
            <RadioGroup value={selectedSize || ''} onValueChange={setSelectedSize} className="mt-4 flex gap-4">
              {perfume.sizes.map((size) => (
                <Label
                  key={size}
                  htmlFor={`size-${size}`}
                  className={cn(
                    'flex cursor-pointer items-center justify-center rounded-md border-2 px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                    selectedSize === size ? 'border-primary bg-primary/10 text-primary' : 'border-border'
                  )}
                >
                  <RadioGroupItem value={size} id={`size-${size}`} className="sr-only" />
                  {size}
                </Label>
              ))}
            </RadioGroup>
          </div>

          <div className="mt-8">
            <Button size="lg" className="w-full" onClick={handleAddToCart} disabled={!selectedSize}>
              Add to Cart
            </Button>
          </div>
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-green-600" />
              <span>Secure Transaction &amp; Fast Shipping</span>
          </div>
        </div>
      </div>
    </div>
  );
}
