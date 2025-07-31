import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import FormBranchingLogic from '../components/FormBranchingLogic'
import UserRolesPermissions from '../components/UserRolesPermissions'
import EmailNotifications from '../components/EmailNotifications'
import FormEmbedding from '../components/FormEmbedding'

const FormSettings = () => {
  const { formId } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState(null)
  const [activeTab, setActiveTab] = useState('branching')
  
  // Mock users for the permissions component
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'admin',
      permissions: {
        createForms: true,
        editForms: true,
        deleteForms: true,
        viewResponses: true,
        exportData: true,
        inviteUsers: true,
        manageUsers: true
      }
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'editor',
      permissions: {
        createForms: true,
        editForms: true,
        deleteForms: false,
        viewResponses: true,
        exportData: true,
        inviteUsers: false,
        manageUsers: false
      }
    }
  ])
  
  // Mock notification settings
  const [notificationSettings, setNotificationSettings] = useState(null)
  
  // Simulating API call to fetch form data
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

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800))
        
        if (mockForms[formId]) {
          setFormData(mockForms[formId])
          
          // Set notification settings with mock data
          setNotificationSettings({
            newResponse: true,
            dailySummary: false,
            weeklySummary: true,
            responseThreshold: false,
            thresholdValue: 100,
            emailRecipients: [
              { id: 1, email: 'notifications@example.com', notifications: ['newResponse', 'weeklySummary'] }
            ],
            customMessages: {
              newResponse: `You have received a new feedback submission for: ${mockForms[formId].title}`,
              dailySummary: 'Your daily feedback summary is ready: {{count}} new responses today',
              weeklySummary: 'Your weekly feedback summary is ready: {{count}} responses this week',
              responseThreshold: `Your form "${mockForms[formId].title}" has reached {{threshold}}% completion`
            }
          })
        } else {
          toast.error('Form not found')
          navigate('/feedback')
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        toast.error('Error loading form data')
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [formId, navigate])
  
  // Handle user updates
  const handleUpdateUser = (action, user) => {
    if (action === 'add') {
      setUsers([...users, user])
      toast.success('Team member added successfully')
    } else if (action === 'update') {
      setUsers(users.map(u => u.id === user.id ? user : u))
      toast.success('Team member updated successfully')
    } else if (action === 'delete') {
      setUsers(users.filter(u => u.id !== user.id))
      toast.success('Team member removed successfully')
    }
  }
  
  // Handle notification settings update
  const handleUpdateNotifications = (updatedSettings) => {
    setNotificationSettings(updatedSettings)
    toast.success('Notification settings updated successfully')
  }
  
  // Handle branching logic update
  const handleUpdateBranchingLogic = (rules) => {
    console.log('Branching logic updated:', rules)
    toast.success('Branching logic updated successfully')
    // In a real app, you would save this to your backend
  }
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }
  
  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{formData.title}</h1>
          <p className="text-gray-400">{formData.eventName} | {formData.eventDate}</p>
        </div>
        <div className="mt-4 md:mt-0">
          <button 
            onClick={() => navigate(`/analytics/${formId}`)}
            className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors mr-2"
          >
            View Analytics
          </button>
          <button 
            onClick={() => navigate(`/template-preview/${formId}`)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Preview Form
          </button>
        </div>
      </div>
      
      {/* Settings Tabs */}
      <div className="border-b border-gray-700 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('branching')}
            className={`py-4 px-1 inline-flex items-center ${
              activeTab === 'branching'
                ? 'border-b-2 border-blue-500 text-blue-400'
                : 'text-gray-400 hover:text-gray-300 hover:border-gray-300'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
            Branching Logic
          </button>
          <button
            onClick={() => setActiveTab('team')}
            className={`py-4 px-1 inline-flex items-center ${
              activeTab === 'team'
                ? 'border-b-2 border-blue-500 text-blue-400'
                : 'text-gray-400 hover:text-gray-300 hover:border-gray-300'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Team & Permissions
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`py-4 px-1 inline-flex items-center ${
              activeTab === 'notifications'
                ? 'border-b-2 border-blue-500 text-blue-400'
                : 'text-gray-400 hover:text-gray-300 hover:border-gray-300'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            Email Notifications
          </button>
          <button
            onClick={() => setActiveTab('embed')}
            className={`py-4 px-1 inline-flex items-center ${
              activeTab === 'embed'
                ? 'border-b-2 border-blue-500 text-blue-400'
                : 'text-gray-400 hover:text-gray-300 hover:border-gray-300'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            Embed Form
          </button>
        </nav>
      </div>
      
      {/* Active Tab Content */}
      <div className="mb-8">
        {activeTab === 'branching' && (
          <FormBranchingLogic 
            formQuestions={formData.questions} 
            onUpdate={handleUpdateBranchingLogic} 
          />
        )}
        
        {activeTab === 'team' && (
          <UserRolesPermissions 
            users={users} 
            onUpdateUser={handleUpdateUser} 
          />
        )}
        
        {activeTab === 'notifications' && (
          <EmailNotifications 
            notificationSettings={notificationSettings} 
            onUpdate={handleUpdateNotifications} 
          />
        )}
        
        {activeTab === 'embed' && (
          <FormEmbedding 
            formId={formId} 
            formTitle={formData.title} 
          />
        )}
      </div>
    </div>
  )
}

export default FormSettings
