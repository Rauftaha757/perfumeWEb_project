'use client';

import Link from 'next/link';
import { Search, ShoppingBag, Bot } from 'lucide-react';
import { Button } from './ui/button';
import { useCart } from '@/contexts/cart-context';
import { UserNav } from './user-nav';
import { perfumes } from '@/lib/perfumes';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import Image from 'next/image';

export function Header() {
  const { cartCount, setIsCartOpen } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const filteredPerfumes = searchQuery
    ? perfumes.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.notes.some(n => n.toLowerCase().includes(searchQuery.toLowerCase())))
    : [];
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setIsPopoverOpen(!!query);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Bot className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block font-headline text-lg">
              Scentique
            </span>
          </Link>
        </div>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
             <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <PopoverTrigger asChild>
                <form className="w-full">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                      placeholder="Search perfumes..."
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-8"
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                  </div>
                </form>
              </PopoverTrigger>
              <PopoverContent className="w-[--radix-popover-trigger-width] mt-1 p-0">
                {filteredPerfumes.length > 0 ? (
                  <div className="py-2">
                    {filteredPerfumes.map(perfume => (
                      <Link key={perfume.id} href={`/perfume/${perfume.id}`} className="flex items-center gap-4 px-4 py-2 hover:bg-muted" onClick={() => setIsPopoverOpen(false)}>
                        <Image src={perfume.image} alt={perfume.name} width={40} height={40} className="rounded" />
                        <span className="font-medium">{perfume.name}</span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="p-4 text-sm text-muted-foreground">No results found.</p>
                )}
              </PopoverContent>
            </Popover>
          </div>

          <nav className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCartOpen(true)}
              aria-label={`Shopping cart with ${cartCount} items`}
              className="relative"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {cartCount}
                </span>
              )}
            </Button>
            <UserNav />
          </nav>
        </div>
      </div>
    </header>
  );
}
