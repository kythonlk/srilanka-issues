import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPinIcon, CalendarIcon } from 'lucide-react'

const mockData = [
  {
    id: 1,
    category: "Road Infrastructure",
    description: "Pothole on Main Street causing traffic issues",
    location: "Colombo",
    mapLink: "https://goo.gl/maps/exampleLink1",
    province: "Western",
    district: "Colombo",
    gm: "Colombo Municipal Council",
    date: "2023-09-15",
    attachment: "/placeholder.svg?height=100&width=100"
  },
  {
    id: 2,
    category: "Public Transportation",
    description: "Irregular bus schedules in Kandy city",
    location: "Kandy",
    mapLink: "https://goo.gl/maps/exampleLink2",
    province: "Central",
    district: "Kandy",
    gm: "Kandy Municipal Council",
    date: "2023-09-18",
    attachment: "/placeholder.svg?height=100&width=100"
  },
]

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockData.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <CardContent className="py-4">
              <div className="flex items-center mt-2">
                <CardTitle className="text-lg">{item.category}</CardTitle>
              </div>
              <p className="text-sm text-gray-600 mb-2">{item.description.substring(0, 100)}...</p>
              <div className="flex items-center text-sm text-gray-500 mb-1">
                <MapPinIcon className="h-4 w-4 mr-1" />
                {item.location}
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-1">
                <CalendarIcon className="h-4 w-4 mr-1" />
                {item.date}
              </div>
              <div className="my-4" >
                <a href={`/details/${item.id}`} >
                  <Button variant="outline">View Details</Button>
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
