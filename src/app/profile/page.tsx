'use client';

import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { User } from 'lucide-react';

export default function ProfilePage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
        <div className="container mx-auto max-w-lg py-12">
            <Card>
                <CardHeader className="items-center text-center">
                    <Skeleton className="h-24 w-24 rounded-full" />
                    <Skeleton className="h-6 w-48 mt-4" />
                    <Skeleton className="h-4 w-56 mt-2" />
                </CardHeader>
                <CardContent className="text-center">
                    <Skeleton className="h-10 w-24 mx-auto" />
                </CardContent>
            </Card>
        </div>
    )
  }

  const handleSignOut = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="container mx-auto max-w-lg py-12">
      <Card>
        <CardHeader className="items-center text-center">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
            <AvatarFallback className="text-3xl">
              {user.email ? user.email.charAt(0).toUpperCase() : <User />}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="mt-4 text-2xl font-headline">
            {user.displayName || 'Welcome'}
          </CardTitle>
          <CardDescription>{user.email}</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button onClick={handleSignOut}>Log Out</Button>
        </CardContent>
      </Card>
    </div>
  );
}
