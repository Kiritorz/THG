import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import ReactCardFlip from 'react-card-flip';

const pokerCardVariants = cva(
    "inline-flex items-center rounded-lg border cursor-pointer px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            variant: {
                default:
                    "border-l-gray-400 border-t-gray-400 border-r-gray-600 border-b-gray-600 border-2 bg-gray-100 text-gray-700",
                secondary:
                    "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
                destructive:
                    "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
                outline: "text-foreground",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

const rankMap: { [key: number]: string } = {
    1: 'A',
    11: 'J',
    12: 'Q',
    13: 'K',
}

export const Rank = (rank: number) => rankMap[rank] || rank
export const Suit = (suit: string) => {
    switch (suit) {
        case 'hearts':
            return '♥'
        case 'diamonds':
            return '♦'
        case 'clubs':
            return '♣'
        default:
            return '♠'
    }
}
export const SuitColor = (suit: string) => {
    switch (suit) {
        case 'hearts':
        case 'diamonds':
            return 'text-red-500'
        default:
            return 'text-black'
    }
}

export interface PokerCardProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pokerCardVariants> {
    suit: 'hearts' | 'diamonds' | 'clubs' | 'spades',
    rank: number,
    isFlipped: boolean
}

function PokerCard({ className, variant, suit, rank, isFlipped, ...props }: PokerCardProps) {
    return (
        <ReactCardFlip isFlipped={isFlipped}>
            <div className={cn(pokerCardVariants({ variant }), className, 'w-14 h-20 md:w-20 md:h-28')} {...props}>
                <div className={`flex flex-col items-center justify-center w-full gap-0 md:gap-4`}>
                    <div className={`text-3xl md:text-4xl`}>{Rank(rank)}</div>
                    <div className={`text-xl md:text-2xl font-sans ${SuitColor(suit)}`}>{Suit(suit)}</div>
                </div>
            </div>
            <div className={cn(pokerCardVariants({ variant }), className, 'w-14 h-20 md:w-20 md:h-28 bg-gray-500')} {...props}>
                <div className={`flex justify-center items-end pb-2`}>
                </div>
            </div>
        </ReactCardFlip>
    )
}

export { PokerCard, pokerCardVariants }
