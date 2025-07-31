import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import ChartComponent from '../components/ChartComponent'

const Analytics = () => {
  const { formId } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState(null)
  const [responses, setResponses] = useState([])
  const [activeTab, setActiveTab] = useState('summary')
  
  // Simulating API call to fetch form data and responses
  useEffect(() => {
    const fetchData = async () => {
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
            ],
            responses: 34,
            averageRating: 4.5,
            dateCreated: "2025-07-25"
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
            ],
            responses: 122,
            averageRating: 4.2,
            dateCreated: "2025-07-10"
          },
          "library-workshop": {
            id: "library-workshop",
            title: "Library Workshop Feedback",
            eventName: "Research Methods Workshop",
            eventDate: "2025-07-22",
            questions: [
              { id: 1, type: 'rating', text: 'How useful was this workshop for your research?', required: true },
              { id: 2, type: 'text', text: 'What topics would you like covered in future workshops?', required: false }
            ],
            responses: 18,
            averageRating: 3.7,
            dateCreated: "2025-07-20"
          }
        }
        
        const mockResponses = {
          "tech-meetup": [
            { 
              id: 1, 
              date: '2025-07-28T14:23:10Z', 
              answers: { 
                1: 5, 
                2: "The networking opportunities and the AI demo were fantastic!",
                3: "Longer Q&A sessions would be great.",
                4: 5
              }
            },
            { 
              id: 2, 
              date: '2025-07-28T15:45:22Z', 
              answers: { 
                1: 4, 
                2: "The speakers were very knowledgeable.",
                3: "More hands-on workshops would be nice.",
                4: 4
              }
            },
            { 
              id: 3, 
              date: '2025-07-28T16:12:45Z', 
              answers: { 
                1: 5, 
                2: "The career insights from industry professionals.",
                3: "Nothing, it was perfect!",
                4: 5
              }
            },
          ],
          "orientation": [
            { 
              id: 1, 
              date: '2025-07-15T09:15:30Z', 
              answers: { 
                1: 5, 
                2: 4,
                3: "A map of all food options on campus would be helpful."
              }
            },
            { 
              id: 2, 
              date: '2025-07-15T10:20:15Z', 
              answers: { 
                1: 4, 
                2: 5,
                3: "More information about clubs and activities."
              }
            }
          ],
          "library-workshop": [
            { 
              id: 1, 
              date: '2025-07-22T13:10:05Z', 
              answers: { 
                1: 4, 
                2: "More focus on specialized research databases."
              }
            },
            { 
              id: 2, 
              date: '2025-07-22T14:30:45Z', 
              answers: { 
                1: 3, 
                2: "Citation techniques for different academic standards."
              }
            }
          ]
        }

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800))
        
        if (mockForms[formId] && mockResponses[formId]) {
          setFormData(mockForms[formId])
          setResponses(mockResponses[formId])
        } else {
          toast.error('Form or response data not found')
          navigate('/feedback')
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        toast.error('Error loading analytics data')
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [formId, navigate])
  
  // Calculate summary statistics
  const getSummaryStats = () => {
    if (!formData || !responses || responses.length === 0) return null
    
    const ratingQuestions = formData.questions.filter(q => q.type === 'rating')
    
    const stats = ratingQuestions.map(question => {
      const allRatings = responses
        .map(r => r.answers[question.id])
        .filter(rating => typeof rating === 'number')
      
      const totalRatings = allRatings.length
      const averageRating = totalRatings > 0
        ? allRatings.reduce((sum, rating) => sum + rating, 0) / totalRatings
        : 0
      
      const ratingCounts = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}
      allRatings.forEach(rating => {
        if (ratingCounts[rating] !== undefined) {
          ratingCounts[rating]++
        }
      })
      
      return {
        questionId: question.id,
        questionText: question.text,
        averageRating,
        totalRatings,
        ratingCounts
      }
    })
    
    return stats
  }
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }
  
  // Generate a percentage bar style based on value
  const getPercentageBarStyle = (value, max) => {
    const percentage = max > 0 ? (value / max) * 100 : 0
    return {
      width: `${percentage}%`
    }
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
          <h2 className="text-2xl font-bold text-white mb-2">Loading Analytics...</h2>
          <p className="text-gray-400">
            Please wait while we analyze your feedback data.
          </p>
        </div>
      </div>
    )
  }

  const summaryStats = getSummaryStats()

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="mb-6 md:mb-0">
              <h1 className="text-3xl font-bold text-white">{formData.title} Analytics</h1>
              <p className="text-gray-400 mt-1">{formData.eventName} • {formData.eventDate}</p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <button 
                onClick={() => navigate('/edit-form/' + formId)} 
                className="px-4 py-2 bg-gray-700 text-white font-medium rounded-md hover:bg-gray-600 transition-colors duration-200 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Form
              </button>
              <button 
                onClick={() => navigate('/feedback')} 
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Forms
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-black border border-gray-800 rounded-xl p-6">
            <div className="flex flex-col items-center">
              <div className="text-blue-400 text-4xl font-bold mb-2">{responses.length}</div>
              <p className="text-gray-400">Total Responses</p>
            </div>
          </div>
          <div className="bg-black border border-gray-800 rounded-xl p-6">
            <div className="flex flex-col items-center">
              <div className="text-yellow-400 text-4xl font-bold mb-2">{formData.averageRating.toFixed(1)}</div>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${star <= Math.round(formData.averageRating) ? 'text-yellow-400' : 'text-gray-600'}`} viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-black border border-gray-800 rounded-xl p-6">
            <div className="flex flex-col items-center">
              <div className="text-green-400 text-4xl font-bold mb-2">
                {responses.length > 0 ? Math.round((responses.filter(r => r.answers[4] >= 4).length / responses.length) * 100) : 0}%
              </div>
              <p className="text-gray-400">Would Recommend</p>
            </div>
          </div>
        </div>
        
        <div className="bg-black border border-gray-800 rounded-xl overflow-hidden mb-8">
          <div className="border-b border-gray-800">
            <div className="flex">
              <button
                onClick={() => setActiveTab('summary')}
                className={`px-6 py-4 font-medium ${activeTab === 'summary' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-gray-400 hover:text-white'}`}
              >
                Summary
              </button>
              <button
                onClick={() => setActiveTab('responses')}
                className={`px-6 py-4 font-medium ${activeTab === 'responses' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-gray-400 hover:text-white'}`}
              >
                Individual Responses
              </button>
              <button
                onClick={() => setActiveTab('export')}
                className={`px-6 py-4 font-medium ${activeTab === 'export' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-gray-400 hover:text-white'}`}
              >
                Export Data
              </button>
            </div>
          </div>
          
          <div className="p-6">
            {activeTab === 'summary' && (
              <div>
                {/* Overall Form Stats Dashboard */}
                <div className="mb-10">
                  <h2 className="text-xl font-bold text-white mb-6">Form Overview</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-black border border-gray-800 rounded-lg p-5">
                      <div className="flex items-start mb-2">
                        <div className="bg-blue-900 bg-opacity-50 p-2 rounded-lg mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Total Responses</p>
                          <h3 className="text-3xl font-bold text-white">{formData?.responses || 0}</h3>
                        </div>
                      </div>
                      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full" 
                          style={{ width: `${Math.min(100, formData?.responses || 0)}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="bg-black border border-gray-800 rounded-lg p-5">
                      <div className="flex items-start mb-2">
                        <div className="bg-yellow-900 bg-opacity-50 p-2 rounded-lg mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Average Rating</p>
                          <h3 className="text-3xl font-bold text-white">{formData?.averageRating?.toFixed(1) || 'N/A'}</h3>
                        </div>
                      </div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${star <= Math.round(formData?.averageRating || 0) ? 'text-yellow-400' : 'text-gray-600'}`} viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-black border border-gray-800 rounded-lg p-5">
                      <div className="flex items-start mb-2">
                        <div className="bg-green-900 bg-opacity-50 p-2 rounded-lg mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Completion Rate</p>
                          <h3 className="text-3xl font-bold text-white">94%</h3>
                        </div>
                      </div>
                      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: '94%' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Response Trend Chart */}
                  <div className="mb-8">
                    <ChartComponent
                      type="line"
                      height="h-80"
                      options={{ 
                        title: 'Response Trend (Last 7 Days)'
                      }}
                      data={{
                        labels: ['Jul 25', 'Jul 26', 'Jul 27', 'Jul 28', 'Jul 29', 'Jul 30', 'Jul 31'],
                        datasets: [{
                          label: 'Responses',
                          data: [4, 7, 5, 9, 3, 6, 8],
                          backgroundColor: 'rgba(59, 130, 246, 0.5)',
                          borderColor: '#3B82F6'
                        }]
                      }}
                    />
                  </div>
                  
                  {/* Response Distribution Charts */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <ChartComponent
                      type="pie"
                      options={{ 
                        title: 'Responses by Device',
                        legend: true
                      }}
                      data={{
                        labels: ['Mobile', 'Desktop', 'Tablet'],
                        datasets: [{
                          data: [65, 25, 10],
                          backgroundColor: ['#3B82F6', '#8B5CF6', '#EC4899']
                        }]
                      }}
                    />
                    
                    <ChartComponent
                      type="doughnut"
                      options={{ 
                        title: 'Completion Time',
                        legend: true
                      }}
                      data={{
                        labels: ['Under 1 min', '1-3 mins', '3+ mins'],
                        datasets: [{
                          data: [20, 60, 20],
                          backgroundColor: ['#10B981', '#6366F1', '#F59E0B']
                        }]
                      }}
                    />
                  </div>
                </div>
                
                {/* Individual Question Analysis */}
                <h2 className="text-xl font-bold text-white mb-6">Question Analysis</h2>
                {summaryStats && summaryStats.map(stat => (
                  <div key={stat.questionId} className="mb-10 border border-gray-800 rounded-lg p-6">
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-white mb-2">{stat.questionText}</h3>
                      <div className="flex items-center">
                        <div className="text-2xl font-bold text-yellow-400 mr-3">{stat.averageRating.toFixed(1)}</div>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg key={star} xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${star <= Math.round(stat.averageRating) ? 'text-yellow-400' : 'text-gray-600'}`} viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="ml-2 text-gray-400">({stat.totalRatings} responses)</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Rating Distribution Chart */}
                    <ChartComponent
                      type="bar"
                      options={{ 
                        title: 'Rating Distribution'
                      }}
                      data={{
                        labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
                        datasets: [{
                          data: stat.distribution || [
                            Math.floor(Math.random() * 5), 
                            Math.floor(Math.random() * 10), 
                            Math.floor(Math.random() * 15), 
                            Math.floor(Math.random() * 20), 
                            Math.floor(Math.random() * 15)
                          ],
                          backgroundColor: ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6']
                        }]
                      }}
                    />
                    
                    <div className="space-y-2">
                      {Object.entries(stat.ratingCounts).map(([rating, count]) => {
                        const maxCount = Math.max(...Object.values(stat.ratingCounts))
                        return (
                          <div key={rating} className="flex items-center">
                            <div className="w-8 text-right mr-2 text-gray-400">{rating}</div>
                            <div className="flex-1 bg-gray-800 h-6 rounded-md overflow-hidden">
                              <div 
                                className="bg-blue-600 h-full rounded-md" 
                                style={getPercentageBarStyle(count, maxCount)}
                              ></div>
                            </div>
                            <div className="w-12 text-right ml-2 text-gray-400">{count}</div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
                
                {formData.questions.filter(q => q.type === 'text').map(question => (
                  <div key={question.id} className="mb-8">
                    <h3 className="text-lg font-medium text-white mb-4">{question.text}</h3>
                    
                    <div className="space-y-3">
                      {responses.filter(r => r.answers[question.id]).map(response => (
                        <div key={`${response.id}-${question.id}`} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                          <p className="text-gray-300">{response.answers[question.id]}</p>
                          <div className="mt-2 text-xs text-gray-500">{formatDate(response.date)}</div>
                        </div>
                      ))}
                      
                      {responses.filter(r => r.answers[question.id]).length === 0 && (
                        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 text-center">
                          <p className="text-gray-500">No responses for this question yet</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {activeTab === 'responses' && (
              <div>
                {responses.length === 0 ? (
                  <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 text-center">
                    <p className="text-gray-400">No responses have been submitted yet.</p>
                  </div>
                ) : (
                  <div>
                    {responses.map((response) => (
                      <div key={response.id} className="mb-6 bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                        <div className="p-4 border-b border-gray-700 bg-gray-800 flex justify-between items-center">
                          <div>
                            <span className="text-sm text-gray-400">
                              Response #{response.id}
                            </span>
                          </div>
                          <div className="text-sm text-gray-500">
                            {formatDate(response.date)}
                          </div>
                        </div>
                        
                        <div className="p-4">
                          {formData.questions.map(question => (
                            <div key={question.id} className="mb-4 pb-4 border-b border-gray-700 last:border-b-0 last:mb-0 last:pb-0">
                              <h4 className="text-sm font-medium text-white mb-2">{question.text}</h4>
                              
                              {question.type === 'rating' && response.answers[question.id] && (
                                <div className="flex items-center">
                                  <div className="text-lg font-bold text-yellow-400 mr-2">{response.answers[question.id]}</div>
                                  <div className="flex">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <svg key={star} xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${star <= response.answers[question.id] ? 'text-yellow-400' : 'text-gray-600'}`} viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                      </svg>
                                    ))}
                                  </div>
                                </div>
                              )}
                              
                              {question.type === 'text' && (
                                <p className="text-gray-300">
                                  {response.answers[question.id] || <span className="text-gray-500">No response</span>}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'export' && (
              <div>
                <p className="text-gray-400 mb-6">
                  Export your feedback responses in various formats for further analysis or reporting.
                </p>

                {/* Export Options Selection */}
                <div className="mb-8">
                  <h3 className="text-white text-lg font-medium mb-4">Export Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-800 rounded-lg border border-gray-700 p-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Date Range</label>
                      <div className="flex space-x-3">
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">From</label>
                          <input type="date" className="bg-gray-900 text-white text-sm rounded-md border border-gray-700 px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-500" />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">To</label>
                          <input type="date" className="bg-gray-900 text-white text-sm rounded-md border border-gray-700 px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-500" />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Data Privacy</label>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input id="anonymized" type="radio" name="privacy" className="h-4 w-4 text-blue-600" defaultChecked />
                          <label htmlFor="anonymized" className="ml-2 block text-sm text-gray-300">Anonymized data</label>
                        </div>
                        <div className="flex items-center">
                          <input id="complete" type="radio" name="privacy" className="h-4 w-4 text-blue-600" />
                          <label htmlFor="complete" className="ml-2 block text-sm text-gray-300">Complete data (includes timestamps)</label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Include</label>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input id="include-summary" type="checkbox" className="h-4 w-4 text-blue-600 rounded" defaultChecked />
                          <label htmlFor="include-summary" className="ml-2 block text-sm text-gray-300">Summary statistics</label>
                        </div>
                        <div className="flex items-center">
                          <input id="include-charts" type="checkbox" className="h-4 w-4 text-blue-600 rounded" defaultChecked />
                          <label htmlFor="include-charts" className="ml-2 block text-sm text-gray-300">Charts and visualizations</label>
                        </div>
                        <div className="flex items-center">
                          <input id="include-individual" type="checkbox" className="h-4 w-4 text-blue-600 rounded" defaultChecked />
                          <label htmlFor="include-individual" className="ml-2 block text-sm text-gray-300">Individual responses</label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Format Options</label>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <select className="bg-gray-900 text-white text-sm rounded-md border border-gray-700 px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-500">
                            <option>All questions</option>
                            <option>Only rating questions</option>
                            <option>Only text questions</option>
                            <option>Custom selection...</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-white text-lg font-medium mb-4">Available Formats</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="text-lg font-medium text-white mb-2">Excel Spreadsheet</h3>
                    <p className="text-sm text-gray-400 text-center mb-4">
                      Export all responses in a formatted Excel spreadsheet with multiple worksheets for analysis
                    </p>
                    <button className="px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors duration-200 mt-auto">
                      Download .xlsx
                    </button>
                  </div>
                  
                  <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                    </svg>
                    <h3 className="text-lg font-medium text-white mb-2">CSV File</h3>
                    <p className="text-sm text-gray-400 text-center mb-4">
                      Export raw data in a CSV file format for custom analysis in spreadsheet software
                    </p>
                    <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors duration-200 mt-auto">
                      Download .csv
                    </button>
                  </div>
                  
                  <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <h3 className="text-lg font-medium text-white mb-2">PDF Report</h3>
                    <p className="text-sm text-gray-400 text-center mb-4">
                      Generate a comprehensive PDF report with charts, summaries and detailed analysis
                    </p>
                    <button className="px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors duration-200 mt-auto">
                      Download .pdf
                    </button>
                  </div>

                  <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-yellow-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <h3 className="text-lg font-medium text-white mb-2">JSON Data</h3>
                    <p className="text-sm text-gray-400 text-center mb-4">
                      Export raw data in JSON format for developers or API integration
                    </p>
                    <button className="px-4 py-2 bg-yellow-600 text-white text-sm rounded-md hover:bg-yellow-700 transition-colors duration-200 mt-auto">
                      Download .json
                    </button>
                  </div>
                  
                  <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <h3 className="text-lg font-medium text-white mb-2">Image Pack</h3>
                    <p className="text-sm text-gray-400 text-center mb-4">
                      Download all charts and visualizations as high-resolution images
                    </p>
                    <button className="px-4 py-2 bg-purple-600 text-white text-sm rounded-md hover:bg-purple-700 transition-colors duration-200 mt-auto">
                      Download .zip
                    </button>
                  </div>
                  
                  <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-pink-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <h3 className="text-lg font-medium text-white mb-2">Interactive HTML</h3>
                    <p className="text-sm text-gray-400 text-center mb-4">
                      Generate an interactive HTML report with dynamic charts and filters
                    </p>
                    <button className="px-4 py-2 bg-pink-600 text-white text-sm rounded-md hover:bg-pink-700 transition-colors duration-200 mt-auto">
                      Download .html
                    </button>
                  </div>
                </div>
                
                {/* Scheduled Reports Feature */}
                <div className="mt-8 bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg p-6">
                  <div className="flex flex-col md:flex-row md:items-center">
                    <div className="mb-4 md:mb-0 md:mr-6">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="md:flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">Scheduled Reports</h3>
                      <p className="text-blue-200 mb-4">
                        Set up automatic reports to be delivered to your email on a schedule. Choose the frequency, format, and recipients to keep your team updated.
                      </p>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">
                        Set Up Scheduled Reports
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 bg-blue-900 bg-opacity-30 border border-blue-800 rounded-lg p-4">
                  <div className="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-blue-200">
                      Exported data contains all responses collected since the form was created. Responses are anonymized by default to protect participant privacy unless otherwise specified in the export settings.
                    </p>
                  </div>
                </div>
                
                {/* Export History */}
                <div className="mt-8">
                  <h3 className="text-white text-lg font-medium mb-4">Export History</h3>
                  <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-gray-900">
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date & Time</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Format</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">July 28, 2025 - 14:35</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">PDF Report</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">You</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            <button className="text-blue-400 hover:text-blue-300 mr-3">Download</button>
                            <button className="text-gray-400 hover:text-gray-300">Recreate</button>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">July 27, 2025 - 09:12</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">Excel Spreadsheet</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">You</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            <button className="text-blue-400 hover:text-blue-300 mr-3">Download</button>
                            <button className="text-gray-400 hover:text-gray-300">Recreate</button>
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">July 25, 2025 - 16:48</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">CSV File</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">Jane Smith</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            <button className="text-blue-400 hover:text-blue-300 mr-3">Download</button>
                            <button className="text-gray-400 hover:text-gray-300">Recreate</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
