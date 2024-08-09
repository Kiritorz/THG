"use client"
import { PokerCard } from "@/components/ui/poker-card"
import { useEffect, useRef, useState } from "react"
import { MersenneTwister19937, Random } from "random-js"
import { ArrowPathIcon, ForwardIcon } from "@heroicons/react/24/solid"
import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"

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

  // Total card stacks
  const DoubleCards = [...Cards, ...Cards]

  // Card stacks of 4 players
  const [player1Cards, setPlayer1Cards] = useState<Card[]>([])
  const [player2Cards, setPlayer2Cards] = useState<Card[]>([])
  const [player3Cards, setPlayer3Cards] = useState<Card[]>([])
  const [player4Cards, setPlayer4Cards] = useState<Card[]>([])

  // Card stack of dealer
  const [dealerCards, setDealerCards] = useState<Card[]>([])

  // generate 13 numbers (0 - 103) due to the minute seed
  const [seed, setSeed] = useState<number>(0)
  const seedRef = useRef(seed)

  /**
   * Get seed by now
   * @returns seed
   */
  const getSeedByNow = () => {
    const now = new Date()
    return now.getMonth() * 30 * 24 * 360 + now.getDate() * 24 * 360 + now.getHours() * 360 + now.getMinutes() * 6 + Math.floor(now.getSeconds() / 10)
  }

  /**
   * Generate unique random numbers
   * @param seed
   * @param count 
   * @param min 
   * @param max 
   * @returns numbers
   */
  const generateUniqueRandomNumbers = (seed: number, count: number, min: number, max: number): number[] => {
    console.log('Generated cards by seed:', seed)
    const random = new Random(MersenneTwister19937.seed(seed))

    const uniqueNumbers: Set<number> = new Set()

    while (uniqueNumbers.size < count) {
      const randomNumber = random.integer(min, max)
      uniqueNumbers.add(randomNumber)
    }

    return Array.from(uniqueNumbers)
  }

  /**
   * Flip dealer card
   * @param index
   */
  const FlipDealerCard = (index: number) => {
    setDealerCards(dealerCards.map((card, i) => i === index ? { ...card, isFlipped: !card.isFlipped } : card))
  }

  /**
   * Flip player card
   * @param index 
   * @param playerIndex 
   */
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

  // initialize dealer cards and player cards
  useEffect(() => {
    seedRef.current = seed
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
    } else {
      // initialize seed
      let initialSeed = getSeedByNow()
      setSeed(initialSeed)
    }
  }, [seed])

  const [isNextStepAvailable, setIsNextStepAvailable] = useState<boolean>(true)
  const [isArrowPathIconRotated, setIsArrowPathIconRotated] = useState<boolean>(false)
  const [isSeedNew, setIsSeedNew] = useState<boolean>(false)

  // when the 5 of 5 dealer cards are not flipped, the next step is not available
  useEffect(() => {
    if (dealerCards.length === 5
      && dealerCards[0].isFlipped === false
      && dealerCards[1].isFlipped === false
      && dealerCards[2].isFlipped === false
      && dealerCards[3].isFlipped === false
      && dealerCards[4].isFlipped === false
    ) {
      setIsNextStepAvailable(dealerCards[4].isFlipped)
    }
  }, [dealerCards])

  // when the arrow path icon is rotated, it will be rotated back after 1 second
  useEffect(() => {
    if (isArrowPathIconRotated) {
      setTimeout(() => {
        setIsArrowPathIconRotated(false)
      }, 1000)
    }
  }, [isArrowPathIconRotated])

  // check if the seed is new every second
  useEffect(() => {
    const interval = setInterval(() => {
      const currentSeed = seedRef.current
      const seedByNow = getSeedByNow()
      if (currentSeed !== seedByNow) {
        setIsSeedNew(true)
      } else {
        setIsSeedNew(false)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // current player money
  const [totalFunds, setTotalFunds] = useState<number>(200)
  const [currentBet, setCurrentBet] = useState<number>(0)
  const [winnerBet, setWinnerBet] = useState<number>(0)

  const onAddCurrentBet = (count: number) => {
    if (totalFunds - count >= 0) {
      setTotalFunds(totalFunds - count)
      setCurrentBet(currentBet + count)
    }
  }

  const onSubCurrentBet = (count: number) => {
    if (currentBet - count >= 0) {
      setTotalFunds(totalFunds + count)
      setCurrentBet(currentBet - count)
    }
  }

  const onAddWinnerBet = (count: number) => {
    setWinnerBet(winnerBet + count)
  }

  const onSubWinnerBet = (count: number) => {
    setWinnerBet(winnerBet - count)
  }

  const onAddTotalFunds = (count: number) => {
    setTotalFunds(totalFunds + count)
  }

  const Header = (
    <div className="flex justify-between">
      <div className="font-serif flex gap-1.5 justify-start w-full">
        <Button size="icon"
          disabled={currentBet === 0}
          className={`h-8 w-12 ${currentBet === 0 ? 'bg-gray-600' : 'bg-red-800'}`}
          onClick={() => {
            // Lose the current bet, substract the current bet from total funds and reset the current bet
            setTotalFunds(totalFunds)
            setCurrentBet(0)
          }}
        >
          Lose
        </Button>
        <Drawer>
          <DrawerTrigger asChild>
            <Button size="icon"
              disabled={currentBet === 0}
              className={`h-8 w-12 ${currentBet === 0 ? 'bg-gray-600' : 'bg-green-800'}`}
              onClick={() => {
                // Win the current bet open a drawer to ask the won bet
                setTotalFunds(totalFunds + currentBet)
                setCurrentBet(0)
              }}
            >
              Win
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>
                The Winner Bet
              </DrawerTitle>
              <DrawerDescription>
                The sum of all the bets made by your friends.
              </DrawerDescription>
            </DrawerHeader>
            <div className="flex items-center justify-center gap-2 w-fit mx-auto mb-4">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onSubWinnerBet(10)}
                disabled={winnerBet < 10}
              >
                <Minus className="h-4 w-4" />
                <span className="sr-only">Decrease</span>
              </Button>
              <div className="flex-1 text-center">
                <div className="text-4xl font-bold tracking-tighter">
                  {winnerBet}
                </div>
                <div className="text-[0.70rem] uppercase text-muted-foreground">
                  Winner Bet
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onAddWinnerBet(10)}
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">Increase</span>
              </Button>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button
                  disabled={winnerBet === 0}
                  onClick={() => {
                    setTotalFunds(totalFunds + winnerBet)
                    setWinnerBet(0)
                  }}
                >
                  Confirm
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
      <div className="font-serif flex gap-1.5 justify-end w-full">
        <Button size="icon"
          className="size-8"
          disabled={!isNextStepAvailable}
          onClick={() => {
            if (seed > 0) {
              if (dealerCards[0].isFlipped === true || dealerCards[1].isFlipped === true || dealerCards[2].isFlipped === true) {
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
          <ForwardIcon className={`size-4 my-auto`} />
        </Button>
        <Button size="icon"
          className="size-8"
          disabled={!isSeedNew || isArrowPathIconRotated}
          onClick={() => {
            setIsArrowPathIconRotated(true)

            // flip all dealer cards and player cards
            setDealerCards(dealerCards.map(card => ({ ...card, isFlipped: true })))
            setPlayer1Cards(player1Cards.map(card => ({ ...card, isFlipped: true })))
            setPlayer2Cards(player2Cards.map(card => ({ ...card, isFlipped: true })))
            setPlayer3Cards(player3Cards.map(card => ({ ...card, isFlipped: true })))
            setPlayer4Cards(player4Cards.map(card => ({ ...card, isFlipped: true })))
            setTimeout(() => {
              setSeed(getSeedByNow())
            }, 500)
          }}
        >
          <ArrowPathIcon className={`size-4 my-auto ${isArrowPathIconRotated ? 'animate-spin' : ''}`} />
        </Button>
      </div>
    </div>
  )

  const Dealer = (
    <div className="flex flex-col gap-2 mb-4">
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
    <div className="font-serif text-sm flex justify-between px-2 py-1 rounded-lg bg-black text-white w-full mt-2">
      <div>
        {'Texas Holdem Game'}
      </div>
      <div>
        {'Seed: ' + seed}
      </div>
    </div>
  )

  const Money = (
    <div className="flex justify-between">
      {/* <div className="w-12 h-20 bg-destructive uppercase text-white flex flex-col justify-center items-center">
        Lose
      </div> */}
      <div className="flex items-center justify-center gap-2 w-fit mx-auto mb-4">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 shrink-0 rounded-full"
          onClick={() => onSubCurrentBet(10)}
          disabled={currentBet < 10}
        >
          <Minus className="h-4 w-4" />
          <span className="sr-only">Decrease</span>
        </Button>
        <div className="flex-1 text-center">
          <div className="text-4xl font-bold tracking-tighter">
            {currentBet}
          </div>
          <div className="text-[0.70rem] uppercase text-muted-foreground">
            Current Bet
          </div>
          <div className="text-[0.70rem] uppercase text-muted-foreground">
            Total Funds: {totalFunds + currentBet}
          </div>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 shrink-0 rounded-full"
          onClick={() => onAddCurrentBet(10)}
          disabled={totalFunds < 10}
        >
          <Plus className="h-4 w-4" />
          <span className="sr-only">Increase</span>
        </Button>
      </div>
    </div>
  )

  return (
    <div className="select-none flex flex-col gap-2 justify-center m-2 p-2 bg-gray-100 border-2 border-gray-500 rounded-lg">
      {Header}
      {seed > 0 && Dealer}
      {seed > 0 && Money}
      {seed > 0 && Player}
      {Footer}
    </div>
  )
}