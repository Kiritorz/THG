"use client"
import { PokerCard } from "@/components/ui/poker-card"
import { useEffect, useState } from "react"
import { MersenneTwister19937, Random } from "random-js"
import { ArrowPathIcon, ForwardIcon } from "@heroicons/react/24/solid"
import { Button } from "@/components/ui/button"

interface Card {
  suit: 'hearts' | 'diamonds' | 'clubs' | 'spades',
  rank: number,
  isFlipped: boolean
}

export default function Home() {

  // Texas Hold'em Poker Card - Game Panel
  // +-- Give player 2 random cards when game starts
  // +-- Give dealer 5 random cards when game starts with all cards hidden

  const Cards: Card[] = [
    { suit: 'hearts', rank: 1, isFlipped: true },
    { suit: 'hearts', rank: 2, isFlipped: true },
    { suit: 'hearts', rank: 3, isFlipped: true },
    { suit: 'hearts', rank: 4, isFlipped: true },
    { suit: 'hearts', rank: 5, isFlipped: true },
    { suit: 'hearts', rank: 6, isFlipped: true },
    { suit: 'hearts', rank: 7, isFlipped: true },
    { suit: 'hearts', rank: 8, isFlipped: true },
    { suit: 'hearts', rank: 9, isFlipped: true },
    { suit: 'hearts', rank: 10, isFlipped: true },
    { suit: 'hearts', rank: 11, isFlipped: true },
    { suit: 'hearts', rank: 12, isFlipped: true },
    { suit: 'hearts', rank: 13, isFlipped: true },
    { suit: 'diamonds', rank: 1, isFlipped: true },
    { suit: 'diamonds', rank: 2, isFlipped: true },
    { suit: 'diamonds', rank: 3, isFlipped: true },
    { suit: 'diamonds', rank: 4, isFlipped: true },
    { suit: 'diamonds', rank: 5, isFlipped: true },
    { suit: 'diamonds', rank: 6, isFlipped: true },
    { suit: 'diamonds', rank: 7, isFlipped: true },
    { suit: 'diamonds', rank: 8, isFlipped: true },
    { suit: 'diamonds', rank: 9, isFlipped: true },
    { suit: 'diamonds', rank: 10, isFlipped: true },
    { suit: 'diamonds', rank: 11, isFlipped: true },
    { suit: 'diamonds', rank: 12, isFlipped: true },
    { suit: 'diamonds', rank: 13, isFlipped: true },
    { suit: 'clubs', rank: 1, isFlipped: true },
    { suit: 'clubs', rank: 2, isFlipped: true },
    { suit: 'clubs', rank: 3, isFlipped: true },
    { suit: 'clubs', rank: 4, isFlipped: true },
    { suit: 'clubs', rank: 5, isFlipped: true },
    { suit: 'clubs', rank: 6, isFlipped: true },
    { suit: 'clubs', rank: 7, isFlipped: true },
    { suit: 'clubs', rank: 8, isFlipped: true },
    { suit: 'clubs', rank: 9, isFlipped: true },
    { suit: 'clubs', rank: 10, isFlipped: true },
    { suit: 'clubs', rank: 11, isFlipped: true },
    { suit: 'clubs', rank: 12, isFlipped: true },
    { suit: 'clubs', rank: 13, isFlipped: true },
    { suit: 'spades', rank: 1, isFlipped: true },
    { suit: 'spades', rank: 2, isFlipped: true },
    { suit: 'spades', rank: 3, isFlipped: true },
    { suit: 'spades', rank: 4, isFlipped: true },
    { suit: 'spades', rank: 5, isFlipped: true },
    { suit: 'spades', rank: 6, isFlipped: true },
    { suit: 'spades', rank: 7, isFlipped: true },
    { suit: 'spades', rank: 8, isFlipped: true },
    { suit: 'spades', rank: 9, isFlipped: true },
    { suit: 'spades', rank: 10, isFlipped: true },
    { suit: 'spades', rank: 11, isFlipped: true },
    { suit: 'spades', rank: 12, isFlipped: true },
    { suit: 'spades', rank: 13, isFlipped: true },
  ]

  const DoubleCards = [...Cards, ...Cards]

  const [player1Cards, setPlayer1Cards] = useState<Card[]>([])
  const [player2Cards, setPlayer2Cards] = useState<Card[]>([])
  const [player3Cards, setPlayer3Cards] = useState<Card[]>([])
  const [player4Cards, setPlayer4Cards] = useState<Card[]>([])

  const [dealerCards, setDealerCards] = useState<Card[]>([])

  // generate 13 numbers (0 - 103) due to the minute seed
  const [seed, setSeed] = useState<number>(0)
  useEffect(() => {
    const now = new Date()
    setSeed(now.getMonth() * 30 * 24 * 360 + now.getDate() * 24 * 360 + now.getHours() * 360 + now.getMinutes() * 6 + Math.floor(now.getSeconds() / 10))
  }, [])

  const generateUniqueRandomNumbers = (seed: number, count: number, min: number, max: number): number[] => {
    console.log('seed:', seed)
    const random = new Random(MersenneTwister19937.seed(seed))

    const uniqueNumbers: Set<number> = new Set()

    while (uniqueNumbers.size < count) {
      const randomNumber = random.integer(min, max)
      uniqueNumbers.add(randomNumber)
    }

    return Array.from(uniqueNumbers)
  }

  const FlipDealerCard = (index: number) => {
    setDealerCards(dealerCards.map((card, i) => i === index ? { ...card, isFlipped: !card.isFlipped } : card))
  }

  const FlipPlayerCard = (index: number, playerIndex: number) => {
    switch (playerIndex) {
      case 1:
        setPlayer1Cards(player1Cards.map((card, i) => i === index ? { ...card, isFlipped: !card.isFlipped } : card))
        break
      case 2:
        setPlayer2Cards(player2Cards.map((card, i) => i === index ? { ...card, isFlipped: !card.isFlipped } : card))
        break
      case 3:
        setPlayer3Cards(player3Cards.map((card, i) => i === index ? { ...card, isFlipped: !card.isFlipped } : card))
        break
      case 4:
        setPlayer4Cards(player4Cards.map((card, i) => i === index ? { ...card, isFlipped: !card.isFlipped } : card))
        break
    }
  }

  useEffect(() => {
    if (seed > 0) {
      const randomNumbers = generateUniqueRandomNumbers(seed, 13, 0, 103)
      setDealerCards([
        DoubleCards[randomNumbers[8]],
        DoubleCards[randomNumbers[9]],
        DoubleCards[randomNumbers[10]],
        DoubleCards[randomNumbers[11]],
        DoubleCards[randomNumbers[12]]
      ])
      setPlayer1Cards([
        DoubleCards[randomNumbers[0]],
        DoubleCards[randomNumbers[1]]
      ])
      setPlayer2Cards([
        DoubleCards[randomNumbers[2]],
        DoubleCards[randomNumbers[3]]
      ])
      setPlayer3Cards([
        DoubleCards[randomNumbers[4]],
        DoubleCards[randomNumbers[5]]
      ])
      setPlayer4Cards([
        DoubleCards[randomNumbers[6]],
        DoubleCards[randomNumbers[7]]
      ])
    }
  }, [seed])

  const [isNextStepAvailable, setIsNextStepAvailable] = useState<boolean>(true)
  const [isArrowPathIconRotated, setIsArrowPathIconRotated] = useState<boolean>(false)

  useEffect(() => {
    // when the 5 of 5 dealer cards are not flipped, the next step is not available
    if (dealerCards.length >= 5) {
      setIsNextStepAvailable(dealerCards[4].isFlipped)
    }
  }, [dealerCards])

  useEffect(() => {
    if (isArrowPathIconRotated) {
      setTimeout(() => {
        setIsArrowPathIconRotated(false)
      }, 1000)
    }
  }, [isArrowPathIconRotated])

  const Header = (
    <div className="font-serif flex gap-1.5 justify-end w-full mb-2">
      <Button size="icon"
        disabled={!isNextStepAvailable}
        onClick={() => {
          if (seed > 0) {
            if (dealerCards[0].isFlipped === true) {
              // flip 3 of 5 dealer cards
              setDealerCards(dealerCards.map((card, i) => i < 3 ? { ...card, isFlipped: !card.isFlipped } : card))
            } else if (dealerCards[3].isFlipped === true) {
              // flip the 4th of dealer cards
              setDealerCards(dealerCards.map((card, i) => i === 3 ? { ...card, isFlipped: !card.isFlipped } : card))
            } else if (dealerCards[4].isFlipped === true) {
              // flip the 5th of dealer cards
              setDealerCards(dealerCards.map((card, i) => i === 4 ? { ...card, isFlipped: !card.isFlipped } : card))
            }
          }
        }}
      >
        <ForwardIcon className={`size-5 my-auto`} />
      </Button>
      <Button size="icon"
        disabled={isArrowPathIconRotated}
        onClick={() => {
          setIsArrowPathIconRotated(true)
          const now = new Date()
          setSeed(now.getMonth() * 30 * 24 * 360 + now.getDate() * 24 * 360 + now.getHours() * 360 + now.getMinutes() * 6 + Math.floor(now.getSeconds() / 10))
        }}
      >
        <ArrowPathIcon className={`size-5 my-auto ${isArrowPathIconRotated ? 'animate-spin' : ''}`} />
      </Button>
    </div>
  )

  const Dealer = (
    <div className="flex flex-col gap-2 mb-28">
      <p className="font-serif font-bold">Dealer</p>
      <div className="mx-auto flex flex-col gap-2 py-2 px-6 rounded-lg border-l-gray-600 border-r-gray-600 border-x-4 bg-gray-300">
        <div className="flex gap-2 justify-center">
          {dealerCards.slice(0, 3).map((card, i) => (
            <PokerCard key={i} suit={card.suit} rank={card.rank} size="sm" isFlipped={card.isFlipped}
              onClick={() => FlipDealerCard(i)}
            />
          ))}
        </div>
        <div className="flex gap-2 justify-center">
          {dealerCards.slice(3, 5).map((card, i) => (
            <PokerCard key={i + 3} suit={card.suit} rank={card.rank} size="sm" isFlipped={card.isFlipped}
              onClick={() => FlipDealerCard(i + 3)}
            />
          ))}
        </div>
      </div>
    </div>
  )

  const Player = (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between gap-2">
        <div className="flex flex-col gap-2">
          <p className="font-serif font-bold">Player #1</p>
          <div className="mx-auto flex gap-2">
            {player1Cards.map((card, i) => (
              <PokerCard key={i} suit={card.suit} rank={card.rank} size="sm" isFlipped={card.isFlipped}
                onClick={() => FlipPlayerCard(i, 1)}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-serif font-bold">Player #2</p>
          <div className="mx-auto flex gap-2">
            {player2Cards.map((card, i) => (
              <PokerCard key={i} suit={card.suit} rank={card.rank} size="sm" isFlipped={card.isFlipped}
                onClick={() => FlipPlayerCard(i, 2)}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-2">
        <div className="flex flex-col gap-2">
          <p className="font-serif font-bold">Player #3</p>
          <div className="mx-auto flex gap-2">
            {player3Cards.map((card, i) => (
              <PokerCard key={i} suit={card.suit} rank={card.rank} size="sm" isFlipped={card.isFlipped}
                onClick={() => FlipPlayerCard(i, 3)}
              />
            ))}
          </div >
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-serif font-bold">Player #4</p>
          <div className="mx-auto flex gap-2">
            {player4Cards.map((card, i) => (
              <PokerCard key={i} suit={card.suit} rank={card.rank} size="sm" isFlipped={card.isFlipped}
                onClick={() => FlipPlayerCard(i, 4)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const Footer = (
    <div className="font-serif text-sm flex justify-between px-2 py-1 rounded-lg bg-black text-white w-full mt-6">
      <div>
        {'Texas Holdem Game'}
      </div>
      <div>
        {'Seed: ' + seed}
      </div>
    </div>
  )

  return (
    <div className="select-none flex flex-col gap-2 justify-center m-2 p-2 bg-gray-100 border-2 border-gray-500 rounded-lg">
      {Header}
      {
        seed > 0 &&
        Dealer
      }
      {
        seed > 0 &&
        Player
      }
      {Footer}
    </div>
  )
}