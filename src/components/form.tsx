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
import { useTranslation } from 'react-i18next';

export default function FeedbackForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [date, setDate] = useState<Date>()
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [additionalFields, setAdditionalFields] = useState({ fullName: "", email: "", phone: "", responseMethod: "", province: "", district: "", gmDivision: "", mapLink: "" })
  const [showAdditionalFields, setShowAdditionalFields] = useState(false)
  const { t } = useTranslation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setError('')

    const data = {
      category,
      date: date ? format(date, "yyyy-MM-dd") : null,
      description,
      location,
      additionalDetails: showAdditionalFields ? additionalFields : null,
    }

    try {
      const response = await fetch("https://client_sl.kythonlk.com/api/public/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to submit feedback")
      }

      setIsSubmitting(false)
      setIsSubmitted(true)
    } catch (error: any) {
      setIsSubmitting(false)
      setError(error.message || "An error occurred while submitting")
    }
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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 flex items-center justify-center px-10 py-4">
      <Card className="w-full max-w-7xl mx-auto">
        <CardHeader>
          <CardTitle>{t('feedbackForm.title')}</CardTitle>
          <CardDescription>{t('feedbackForm.des')}</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className='flex sm:flex-row flex-col justify-between'>
              <div className="space-y-2 w-full sm:w-[48%]">
                <Label htmlFor="category">{t('feedbackForm.category.label')}</Label>
                <Select required onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('feedbackForm.category.placeholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="infrastructure">{t('feedbackForm.category.infrastructure')}</SelectItem>
                    <SelectItem value="education">{t('feedbackForm.category.education')}</SelectItem>
                    <SelectItem value="healthcare">{t('feedbackForm.category.healthcare')}</SelectItem>
                    <SelectItem value="environment">{t('feedbackForm.category.environment')}</SelectItem>
                    <SelectItem value="other">{t('feedbackForm.category.other')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 w-full sm:w-[48%]">
                <Label htmlFor="dateOfOccurrence">{t('feedbackForm.dateOfOccurrence.label')}</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={`w-full justify-start text-left font-normal ${!date && "text-muted-foreground"}`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>{t('feedbackForm.dateOfOccurrence.placeholder')}</span>}
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
              <Label htmlFor="description">{t('feedbackForm.description.label')}</Label>
              <Textarea id="description" placeholder={t('feedbackForm.description.placeholder')} value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">{t('feedbackForm.location.label')}</Label>
              <Input id="location" placeholder={t('feedbackForm.location.placeholder')} value={location} onChange={(e) => setLocation(e.target.value)} required />
            </div>

            {showAdditionalFields && (
              <>
                {/* Additional fields code */}
                {/* Populate additional fields in the form */}
              </>
            )}
            {!showAdditionalFields && (
              <Button variant="link" className='underline underline-offset-8' onClick={() => setShowAdditionalFields(true)}>
                {t('feedbackForm.moreDetails')}
              </Button>
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
              {isSubmitting ? t('feedbackForm.submitting') : t('feedbackForm.submitButton')}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
