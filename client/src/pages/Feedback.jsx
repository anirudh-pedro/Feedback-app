import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const Feedback = () => {
  const [activeTab, setActiveTab] = useState('create')
  const [formBuilder, setFormBuilder] = useState({
    title: '',
    eventName: '',
    eventDate: '',
    questions: [
      { id: 1, type: 'rating', text: 'How would you rate this event overall?', required: true },
      { id: 2, type: 'text', text: 'What did you enjoy most about the event?', required: false },
      { id: 3, type: 'text', text: 'What could we improve for next time?', required: true }
    ]
  })
  const [generatedLink, setGeneratedLink] = useState('')
  const [viewMode, setViewMode] = useState('grid') // grid or list
  
  const [feedbackForms] = useState([
    {
      id: "tech-meetup",
      title: "Tech Meetup Feedback",
      eventName: "Campus Tech Meetup 2025",
      eventDate: "2025-07-28",
      status: "Active",
      responses: 34,
      dateCreated: "2025-07-25",
      qrCode: true,
      link: `${window.location.origin}/form/tech-meetup`,
      averageRating: 4.5,
      questions: [
        { id: 1, type: 'rating', text: 'How would you rate this event overall?' },
        { id: 2, type: 'text', text: 'What did you enjoy most about the event?' },
        { id: 3, type: 'text', text: 'What could we improve for next time?' }
      ]
    },
    {
      id: "orientation",
      title: "Orientation Week Survey",
      eventName: "Freshman Orientation 2025",
      eventDate: "2025-07-15",
      status: "Active",
      responses: 122,
      dateCreated: "2025-07-10",
      qrCode: true,
      link: `${window.location.origin}/form/orientation`,
      averageRating: 4.2,
      questions: [
        { id: 1, type: 'rating', text: 'How would you rate your orientation experience?' },
        { id: 2, type: 'rating', text: 'How helpful were the campus tour guides?' },
        { id: 3, type: 'text', text: 'What additional information would have been helpful?' }
      ]
    },
    {
      id: "library-workshop",
      title: "Library Workshop Feedback",
      eventName: "Research Methods Workshop",
      eventDate: "2025-07-22",
      status: "Active",
      responses: 18,
      dateCreated: "2025-07-20",
      qrCode: true,
      link: `${window.location.origin}/form/library-workshop`,
      averageRating: 3.7,
      questions: [
        { id: 1, type: 'rating', text: 'How useful was this workshop for your research?' },
        { id: 2, type: 'text', text: 'What topics would you like covered in future workshops?' }
      ]
    },
    {
      id: "career-fair",
      title: "Career Fair Survey",
      eventName: "Spring Career Fair 2025",
      eventDate: "2025-07-05",
      status: "Closed",
      responses: 87,
      dateCreated: "2025-07-01",
      qrCode: true,
      link: `${window.location.origin}/form/career-fair`,
      averageRating: 4.8,
      questions: [
        { id: 1, type: 'rating', text: 'How would you rate the career fair organization?' },
        { id: 2, type: 'text', text: 'Which companies were most helpful?' },
        { id: 3, type: 'text', text: 'What could we improve for the next career fair?' }
      ]
    },
    {
      id: "concert",
      title: "Campus Concert Survey",
      eventName: "Spring Concert Series",
      eventDate: "2025-07-10",
      status: "Closed",
      responses: 215,
      dateCreated: "2025-07-08",
      qrCode: true,
      link: `${window.location.origin}/form/concert`,
      averageRating: 4.9,
      questions: [
        { id: 1, type: 'rating', text: 'How would you rate the concert experience?' },
        { id: 2, type: 'text', text: 'What was your favorite performance?' },
        { id: 3, type: 'text', text: 'What artists would you like to see in future concerts?' }
      ]
    }
  ])

  // Handle form builder input changes
  const handleFormBuilderChange = (e) => {
    const { name, value } = e.target
    setFormBuilder({
      ...formBuilder,
      [name]: value
    })
  }

  // Handle question change
  const handleQuestionChange = (id, field, value) => {
    setFormBuilder({
      ...formBuilder,
      questions: formBuilder.questions.map(q => 
        q.id === id ? { ...q, [field]: value } : q
      )
    })
  }

  // Add new question
  const addQuestion = (type) => {
    const newId = Math.max(...formBuilder.questions.map(q => q.id), 0) + 1
    const newQuestion = { 
      id: newId, 
      type: type, 
      text: type === 'rating' ? 'Rate this aspect of the event:' : 'Enter your feedback:', 
      required: false 
    }
    setFormBuilder({
      ...formBuilder,
      questions: [...formBuilder.questions, newQuestion]
    })
  }

  // Remove question
  const removeQuestion = (id) => {
    setFormBuilder({
      ...formBuilder,
      questions: formBuilder.questions.filter(q => q.id !== id)
    })
  }

  // Generate feedback link
  const generateFeedbackLink = (e) => {
    e.preventDefault()
    
    // Validate form
    if (!formBuilder.title || !formBuilder.eventName) {
      toast.error('Please provide a title and event name')
      return
    }
    
    if (formBuilder.questions.length === 0) {
      toast.error('Please add at least one question')
      return
    }
    
    // Generate a unique slug based on the title
    const slug = formBuilder.title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-')
      
    // Use absolute URL with our new route format
    const formId = `${slug}-${Math.floor(1000 + Math.random() * 9000)}`
    const uniqueLink = `${window.location.origin}/form/${formId}`
    setGeneratedLink(uniqueLink)
    
    // In a real app, you would save this form to the backend
    toast.success('Feedback form created successfully!')
  }

  // Copy link to clipboard
  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink)
      .then(() => {
        toast.info('Link copied to clipboard!')
      })
      .catch(err => {
        console.error('Could not copy text: ', err)
        toast.error('Failed to copy link')
      })
  }
  
  // Get status badge style based on status
  const getStatusStyle = (status) => {
    switch(status) {
      case "Active":
        return "bg-green-900 text-green-200"
      case "Closed":
        return "bg-gray-700 text-gray-200"
      case "Draft":
        return "bg-yellow-900 text-yellow-200"
      default:
        return "bg-gray-700 text-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">QuickFeedback</h1>
        
        {/* Tab Navigation */}
        <div className="bg-black rounded-t-xl overflow-hidden mb-6 border border-gray-800 border-b-0">
          <div className="flex flex-wrap">
            <button
              onClick={() => setActiveTab('create')}
              className={`px-6 py-3 font-medium text-sm ${
                activeTab === 'create' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              Create Form
            </button>
            <button
              onClick={() => setActiveTab('forms')}
              className={`px-6 py-3 font-medium text-sm ${
                activeTab === 'forms' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              My Forms
            </button>
            <button
              onClick={() => setActiveTab('responses')}
              className={`px-6 py-3 font-medium text-sm ${
                activeTab === 'responses' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              Response Analytics
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`px-6 py-3 font-medium text-sm ${
                activeTab === 'templates' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              Templates
            </button>
          </div>
        </div>
        
        {/* Create Form Builder */}
        {activeTab === 'create' && (
          <div className="bg-black rounded-b-xl rounded-tr-xl p-6 border border-gray-800 mb-8">
            {!generatedLink ? (
              <form onSubmit={generateFeedbackLink}>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-4">Create a QuickFeedback Form</h2>
                  <p className="text-gray-400 mb-6">
                    Design your form below. Once created, you'll get a shareable link that participants can use to submit feedback without login.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-gray-800 p-6 rounded-lg border border-gray-700">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                      Form Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formBuilder.title}
                      onChange={handleFormBuilderChange}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      placeholder="e.g., Campus Tech Meetup Feedback"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="eventName" className="block text-sm font-medium text-gray-300 mb-2">
                      Event Name
                    </label>
                    <input
                      type="text"
                      id="eventName"
                      name="eventName"
                      value={formBuilder.eventName}
                      onChange={handleFormBuilderChange}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      placeholder="e.g., Annual Tech Symposium 2025"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="eventDate" className="block text-sm font-medium text-gray-300 mb-2">
                      Event Date
                    </label>
                    <input
                      type="date"
                      id="eventDate"
                      name="eventDate"
                      value={formBuilder.eventDate}
                      onChange={handleFormBuilderChange}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Questions</h3>
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
                              onChange={(e) => handleQuestionChange(question.id, 'required', e.target.checked)}
                              className="mr-2 h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                            />
                            Required
                          </label>
                          <button
                            type="button"
                            onClick={() => removeQuestion(question.id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Question Text
                        </label>
                        <input
                          type="text"
                          value={question.text}
                          onChange={(e) => handleQuestionChange(question.id, 'text', e.target.value)}
                          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                          placeholder="Enter your question"
                        />
                      </div>
                      
                      {question.type === 'rating' && (
                        <div className="flex items-center space-x-1 mt-4 bg-gray-700 p-3 rounded-md">
                          <span className="text-xs text-gray-400">Preview: </span>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              className="text-gray-400 hover:text-yellow-400"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            </button>
                          ))}
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
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
                  >
                    Generate Feedback Link
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center">
                <div className="bg-gray-800 rounded-lg border border-gray-700 p-8 mb-8">
                  <div className="w-16 h-16 bg-green-600 rounded-full mx-auto flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Your QuickFeedback form is ready!</h2>
                  <p className="text-gray-400 mb-6">
                    Share this link with your audience to collect feedback. No login required for participants.
                  </p>
                  
                  <div className="flex items-center justify-center mb-8">
                    <div className="bg-gray-900 rounded-l-md p-3 border border-gray-700 border-r-0 flex-grow max-w-md">
                      <p className="font-mono text-blue-400 truncate">
                        {generatedLink}
                      </p>
                    </div>
                    <button 
                      onClick={handleCopyLink} 
                      className="bg-blue-600 hover:bg-blue-700 text-white rounded-r-md p-3 transition-colors duration-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    <button className="flex flex-col items-center justify-center bg-gray-700 p-4 rounded-md hover:bg-gray-600 transition-colors duration-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-2 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                      <span className="text-sm">Share</span>
                    </button>
                    <button className="flex flex-col items-center justify-center bg-gray-700 p-4 rounded-md hover:bg-gray-600 transition-colors duration-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm">Email</span>
                    </button>
                    <button className="flex flex-col items-center justify-center bg-gray-700 p-4 rounded-md hover:bg-gray-600 transition-colors duration-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-2 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span className="text-sm">WhatsApp</span>
                    </button>
                    <button className="flex flex-col items-center justify-center bg-gray-700 p-4 rounded-md hover:bg-gray-600 transition-colors duration-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                      </svg>
                      <span className="text-sm">QR Code</span>
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      setGeneratedLink('');
                      setActiveTab('forms');
                    }}
                    className="px-6 py-3 bg-gray-700 text-white font-medium rounded-md hover:bg-gray-600 transition-colors duration-200"
                  >
                    View All Forms
                  </button>
                  <button
                    type="button"
                    onClick={() => setGeneratedLink('')}
                    className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
                  >
                    Create Another Form
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* My Forms Dashboard */}
        {activeTab === 'forms' && (
          <div className="bg-black rounded-b-xl rounded-tr-xl border border-gray-800 overflow-hidden">
            <div className="p-6 border-b border-gray-800 flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold mb-4 sm:mb-0">My Feedback Forms</h2>
              <div className="flex flex-wrap gap-2">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600' : 'bg-gray-800 hover:bg-gray-700'} rounded-md`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-blue-600' : 'bg-gray-800 hover:bg-gray-700'} rounded-md`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                  </button>
                </div>
                <select className="bg-gray-800 border border-gray-700 text-white text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="all">All Forms</option>
                  <option value="active">Active Only</option>
                  <option value="closed">Closed Only</option>
                </select>
                <select className="bg-gray-800 border border-gray-700 text-white text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="mostResponses">Most Responses</option>
                </select>
              </div>
            </div>
            
            {/* Form Items - Grid View */}
            {viewMode === 'grid' && (
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Create New Card */}
                <div 
                  className="bg-gray-800 border border-gray-700 border-dashed rounded-xl p-6 flex flex-col items-center justify-center h-64 hover:bg-gray-750 cursor-pointer"
                  onClick={() => setActiveTab('create')}
                >
                  <div className="h-12 w-12 bg-blue-900 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Create New Form</h3>
                  <p className="text-gray-400 text-center text-sm">
                    Start collecting feedback with a new form
                  </p>
                </div>
                
                {/* Form Cards */}
                {feedbackForms.map((form) => (
                  <div key={form.id} className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(form.status)}`}>
                          {form.status}
                        </span>
                        <div className="flex items-center">
                          <span className="text-lg font-semibold text-yellow-400">
                            {form.averageRating}
                          </span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400 ml-1" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                      </div>
                      <h3 className="text-lg font-bold mb-1 truncate">{form.title}</h3>
                      <p className="text-sm text-gray-400 mb-4 truncate">{form.eventName}</p>
                      
                      <div className="flex justify-between items-center text-sm text-gray-500 mb-6">
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {form.eventDate}
                        </div>
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                          </svg>
                          {form.responses} responses
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors duration-200">
                          View Results
                        </button>
                        <a 
                          href={`/form/${form.id}`} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors duration-200"
                        >
                          Preview
                        </a>
                        <button className="px-3 py-2 bg-gray-700 text-sm text-gray-300 rounded-md hover:bg-gray-600 transition-colors duration-200">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                          </svg>
                        </button>
                        <button className="px-3 py-2 bg-gray-700 text-sm text-gray-300 rounded-md hover:bg-gray-600 transition-colors duration-200">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Form Items - List View */}
            {viewMode === 'list' && (
              <div className="divide-y divide-gray-800">
                {feedbackForms.map((form) => (
                  <div key={form.id} className="p-4 hover:bg-gray-900 transition-colors duration-200">
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <div className="flex-1 mb-4 sm:mb-0">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="text-lg font-bold">{form.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(form.status)}`}>
                            {form.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 mb-2">{form.eventName}</p>
                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {form.eventDate}
                          </div>
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                            </svg>
                            {form.responses} responses
                          </div>
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            {form.averageRating} average rating
                          </div>
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                            {form.link}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors duration-200">
                          View Results
                        </button>
                        <a 
                          href={`/form/${form.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors duration-200"
                        >
                          Preview Form
                        </a>
                        <button className="px-3 py-2 bg-gray-700 text-sm text-gray-300 rounded-md hover:bg-gray-600 transition-colors duration-200">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                          </svg>
                        </button>
                        <button className="px-3 py-2 bg-gray-700 text-sm text-gray-300 rounded-md hover:bg-gray-600 transition-colors duration-200">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Pagination */}
            <div className="p-4 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between">
              <div className="text-sm text-gray-500 mb-4 sm:mb-0">
                Showing <span className="font-medium">5</span> of <span className="font-medium">5</span> forms
              </div>
              <button
                onClick={() => setActiveTab('create')}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create New Form
              </button>
            </div>
          </div>
        )}
        
        {/* Analytics Dashboard */}
        {activeTab === 'responses' && (
          <div className="bg-black rounded-b-xl rounded-tr-xl border border-gray-800 overflow-hidden">
            <div className="p-6 border-b border-gray-800">
              <h2 className="text-xl font-semibold mb-4">Response Analytics</h2>
              <p className="text-gray-400">
                Select a form to view detailed response analytics with charts and statistics.
              </p>
              
              <div className="mt-6">
                <label htmlFor="form-select" className="block text-sm font-medium text-gray-400 mb-2">
                  Select Form
                </label>
                <select 
                  id="form-select"
                  className="w-full max-w-md px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                >
                  <option value="">Choose a form</option>
                  {feedbackForms.map(form => (
                    <option key={form.id} value={form.id}>{form.title}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="p-8 flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Select a form to view analytics</h3>
              <p className="text-gray-400 max-w-lg">
                Once you select a form, you'll see real-time analytics including response rates, rating distributions, and common themes from text responses.
              </p>
            </div>
          </div>
        )}
        
        {/* Templates */}
        {activeTab === 'templates' && (
          <div className="bg-black rounded-b-xl rounded-tr-xl border border-gray-800 overflow-hidden">
            <div className="p-6 border-b border-gray-800">
              <h2 className="text-xl font-semibold mb-4">Templates</h2>
              <p className="text-gray-400">
                Choose from pre-built templates to quickly create feedback forms for common scenarios.
              </p>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden hover:border-blue-500 cursor-pointer transition-colors duration-200">
                <div className="p-6">
                  <div className="h-12 w-12 bg-blue-900 rounded-lg mb-4 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Event Feedback</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    For conferences, workshops, meetups and other events. Includes questions about content, speakers, and venue.
                  </p>
                  <button className="w-full px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors duration-200">
                    Use Template
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden hover:border-blue-500 cursor-pointer transition-colors duration-200">
                <div className="p-6">
                  <div className="h-12 w-12 bg-green-900 rounded-lg mb-4 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Course Evaluation</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    For academic courses or training sessions. Includes questions about instructor effectiveness and material quality.
                  </p>
                  <button className="w-full px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors duration-200">
                    Use Template
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden hover:border-blue-500 cursor-pointer transition-colors duration-200">
                <div className="p-6">
                  <div className="h-12 w-12 bg-purple-900 rounded-lg mb-4 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Speaker Evaluation</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    For evaluating presenters or speakers. Includes questions about delivery, content clarity, and audience engagement.
                  </p>
                  <button className="w-full px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors duration-200">
                    Use Template
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Feedback
