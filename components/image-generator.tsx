"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Loader2, Download, RefreshCw } from 'lucide-react'

// Dummy data for generated images
// const dummyGeneratedImages = [
//   {
//     prompt: "A futuristic cityscape with flying cars",
//     image: "https://picsum.photos/seed/city2/512/512"
//   },
//   {
//     prompt: "A magical forest with glowing plants",
//     image: "https://picsum.photos/seed/forest2/512/512"
//   },
//   {
//     prompt: "An alien landscape with multiple moons",
//     image: "https://picsum.photos/seed/alien1/512/512"
//   }
// ]

export function ImageGenerator() {
  const [prompt, setPrompt] = useState("")
  // const [generatedImages, setGeneratedImages] = useState(dummyGeneratedImages)
  const [isLoading, setIsLoading] = useState(false)
  const [firstTime, setFirstTime] = useState(true);
  const [imageTitle, setImageTitle] = useState<string>(''); 

  const [image, setImage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setImageTitle(prompt);
    setFirstTime(false);
    setIsLoading(true)
    try {
      // Simulate API call
      await handleImageGeneration();
    } catch (error) {
      console.error("Error generating image:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageGeneration = async () =>{
    const response = await fetch("/api/generate-image", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    })

    if(response.ok){
      // console.log(response);
      setImage((await response.json()).image);

      // console.log("image base 64: ", (await response.json()).image )
      }


  }

  return (
    <div className="">
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
            <Button type="submit" disabled={isLoading} className="w-full" onClick={handleImageGeneration}>
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


       {/* <img src={`data:image/png;base64,${image}`} alt="Generated" /> */}

      {/* <div>
        <h2 className="text-xl font-bold">Generated Image</h2>

        {image && (
        <div>
          <h2>Generated Image:</h2>
         

          <Image 
              src={`data:image/png;base64,${image}`}
              alt="Generated" 
              width={512}  // Set appropriate width
              height={512} // Set appropriate height
            />
        </div>
      )}

      </div> */}


      <div className="container mx-auto my-[20px] px-4 flex justify-center items-center min-h-screen">
    <Card className="overflow-hidden w-[512px]">
      <CardHeader className="p-4">
        <CardTitle className="text-lg truncate" title={imageTitle || 'No image generated'}>
          {imageTitle || 'No image generated'}
        </CardTitle>
      </CardHeader>
    <CardContent className="p-0 relative aspect-square">
      {firstTime ? (
        <div className="absolute inset-0 bg-muted flex items-center justify-center">
          <p className="text-muted-foreground text-sm">Generated image will appear here</p>
        </div>
      ) : isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <Image 
          src={`data:image/png;base64,${image}`} 
          alt={imageTitle} 
          width={512} 
          height={512} 
          className="object-cover"
        />
      )}
    </CardContent>
    <CardFooter className="p-4 flex justify-between">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => {
          // Download functionality
          const link = document.createElement('a');
          link.href = `data:image/png;base64,${image}`;
          link.download = `${prompt}.png`;
          link.click();
        }}
      >
        <Download className="mr-2 h-4 w-4" /> Download
      </Button>
      <Button 
        variant="outline" 
        size="sm" 

        onClick={async () => {
          setPrompt(imageTitle); // Set input to current title
          // setImageTitle(prompt);

          setIsLoading(true)
          try {
            await new Promise(resolve => setTimeout(resolve, 0)); // Allow state to update
            // Simulate API call
            await handleImageGeneration();
          } catch (error) {
            console.error("Error generating image:", error)
          } finally {
            setIsLoading(false)
          }
        }}

        // onClick={async () => {
        //   try {
        //     setIsLoading(true);
        //     const response = await fetch('/api/generate-image', {
        //       method: 'POST',
        //       headers: { 'Content-Type': 'application/json' },
        //       body: JSON.stringify({ prompt })
        //     });
        //     const data = await response.json();
        //     setImage(data.image);
        //   } catch (error) {
        //     console.error('Error regenerating image:', error);
        //   } finally {
        //     setIsLoading(false);
        //   }
        // }}
      >
        <RefreshCw className="mr-2 h-4 w-4" /> Regenerate
      </Button>
    </CardFooter>
  </Card>
</div>
    </div>
  )
}

