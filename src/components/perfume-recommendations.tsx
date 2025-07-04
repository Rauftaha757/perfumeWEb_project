'use client'

import { perfumeRecommendation } from "@/ai/flows/perfume-recommendation"
import { useCart } from "@/contexts/cart-context"
import { perfumes } from "@/lib/perfumes"
import { Bot, ThumbsUp } from "lucide-react"
import { useEffect, useState } from "react"
import { Skeleton } from "./ui/skeleton"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"

export function PerfumeRecommendations() {
    const { cartItems } = useCart()
    const [recommendations, setRecommendations] = useState<string[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (cartItems.length > 0) {
            setLoading(true)
            const cartPerfumeNames = cartItems.map(item => item.name)
            perfumeRecommendation({ cartItems: cartPerfumeNames })
                .then(res => {
                    setRecommendations(res.recommendations)
                })
                .catch(console.error)
                .finally(() => setLoading(false))
        } else {
            setRecommendations([])
        }
    }, [cartItems])

    const recommendedPerfumes = perfumes.filter(p => recommendations.includes(p.name))

    if (cartItems.length === 0) return null;

    return (
        <div>
            <h4 className="flex items-center gap-2 font-semibold text-md mb-4">
                <Bot className="h-5 w-5 text-primary" />
                You Might Also Like
            </h4>
            {loading && (
                <div className="space-y-4">
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="flex items-center gap-4">
                            <Skeleton className="h-16 w-16 rounded" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {!loading && recommendedPerfumes.length > 0 && (
                <div className="space-y-4">
                    {recommendedPerfumes.map(perfume => (
                        <div key={perfume.id} className="flex items-center justify-between gap-4">
                            <Link href={`/perfume/${perfume.id}`} className="flex items-center gap-4 group">
                                <Image src={perfume.image} alt={perfume.name} width={64} height={64} className="rounded-md" />
                                <div>
                                    <p className="font-medium group-hover:underline">{perfume.name}</p>
                                    <p className="text-sm text-muted-foreground">${perfume.price.toFixed(2)}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
            {!loading && recommendations.length > 0 && recommendedPerfumes.length === 0 && (
                 <p className="text-sm text-muted-foreground">Couldn't find specific recommendations, but explore our collection!</p>
            )}
             {!loading && recommendations.length === 0 && (
                 <p className="text-sm text-muted-foreground">No recommendations for now. Explore our full collection!</p>
            )}
        </div>
    )
}
