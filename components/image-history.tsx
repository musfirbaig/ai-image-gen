"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Download, Share2, Trash2 } from 'lucide-react'

interface HistoryItem {
  id: string
  prompt: string
  image: string
  date: string
}

const dummyHistory: HistoryItem[] = [
  {
    id: "1",
    prompt: "A futuristic cityscape with flying cars",
    image: "https://picsum.photos/seed/city1/512/512",
    date: "2023-05-01T12:00:00Z"
  },
  {
    id: "2",
    prompt: "A serene beach at sunset",
    image: "https://picsum.photos/seed/beach1/512/512",
    date: "2023-05-02T14:30:00Z"
  },
  {
    id: "3",
    prompt: "An enchanted forest with glowing mushrooms",
    image: "https://picsum.photos/seed/forest1/512/512",
    date: "2023-05-03T09:15:00Z"
  },
  {
    id: "4",
    prompt: "A steampunk-inspired airship",
    image: "https://picsum.photos/seed/airship1/512/512",
    date: "2023-05-04T16:45:00Z"
  },
  {
    id: "5",
    prompt: "A cyberpunk street scene at night",
    image: "https://picsum.photos/seed/cyberpunk1/512/512",
    date: "2023-05-05T20:00:00Z"
  },
  {
    id: "6",
    prompt: "An underwater city with bioluminescent creatures",
    image: "https://picsum.photos/seed/underwater1/512/512",
    date: "2023-05-06T11:30:00Z"
  }
]

export function ImageHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([])

  useEffect(() => {
    // In a real app, you'd fetch from localStorage or an API
    // For now, we'll use the dummy data
    setHistory(dummyHistory)
  }, [])

  const handleDelete = (id: string) => {
    setHistory(history.filter(item => item.id !== id))
  }

  const handleShare = (id: string) => {
    const item = history.find(item => item.id === id)
    if (item) {
      // In a real app, you'd implement actual sharing functionality
      alert(`Sharing image: ${item.prompt}`)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {history.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <CardHeader className="p-4">
            <CardTitle className="text-lg truncate" title={item.prompt}>
              {item.prompt}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Image src={item.image} alt={item.prompt} width={512} height={512} className="w-full h-48 object-cover" />
          </CardContent>
          <CardFooter className="p-4 flex justify-between">
            <Button variant="outline" size="sm" onClick={() => window.open(item.image, "_blank")}>
              <Download className="mr-2 h-4 w-4" /> Download
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleShare(item.id)}>
              <Share2 className="mr-2 h-4 w-4" /> Share
            </Button>
            <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)}>
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

