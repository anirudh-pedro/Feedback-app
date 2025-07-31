import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const FeedbackForm = () => {
  const { formId } = useParams()
  const navigate = useNavigate()
  const [submitted, setSubmitted] = useState(false)
  const [formResponses, setFormResponses] = useState({})
  const [currentRating, setCurrentRating] = useState({})
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState(null)
  const [formNotFound, setFormNotFound] = useState(false)

  // In a real app, this would be an API call
  useEffect(() => {
    // Simulating API call to fetch form data
    const fetchFormData = async () => {
      setLoading(true)
      try {
        // This is a simulation of an API call
        // In a real app, you would fetch this data from your backend
        const mockForms = {
          "tech-meetup": {
            id: "tech-meetup",
            title: "Tech Meetup Feedback",
            eventName: "Campus Tech Meetup 2025",
            eventDate: "2025-07-28",
            questions: [
              { id: 1, type: 'rating', text: 'How would you rate this event overall?', required: true },
              { id: 2, type: 'text', text: 'What did you enjoy most about the event?', required: false },
              { id: 3, type: 'text', text: 'What could we improve for next time?', required: true },
              { id: 4, type: 'rating', text: 'How likely are you to recommend this event to others?', required: true }
            ]
          },
          "orientation": {
            id: "orientation",
            title: "Orientation Week Survey",
            eventName: "Freshman Orientation 2025",
            eventDate: "2025-07-15",
            questions: [
              { id: 1, type: 'rating', text: 'How would you rate your orientation experience?', required: true },
              { id: 2, type: 'rating', text: 'How helpful were the campus tour guides?', required: true },
              { id: 3, type: 'text', text: 'What additional information would have been helpful?', required: false }
            ]
          },
          "library-workshop": {
            id: "library-workshop",
            title: "Library Workshop Feedback",
            eventName: "Research Methods Workshop",
            eventDate: "2025-07-22",
            questions: [
              { id: 1, type: 'rating', text: 'How useful was this workshop for your research?', required: true },
              { id: 2, type: 'text', text: 'What topics would you like covered in future workshops?', required: false }
            ]
          }
        }

        // Wait for a short time to simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500))

        if (mockForms[formId]) {
          setFormData(mockForms[formId])
        } else {
          setFormNotFound(true)
          toast.error('Form not found')
        }
      } catch (error) {
        console.error('Error fetching form:', error)
        toast.error('Error loading form')
        setFormNotFound(true)
      } finally {
        setLoading(false)
      }
    }

    fetchFormData()
  }, [formId])

  const handleTextChange = (questionId, value) => {
    setFormResponses({
      ...formResponses,
      [questionId]: value
    })
  }

  const handleRatingChange = (questionId, rating) => {
    setCurrentRating({
      ...currentRating,
      [questionId]: rating
    })
    
    setFormResponses({
      ...formResponses,
      [questionId]: rating
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validation
    let valid = true
    const missingFields = []
    
    formData.questions.forEach(question => {
      if (question.required && !formResponses[question.id]) {
        valid = false
        missingFields.push(question.text)
      }
    })
    
    if (!valid) {
      alert(`Please complete the following required fields: ${missingFields.join(', ')}`)
      return
    }
    
    // In a real app, you would submit this to an API
    console.log("Form responses submitted:", formResponses)
    
    // Show thank you message
    setSubmitted(true)
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-12">
        <div className="bg-black border border-gray-800 rounded-xl shadow-lg max-w-lg w-full p-8 text-center">
          <div className="w-20 h-20 mx-auto flex items-center justify-center mb-6">
            <svg className="animate-spin h-12 w-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Loading Form...</h2>
          <p className="text-gray-400">
            Please wait while we retrieve the feedback form.
          </p>
        </div>
      </div>
    )
  }

  // Not found state
  if (formNotFound) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-12">
        <div className="bg-black border border-gray-800 rounded-xl shadow-lg max-w-lg w-full p-8 text-center">
          <div className="w-20 h-20 bg-red-600 rounded-full mx-auto flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Form Not Found</h2>
          <p className="text-gray-400 mb-8">
            The feedback form you're looking for doesn't exist or has been removed.
          </p>
          <a 
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Back to Home
          </a>
        </div>
      </div>
    )
  }

  // Success/thank you state
  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-12">
        <div className="bg-black border border-gray-800 rounded-xl shadow-lg max-w-lg w-full p-8 text-center">
          <div className="w-20 h-20 bg-green-600 rounded-full mx-auto flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Thank you for your feedback!</h2>
          <p className="text-gray-400 mb-8">
            Your responses have been recorded and will help us improve future events.
          </p>
          <a 
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Back to Home
          </a>
        </div>
      </div>
    )
  }

  // Render the form when we have data
  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-black border border-gray-800 rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-900 to-purple-900 p-6">
            <div className="mb-4">
              <span className="inline-block bg-white bg-opacity-20 px-3 py-1 rounded-full text-xs font-medium text-white mb-2">
                QuickFeedback
              </span>
              <h1 className="text-2xl font-bold text-white">{formData.title}</h1>
            </div>
            <div className="text-blue-100 text-sm">
              <p>{formData.eventName} • {formData.eventDate}</p>
            </div>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6">
            <p className="text-gray-400 mb-6">
              Please provide your honest feedback to help us improve. Your responses are anonymous.
            </p>
            
            <div className="space-y-8">
              {formData.questions.map((question) => (
                <div key={question.id} className="border border-gray-800 rounded-lg p-4">
                  <label className="block text-white font-medium mb-3">
                    {question.text}
                    {question.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  
                  {question.type === 'rating' && (
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => handleRatingChange(question.id, rating)}
                          className={`h-10 w-10 rounded-full flex items-center justify-center focus:outline-none ${
                            currentRating[question.id] >= rating 
                              ? 'text-yellow-400' 
                              : 'text-gray-600 hover:text-gray-400'
                          }`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </button>
                      ))}
                      {currentRating[question.id] && (
                        <span className="ml-2 text-gray-400">
                          ({currentRating[question.id]} of 5)
                        </span>
                      )}
                    </div>
                  )}
                  
                  {question.type === 'text' && (
                    <textarea
                      value={formResponses[question.id] || ''}
                      onChange={(e) => handleTextChange(question.id, e.target.value)}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      rows="3"
                      placeholder="Enter your response"
                      required={question.required}
                    ></textarea>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                Submit Feedback
              </button>
            </div>
          </form>
          
          <div className="bg-gray-900 p-4 text-center border-t border-gray-800">
            <p className="text-sm text-gray-500">
              Powered by <span className="text-blue-400">QuickFeedback</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedbackForm
