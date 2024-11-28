import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, Sparkles, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: "AI Image Generator",
  description: "Generate images from text prompts using AI",
}

export default function Home() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Welcome to AI Image Generator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Create New Image</CardTitle>
            <CardDescription>Transform your ideas into stunning visuals</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/generate" className="w-full">
                Start Creating <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>View History</CardTitle>
            <CardDescription>Revisit your past creations</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline">
              <Link href="/history" className="w-full">
                Browse History <Clock className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2">
            <li>Navigate to the "Generate" page</li>
            <li>Enter a detailed description of the image you want to create</li>
            <li>Click "Generate Image" and wait for the AI to work its magic</li>
            <li>Download your creation or save it to your history</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}

