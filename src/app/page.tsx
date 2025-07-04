import { ProductCard } from '@/components/product-card';
import { perfumes } from '@/lib/perfumes';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <section className="py-20 text-center sm:py-32">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Find Your Signature Scent
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Explore our exclusive collection of handcrafted perfumes, designed to captivate the senses and express your unique identity.
        </p>
        <div className="mt-8">
            <Button asChild size="lg">
              <Link href="#products">Explore Collection</Link>
            </Button>
        </div>
      </section>

      <section id="products" className="py-12">
        <h2 className="font-headline text-3xl font-bold text-center mb-12">Our Collection</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {perfumes.map((perfume) => (
            <ProductCard key={perfume.id} perfume={perfume} />
          ))}
        </div>
      </section>
    </div>
  );
}
