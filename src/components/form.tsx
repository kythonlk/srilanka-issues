import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { AlertCircle, CheckCircle2, CalendarIcon } from 'lucide-react'
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"


export default function FeedbackForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [date, setDate] = useState<Date>()
  const [showAdditionalFields, setShowAdditionalFields] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setError('')

    await new Promise(resolve => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }


  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl mx-auto">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <CheckCircle2 className="w-12 h-12 text-green-500 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
              <p className="text-muted-foreground">Your feedback has been submitted successfully. We appreciate your input for improving Sri Lanka.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-7xl mx-auto">
        <CardHeader>
          <CardTitle>Sri Lanka Feedback Form</CardTitle>
          <CardDescription>Submit your complaints or suggestions to the government</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className='flex sm:flex-row flex-col justify-between'>
              <div className="space-y-2 w-full sm:w-[48%]">
                <Label htmlFor="category">Complaint/Suggestion</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="infrastructure">Infrastructure</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="environment">Environment</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 w-full sm:w-[48%]">
                <Label htmlFor="dateOfOccurrence">Date of Occurrence</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={`w-full justify-start text-left font-normal ${!date && "text-muted-foreground"}`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Issue Description</Label>
              <Textarea id="description" placeholder="Describe your complaint or suggestion" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="Enter the location" required />
            </div>
            {!showAdditionalFields && (
              <Button variant="link" onClick={() => setShowAdditionalFields(true)}>
                Give More Details
              </Button>
            )}
            {showAdditionalFields && (
              <>
                <div className='flex sm:flex-row flex-col justify-between'>
                  <div className="space-y-2 w-full sm:w-[48%]">
                    <Label htmlFor="fullName">Full Name</Label>
                    <div className="flex items-center space-x-2">
                      <Input id="fullName" placeholder="Enter your full name (optional)" />
                    </div>
                  </div>
                  <div className="space-y-2 w-full sm:w-[48%]">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="flex items-center space-x-2">
                      <Input id="email" type="email" placeholder="Enter your email (optional)" />
                    </div>
                  </div>
                </div>
                <div className='flex sm:flex-row flex-col justify-between'>
                  <div className="space-y-2 w-full sm:w-[48%]">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="flex items-center space-x-2">
                      <Input id="phone" type="tel" placeholder="Enter your phone number (optional)" />
                    </div>
                  </div>
                  <div className="space-y-2 w-full sm:w-[48%]">
                    <Label htmlFor="responseMethod">Preferred Method of Response</Label>
                    <div className="flex items-center space-x-2">
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select preferred method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="phone">Phone</SelectItem>
                          <SelectItem value="mail">Mail</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="province">Province</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select province" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="western">Western</SelectItem>
                        <SelectItem value="central">Central</SelectItem>
                        <SelectItem value="southern">Southern</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="district">District</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select district" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="colombo">Colombo</SelectItem>
                        <SelectItem value="gampaha">Gampaha</SelectItem>
                        <SelectItem value="kalutara">Kalutara</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gm">Grama Niladhari Division</Label>
                    <Input id="gm" placeholder="GM name (optional)" />
                  </div>
                </div>
                <div className='flex sm:flex-row flex-col justify-between'>
                  <div className="space-y-2 w-full sm:w-[48%]">
                    <Label htmlFor="mapLink">Map Link</Label>
                    <Input id="mapLink" placeholder="Enter Google Maps link (optional)" />
                  </div>
                  <div className="space-y-2 w-full sm:w-[48%]">
                    <Label htmlFor="attachment">Attachment/Photo</Label>
                    <Input id="attachment" type="file" accept="image/*,.pdf" />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button variant="link" onClick={() => setShowAdditionalFields(false)}>
                    Skip Additional Details
                  </Button>
                </div>
              </>
            )}
            {error && (
              <div className="flex items-center space-x-2 text-red-600">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
