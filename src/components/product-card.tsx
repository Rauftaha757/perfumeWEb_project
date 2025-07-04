import type { Perfume } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';

interface ProductCardProps {
  perfume: Perfume;
}

export function ProductCard({ perfume }: ProductCardProps) {
  return (
    <Link href={`/perfume/${perfume.id}`} className="group">
      <Card className="h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="aspect-square overflow-hidden">
            <Image
              src={perfume.image}
              alt={perfume.name}
              data-ai-hint={perfume.dataAiHint}
              width={600}
              height={600}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="font-headline text-xl font-bold tracking-normal">{perfume.name}</CardTitle>
          <p className="mt-2 text-muted-foreground text-sm">{perfume.notes.join(', ')}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <p className="text-lg font-semibold text-primary">${perfume.price.toFixed(2)}</p>
          <Button variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
