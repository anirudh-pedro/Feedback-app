import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Templates = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState('all')
  
  // Sample templates data
  const templates = [
    {
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
    {
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
    {
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
    {
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
    {
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
    {
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
  ]

  // Filter templates based on search query and category
  const filteredTemplates = templates.filter(template => {
    const matchesQuery = template.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         template.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = category === 'all' || template.category === category
    return matchesQuery && matchesCategory
  })

  // Use a template to create a new form
  const useTemplate = (templateId) => {
    const template = templates.find(t => t.id === templateId)
    if (!template) return
    
    // In a real app, you would create a new form based on this template
    // For now, just simulate it
    toast.success('Template applied! Customize your form now.')
    
    // Navigate to the feedback page with the template
    navigate('/feedback', { state: { template } })
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Form Templates</h1>
          <p className="text-gray-400 mt-2">Choose a template to quickly create professional feedback forms</p>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 mb-8">
          <div className="relative max-w-md w-full">
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={() => setCategory('all')} 
              className={`px-4 py-2 rounded-md ${category === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            >
              All
            </button>
            <button 
              onClick={() => setCategory('events')} 
              className={`px-4 py-2 rounded-md ${category === 'events' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            >
              Events
            </button>
            <button 
              onClick={() => setCategory('education')} 
              className={`px-4 py-2 rounded-md ${category === 'education' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            >
              Education
            </button>
            <button 
              onClick={() => setCategory('business')} 
              className={`px-4 py-2 rounded-md ${category === 'business' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            >
              Business
            </button>
          </div>
        </div>
        
        {filteredTemplates.length === 0 ? (
          <div className="bg-black border border-gray-800 rounded-xl p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-medium text-white mb-2">No templates found</h3>
            <p className="text-gray-400 mb-4">
              Try adjusting your search or filter to find what you're looking for.
            </p>
            <button 
              onClick={() => { setSearchQuery(''); setCategory('all'); }} 
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map(template => (
              <div key={template.id} className="bg-black border border-gray-800 rounded-xl overflow-hidden">
                <div className="p-6">
                  <div className="mb-4">
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full 
                      ${template.category === 'events' ? 'bg-purple-900 text-purple-200' : 
                        template.category === 'education' ? 'bg-green-900 text-green-200' : 
                        'bg-blue-900 text-blue-200'}`}
                    >
                      {template.category.charAt(0).toUpperCase() + template.category.slice(1)}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-medium text-white mb-2">{template.title}</h3>
                  <p className="text-gray-400 mb-4">{template.description}</p>
                  
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center text-sm text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {template.uses.toLocaleString()} uses
                    </div>
                    <div className="flex items-center">
                      <span className="text-yellow-400 mr-1">{template.rating}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-800 pt-4">
                    <div className="text-sm text-gray-400 mb-3">
                      <strong>{template.questions.length}</strong> questions included:
                    </div>
                    <ul className="space-y-2 max-h-32 overflow-y-auto mb-4 pr-2 custom-scrollbar">
                      {template.questions.map(question => (
                        <li key={question.id} className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2 mt-0.5 flex-shrink-0 ${question.type === 'rating' ? 'text-yellow-500' : 'text-blue-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {question.type === 'rating' ? (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            ) : (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            )}
                          </svg>
                          <span className="text-gray-300 text-sm">{question.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="bg-gray-900 p-4 flex justify-between">
                  <button 
                    onClick={() => navigate(`/preview-template/${template.id}`)} 
                    className="px-4 py-2 bg-gray-800 text-white text-sm rounded-md hover:bg-gray-700 transition-colors duration-200"
                  >
                    Preview
                  </button>
                  <button 
                    onClick={() => useTemplate(template.id)}
                    className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors duration-200"
                  >
                    Use Template
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-12 bg-gradient-to-r from-blue-900 to-purple-900 rounded-xl p-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-6">
              <h3 className="text-2xl font-bold text-white mb-2">Can't find what you need?</h3>
              <p className="text-blue-200">
                Create a custom feedback form from scratch with our easy-to-use form builder.
              </p>
            </div>
            <button 
              onClick={() => navigate('/feedback')} 
              className="px-6 py-3 bg-white text-purple-900 font-medium rounded-md hover:bg-blue-100 transition-colors duration-200"
            >
              Create Custom Form
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Templates
