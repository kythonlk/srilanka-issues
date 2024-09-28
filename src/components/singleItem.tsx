import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPinIcon, CalendarIcon, FolderIcon, LinkIcon } from 'lucide-react'

// This would typically come from an API or database
const mockData = {
  id: 1,
  category: "Road Infrastructure",
  description: "There is a large pothole on Main Street near the central bus station. It's causing traffic congestion and poses a risk to vehicles, especially during rainy weather. This issue has persisted for over a month and requires immediate attention.",
  location: "Colombo",
  mapLink: "https://goo.gl/maps/exampleLink1",
  province: "Western",
  district: "Colombo",
  gm: "Colombo Municipal Council",
  date: "2023-09-15",
  attachment: "https://placehold.co/600x400"
}

export default function Details() {
  const { id } = useParams();
  console.log(id);
  const item = mockData

  return (
    <div className="container mx-auto p-4">
      <a href='/'>
        <Button variant="outline" className="mb-4">
          Back to Dashboard
        </Button>
      </a>
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="text-2xl">{item.category}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <MapPinIcon className="h-4 w-4 mr-2" />
                  <span className="font-semibold mr-2">Location:</span> {item.location}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  <span className="font-semibold mr-2">Date:</span> {item.date}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <FolderIcon className="h-4 w-4 mr-2" />
                  <span className="font-semibold mr-2">Province:</span> {item.province}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <FolderIcon className="h-4 w-4 mr-2" />
                  <span className="font-semibold mr-2">District:</span> {item.district}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <FolderIcon className="h-4 w-4 mr-2" />
                  <span className="font-semibold mr-2">Local Authority:</span> {item.gm}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <LinkIcon className="h-4 w-4 mr-2" />
                  <span className="font-semibold mr-2">Map:</span>
                  <a href={item.mapLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    View on Google Maps
                  </a>
                </div>
              </div>
            </div>
            <div>
              <img
                src={item.attachment}
                alt="Attachment"
                width={400}
                height={300}
                className="rounded-lg object-cover w-full h-auto"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
