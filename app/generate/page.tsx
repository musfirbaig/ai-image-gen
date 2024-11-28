import { ImageGenerator } from "@/components/image-generator"

export default function GeneratePage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Generate Image</h1>
      <ImageGenerator />
    </div>
  )
}

