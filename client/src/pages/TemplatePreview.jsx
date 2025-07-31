import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const TemplatePreview = () => {
  const { templateId } = useParams()
  const navigate = useNavigate()
  const [template, setTemplate] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentTab, setCurrentTab] = useState('preview')
  
  // Simulated fetch of template data
  useEffect(() => {
    const fetchTemplateData = async () => {
      setLoading(true)
      try {
        // In a real app, this would be an API call
        // Using the same template data structure as in Templates.jsx
        const templateData = {
          'event-feedback': {
            id: 'event-feedback',
            title: 'Event Feedback',
            category: 'events',
            description: 'Collect feedback about your events, workshops, or conferences.',
            uses: 2458,
            rating: 4.9,
            questions: [
              { id: 1, type: 'rating', text: 'How would you rate this event overall?', required: true },
              { id: 2, type: 'text', text: 'What aspects of the event did you enjoy most?', required: false },
              { id: 3, type: 'text', text: 'What could we improve for future events?', required: true },
              { id: 4, type: 'rating', text: 'How likely are you to attend similar events in the future?', required: true }
            ]
          },
          'course-evaluation': {
            id: 'course-evaluation',
            title: 'Course Evaluation',
            category: 'education',
            description: 'Get student feedback on course content, instruction, and materials.',
            uses: 1873,
            rating: 4.7,
            questions: [
              { id: 1, type: 'rating', text: 'How would you rate the course content?', required: true },
              { id: 2, type: 'rating', text: 'How would you rate the instructor?', required: true },
              { id: 3, type: 'text', text: 'What aspects of the course were most valuable?', required: false },
              { id: 4, type: 'text', text: 'What suggestions do you have for improving the course?', required: true }
            ]
          },
          'product-feedback': {
            id: 'product-feedback',
            title: 'Product Feedback',
            category: 'business',
            description: 'Gather customer feedback about your products or services.',
            uses: 3214,
            rating: 4.8,
            questions: [
              { id: 1, type: 'rating', text: 'How satisfied are you with our product?', required: true },
              { id: 2, type: 'text', text: 'What features do you like most?', required: false },
              { id: 3, type: 'text', text: 'What features could be improved?', required: false },
              { id: 4, type: 'rating', text: 'How likely are you to recommend our product to others?', required: true }
            ]
          },
          'meeting-feedback': {
            id: 'meeting-feedback',
            title: 'Meeting Feedback',
            category: 'business',
            description: 'Collect feedback to improve your team meetings.',
            uses: 1352,
            rating: 4.5,
            questions: [
              { id: 1, type: 'rating', text: 'How productive was this meeting?', required: true },
              { id: 2, type: 'text', text: 'What went well in today\'s meeting?', required: false },
              { id: 3, type: 'text', text: 'What could be improved for future meetings?', required: false },
              { id: 4, type: 'rating', text: 'How clear were the action items and next steps?', required: true }
            ]
          },
          'workshop-evaluation': {
            id: 'workshop-evaluation',
            title: 'Workshop Evaluation',
            category: 'events',
            description: 'Get feedback from workshop participants.',
            uses: 1105,
            rating: 4.6,
            questions: [
              { id: 1, type: 'rating', text: 'How would you rate the workshop content?', required: true },
              { id: 2, type: 'rating', text: 'How would you rate the workshop facilitator?', required: true },
              { id: 3, type: 'text', text: 'What did you find most useful about this workshop?', required: false },
              { id: 4, type: 'text', text: 'What additional topics would you like to see covered in future workshops?', required: false }
            ]
          },
          'customer-satisfaction': {
            id: 'customer-satisfaction',
            title: 'Customer Satisfaction',
            category: 'business',
            description: 'Measure and improve customer satisfaction.',
            uses: 4521,
            rating: 4.9,
            questions: [
              { id: 1, type: 'rating', text: 'How satisfied are you with our service?', required: true },
              { id: 2, type: 'rating', text: 'How would you rate our customer support?', required: true },
              { id: 3, type: 'text', text: 'What did we do well?', required: false },
              { id: 4, type: 'text', text: 'How can we improve your experience?', required: false },
              { id: 5, type: 'rating', text: 'How likely are you to use our services again?', required: true }
            ]
          }
        }
        
        if (templateData[templateId]) {
          setTemplate(templateData[templateId])
        }
        setLoading(false)
      } catch (error) {
        console.error('Error fetching template:', error)
        setLoading(false)
      }
    }
    
    fetchTemplateData()
  }, [templateId])
  
  // Render star ratings
  const renderStars = (count) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <svg 
            key={i}
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-5 w-5 ${i < count ? 'text-yellow-400' : 'text-gray-600'}`}
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    )
  }
  
  // Simulated responses for this template
  const renderExampleTab = () => {
    return (
      <div className="mt-6">
        <h3 className="text-lg font-medium text-white mb-4">Example Responses</h3>
        <div className="space-y-6">
          <div className="bg-black border border-gray-800 rounded-lg p-5">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-white font-medium">Response #1</h4>
                <p className="text-gray-400 text-sm">July 28, 2025</p>
              </div>
              {template?.questions.some(q => q.type === 'rating') && (
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-2">4.5</span>
                  {renderStars(4.5)}
                </div>
              )}
            </div>
            <div className="space-y-4">
              {template?.questions.map(question => (
                <div key={question.id}>
                  <p className="text-gray-300 text-sm mb-1">{question.text}</p>
                  {question.type === 'rating' ? (
                    <div className="flex items-center">
                      {renderStars(4)}
                    </div>
                  ) : (
                    <p className="text-white bg-gray-800 p-3 rounded">
                      {question.id === 2 
                        ? "The interactive sessions were excellent and the speaker was very engaging."
                        : question.id === 3 
                        ? "The venue could have been larger to accommodate everyone more comfortably."
                        : "This is a sample response for this question."}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-black border border-gray-800 rounded-lg p-5">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-white font-medium">Response #2</h4>
                <p className="text-gray-400 text-sm">July 27, 2025</p>
              </div>
              {template?.questions.some(q => q.type === 'rating') && (
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-2">5.0</span>
                  {renderStars(5)}
                </div>
              )}
            </div>
            <div className="space-y-4">
              {template?.questions.map(question => (
                <div key={question.id}>
                  <p className="text-gray-300 text-sm mb-1">{question.text}</p>
                  {question.type === 'rating' ? (
                    <div className="flex items-center">
                      {renderStars(5)}
                    </div>
                  ) : (
                    <p className="text-white bg-gray-800 p-3 rounded">
                      {question.id === 2 
                        ? "The networking opportunities and quality of presentations were outstanding."
                        : question.id === 3 
                        ? "More time for Q&A would be beneficial."
                        : "This is another sample response for this question."}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 pt-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!template) {
    return (
      <div className="min-h-screen bg-gray-900 pt-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-black border border-gray-800 rounded-xl p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-medium text-white mb-2">Template not found</h3>
            <p className="text-gray-400 mb-6">
              We couldn't find the template you're looking for.
            </p>
            <button 
              onClick={() => navigate('/templates')} 
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              Back to Templates
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-24 px-4 pb-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <button 
              onClick={() => navigate('/templates')} 
              className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-4"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to templates
            </button>
            <h1 className="text-3xl font-bold text-white">{template.title}</h1>
            <div className="flex items-center mt-2">
              <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mr-3
                ${template.category === 'events' ? 'bg-purple-900 text-purple-200' : 
                  template.category === 'education' ? 'bg-green-900 text-green-200' : 
                  'bg-blue-900 text-blue-200'}`}
              >
                {template.category.charAt(0).toUpperCase() + template.category.slice(1)}
              </span>
              <div className="flex items-center text-sm text-gray-400">
                <span className="text-yellow-400 mr-1">{template.rating}</span>
                {renderStars(template.rating)}
                <span className="mx-2 text-gray-600">|</span>
                <span>{template.uses.toLocaleString()} uses</span>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => navigate('/feedback', { state: { template } })}
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors duration-200 mt-4 sm:mt-0"
          >
            Use this Template
          </button>
        </div>
        
        <p className="text-gray-400 mb-8">{template.description}</p>
        
        <div className="border-b border-gray-800 mb-6">
          <div className="flex">
            <button 
              onClick={() => setCurrentTab('preview')}
              className={`py-3 px-4 font-medium text-sm border-b-2 ${
                currentTab === 'preview' 
                  ? 'border-blue-500 text-blue-400' 
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              Preview Form
            </button>
            <button 
              onClick={() => setCurrentTab('examples')}
              className={`py-3 px-4 font-medium text-sm border-b-2 ${
                currentTab === 'examples' 
                  ? 'border-blue-500 text-blue-400' 
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              Example Responses
            </button>
          </div>
        </div>
        
        {currentTab === 'preview' ? (
          <div className="bg-black border border-gray-800 rounded-xl p-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">{template.title}</h2>
              <p className="text-gray-400">Please provide your valuable feedback</p>
            </div>
            
            {template.questions.map((question, index) => (
              <div key={question.id} className="mb-8">
                <div className="flex items-start">
                  <span className="bg-gray-800 text-gray-300 w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    {index + 1}
                  </span>
                  <div className="w-full">
                    <label className="block text-white mb-2">
                      {question.text}
                      {question.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    
                    {question.type === 'rating' ? (
                      <div className="flex items-center">
                        <div className="flex space-x-2">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                              key={rating}
                              className="w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              {rating}
                            </button>
                          ))}
                        </div>
                        <div className="flex text-sm text-gray-400 ml-4">
                          <span className="mr-12">Poor</span>
                          <span>Excellent</span>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <textarea 
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                          placeholder="Your answer"
                          rows={4}
                        ></textarea>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            <div className="border-t border-gray-800 pt-6 mt-8">
              <p className="text-gray-400 text-sm mb-4">
                <span className="text-red-500">*</span> Required fields
              </p>
              <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200">
                Submit Feedback
              </button>
            </div>
          </div>
        ) : (
          renderExampleTab()
        )}
      </div>
    </div>
  )
}

export default TemplatePreview
