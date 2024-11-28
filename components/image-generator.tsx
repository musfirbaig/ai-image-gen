"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Loader2, Download, RefreshCw } from 'lucide-react'

// Dummy data for generated images
const dummyGeneratedImages = [
  {
    prompt: "A futuristic cityscape with flying cars",
    image: "https://picsum.photos/seed/city2/512/512"
  },
  {
    prompt: "A magical forest with glowing plants",
    image: "https://picsum.photos/seed/forest2/512/512"
  },
  {
    prompt: "An alien landscape with multiple moons",
    image: "https://picsum.photos/seed/alien1/512/512"
  }
]

export function ImageGenerator() {
  const [prompt, setPrompt] = useState("")
  const [generatedImages, setGeneratedImages] = useState(dummyGeneratedImages)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // In a real app, you'd call your API here
      // const response = await fetch("/api/generate-image", ...

      // For now, we'll just add a new dummy image
      const newImage = {
        prompt: prompt,
        image: `https://picsum.photos/seed/${Math.random()}/512/512`
      }
      setGeneratedImages([newImage, ...generatedImages])
      setPrompt("")
    } catch (error) {
      console.error("Error generating image:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Create Your Image</CardTitle>
          <CardDescription>Enter a detailed description of the image you want to generate</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="A futuristic cityscape with flying cars and neon lights..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              required
            />
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
                </>
              ) : (
                "Generate Image"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {generatedImages.map((item, index) => (
          <Card key={index} className="overflow-hidden">
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
              <Button variant="outline" size="sm" onClick={() => {
                const newImage = `https://picsum.photos/seed/${Math.random()}/512/512`
                setGeneratedImages(generatedImages.map((img, i) => i === index ? {...img, image: newImage} : img))
              }}>
                <RefreshCw className="mr-2 h-4 w-4" /> Regenerate
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

