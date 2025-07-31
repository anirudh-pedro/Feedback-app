import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const FormEditor = () => {
  const { formId } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [formBuilder, setFormBuilder] = useState({
    title: '',
    eventName: '',
    eventDate: '',
    questions: []
  })
  
  // Simulating API call to fetch the form data
  useEffect(() => {
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

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        if (mockForms[formId]) {
          setFormBuilder(mockForms[formId])
        } else {
          toast.error('Form not found')
          navigate('/feedback')
        }
      } catch (error) {
        console.error('Error fetching form:', error)
        toast.error('Error loading form data')
      } finally {
        setLoading(false)
      }
    }
    
    fetchFormData()
  }, [formId, navigate])
  
  const handleFormBuilderChange = (e) => {
    const { name, value } = e.target
    setFormBuilder({
      ...formBuilder,
      [name]: value
    })
  }
  
  const handleQuestionTextChange = (id, value) => {
    setFormBuilder({
      ...formBuilder,
      questions: formBuilder.questions.map(q => 
        q.id === id ? { ...q, text: value } : q
      )
    })
  }
  
  const handleQuestionRequiredChange = (id, checked) => {
    setFormBuilder({
      ...formBuilder,
      questions: formBuilder.questions.map(q => 
        q.id === id ? { ...q, required: checked } : q
      )
    })
  }
  
  const addQuestion = (type) => {
    const newId = formBuilder.questions.length > 0 
      ? Math.max(...formBuilder.questions.map(q => q.id)) + 1 
      : 1
    
    setFormBuilder({
      ...formBuilder,
      questions: [
        ...formBuilder.questions,
        { id: newId, type, text: '', required: false }
      ]
    })
  }
  
  const removeQuestion = (id) => {
    setFormBuilder({
      ...formBuilder,
      questions: formBuilder.questions.filter(q => q.id !== id)
    })
  }
  
  const moveQuestionUp = (index) => {
    if (index === 0) return
    
    const newQuestions = [...formBuilder.questions]
    const temp = newQuestions[index]
    newQuestions[index] = newQuestions[index - 1]
    newQuestions[index - 1] = temp
    
    setFormBuilder({
      ...formBuilder,
      questions: newQuestions
    })
  }
  
  const moveQuestionDown = (index) => {
    if (index === formBuilder.questions.length - 1) return
    
    const newQuestions = [...formBuilder.questions]
    const temp = newQuestions[index]
    newQuestions[index] = newQuestions[index + 1]
    newQuestions[index + 1] = temp
    
    setFormBuilder({
      ...formBuilder,
      questions: newQuestions
    })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validate the form
    if (!formBuilder.title || !formBuilder.eventName) {
      toast.error('Please provide a title and event name')
      return
    }
    
    if (formBuilder.questions.length === 0) {
      toast.error('Please add at least one question')
      return
    }
    
    // Validate that all questions have text
    const emptyQuestions = formBuilder.questions.filter(q => !q.text.trim())
    if (emptyQuestions.length > 0) {
      toast.error('All questions must have text')
      return
    }
    
    // In a real app, you would send this data to the backend
    console.log('Saving form:', formBuilder)
    toast.success('Form updated successfully!')
    
    // Redirect back to the feedback page
    navigate('/feedback')
  }
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="bg-black border border-gray-800 rounded-xl shadow-lg max-w-lg w-full p-8 text-center">
          <div className="w-20 h-20 mx-auto flex items-center justify-center mb-6">
            <svg className="animate-spin h-12 w-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Loading Form...</h2>
          <p className="text-gray-400">
            Please wait while we load your feedback form.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">Edit Feedback Form</h1>
              <p className="text-gray-400 mt-1">Make changes to your feedback form</p>
            </div>
            <div>
              <button 
                onClick={() => navigate('/form/' + formId)} 
                className="px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors duration-200 mr-3"
              >
                Preview
              </button>
              <button 
                onClick={() => navigate('/feedback')} 
                className="px-4 py-2 bg-gray-700 text-white font-medium rounded-md hover:bg-gray-600 transition-colors duration-200"
              >
                Back
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-black rounded-xl border border-gray-800 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-gray-400 mb-2" htmlFor="title">
                  Form Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formBuilder.title}
                  onChange={handleFormBuilderChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  required
                  placeholder="E.g. Tech Meetup Feedback"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2" htmlFor="eventName">
                  Event Name
                </label>
                <input
                  type="text"
                  id="eventName"
                  name="eventName"
                  value={formBuilder.eventName}
                  onChange={handleFormBuilderChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  required
                  placeholder="E.g. Campus Tech Meetup 2025"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-400 mb-2" htmlFor="eventDate">
                Event Date
              </label>
              <input
                type="date"
                id="eventDate"
                name="eventDate"
                value={formBuilder.eventDate}
                onChange={handleFormBuilderChange}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                required
              />
            </div>
            
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-white">Questions</h3>
                <div className="flex space-x-2">
                  <button 
                    type="button"
                    onClick={() => addQuestion('text')}
                    className="px-3 py-1 bg-gray-700 text-sm text-white rounded-md hover:bg-gray-600 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Text Question
                  </button>
                  <button 
                    type="button"
                    onClick={() => addQuestion('rating')}
                    className="px-3 py-1 bg-gray-700 text-sm text-white rounded-md hover:bg-gray-600 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Rating Question
                  </button>
                </div>
              </div>
              
              {formBuilder.questions.length === 0 && (
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 text-center">
                  <p className="text-gray-400">No questions added yet. Click the buttons above to add questions.</p>
                </div>
              )}
              
              {formBuilder.questions.map((question, index) => (
                <div key={question.id} className="mb-4 bg-gray-800 border border-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-gray-700 text-xs font-medium px-2 py-1 rounded-full">
                      {question.type === 'rating' ? 'Rating Scale' : 'Text Response'}
                    </span>
                    <div className="flex">
                      <label className="flex items-center mr-4 text-sm">
                        <input
                          type="checkbox"
                          checked={question.required}
                          onChange={(e) => handleQuestionRequiredChange(question.id, e.target.checked)}
                          className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded bg-gray-700"
                        />
                        Required
                      </label>
                      
                      <div className="flex space-x-1">
                        <button 
                          type="button" 
                          onClick={() => moveQuestionUp(index)}
                          disabled={index === 0}
                          className={`p-1 rounded-md ${index === 0 ? 'text-gray-600' : 'text-gray-400 hover:bg-gray-700'}`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        </button>
                        <button 
                          type="button" 
                          onClick={() => moveQuestionDown(index)}
                          disabled={index === formBuilder.questions.length - 1}
                          className={`p-1 rounded-md ${index === formBuilder.questions.length - 1 ? 'text-gray-600' : 'text-gray-400 hover:bg-gray-700'}`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        <button 
                          type="button" 
                          onClick={() => removeQuestion(question.id)}
                          className="p-1 text-red-400 hover:bg-gray-700 rounded-md"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <textarea
                      value={question.text}
                      onChange={(e) => handleQuestionTextChange(question.id, e.target.value)}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      placeholder={`Enter your ${question.type} question`}
                      rows="2"
                    ></textarea>
                  </div>
                  
                  {question.type === 'rating' && (
                    <div className="mt-4 bg-gray-700 p-3 rounded-md">
                      <span className="text-xs text-gray-400">Preview: </span>
                      <div className="flex items-center space-x-1 mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star} className="text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {question.type === 'text' && (
                    <div className="mt-4 bg-gray-700 p-3 rounded-md">
                      <span className="text-xs text-gray-400">Preview: </span>
                      <div className="mt-2 w-full h-10 bg-gray-600 rounded-md border border-gray-500"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/feedback')}
                className="px-6 py-3 bg-gray-700 text-white font-medium rounded-md hover:bg-gray-600 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default FormEditor
