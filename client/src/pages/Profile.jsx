import React, { useState } from 'react'
import { toast } from 'react-toastify'

const Profile = () => {
  const [activeTab, setActiveTab] = useState('personal')
  const [profileData, setProfileData] = useState({
    firstName: 'Alex',
    lastName: 'Morgan',
    email: 'alex.morgan@example.com',
    organization: 'Tech University',
    role: 'Professor',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    emailNotifications: true,
    browserNotifications: false
  })
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setProfileData({
      ...profileData,
      [name]: type === 'checkbox' ? checked : value
    })
  }
  
  const handlePersonalInfoSubmit = (e) => {
    e.preventDefault()
    // In a real app, you would send this data to your backend
    toast.success('Profile information updated successfully!')
  }
  
  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    
    if (!profileData.currentPassword) {
      toast.error('Please enter your current password')
      return
    }
    
    if (profileData.newPassword !== profileData.confirmNewPassword) {
      toast.error('New passwords do not match')
      return
    }
    
    if (profileData.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long')
      return
    }
    
    // In a real app, you would send this data to your backend
    toast.success('Password updated successfully!')
    
    // Reset password fields
    setProfileData({
      ...profileData,
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    })
  }
  
  const handleNotificationSubmit = (e) => {
    e.preventDefault()
    // In a real app, you would send this data to your backend
    toast.success('Notification preferences updated successfully!')
  }
  
  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Account Settings</h1>
          <p className="text-gray-400 mt-2">Manage your account settings and preferences</p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-black rounded-xl border border-gray-800 overflow-hidden">
              <div className="p-6 border-b border-gray-800">
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                    {profileData.firstName[0]}{profileData.lastName[0]}
                  </div>
                  <h3 className="text-xl font-medium text-white">
                    {profileData.firstName} {profileData.lastName}
                  </h3>
                  <p className="text-gray-500 text-sm">{profileData.email}</p>
                </div>
              </div>
              
              <div className="p-4">
                <nav>
                  <ul className="space-y-2">
                    <li>
                      <button 
                        className={`w-full px-4 py-3 text-left rounded-md ${activeTab === 'personal' ? 'bg-blue-900 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
                        onClick={() => setActiveTab('personal')}
                      >
                        Personal Information
                      </button>
                    </li>
                    <li>
                      <button 
                        className={`w-full px-4 py-3 text-left rounded-md ${activeTab === 'password' ? 'bg-blue-900 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
                        onClick={() => setActiveTab('password')}
                      >
                        Change Password
                      </button>
                    </li>
                    <li>
                      <button 
                        className={`w-full px-4 py-3 text-left rounded-md ${activeTab === 'notifications' ? 'bg-blue-900 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
                        onClick={() => setActiveTab('notifications')}
                      >
                        Notifications
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="lg:flex-1">
            <div className="bg-black rounded-xl border border-gray-800 overflow-hidden">
              {activeTab === 'personal' && (
                <div className="p-6">
                  <h2 className="text-xl font-medium text-white mb-6">Personal Information</h2>
                  <form onSubmit={handlePersonalInfoSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-gray-400 mb-2" htmlFor="firstName">
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={profileData.firstName}
                          onChange={handleChange}
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-2" htmlFor="lastName">
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={profileData.lastName}
                          onChange={handleChange}
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-gray-400 mb-2" htmlFor="email">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                        required
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-gray-400 mb-2" htmlFor="organization">
                        Organization
                      </label>
                      <input
                        type="text"
                        id="organization"
                        name="organization"
                        value={profileData.organization}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-gray-400 mb-2" htmlFor="role">
                        Role
                      </label>
                      <input
                        type="text"
                        id="role"
                        name="role"
                        value={profileData.role}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              )}
              
              {activeTab === 'password' && (
                <div className="p-6">
                  <h2 className="text-xl font-medium text-white mb-6">Change Password</h2>
                  <form onSubmit={handlePasswordSubmit}>
                    <div className="mb-6">
                      <label className="block text-gray-400 mb-2" htmlFor="currentPassword">
                        Current Password
                      </label>
                      <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        value={profileData.currentPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                        required
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-gray-400 mb-2" htmlFor="newPassword">
                        New Password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={profileData.newPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                        required
                      />
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-gray-400 mb-2" htmlFor="confirmNewPassword">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        id="confirmNewPassword"
                        name="confirmNewPassword"
                        value={profileData.confirmNewPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                        required
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
                      >
                        Update Password
                      </button>
                    </div>
                  </form>
                </div>
              )}
              
              {activeTab === 'notifications' && (
                <div className="p-6">
                  <h2 className="text-xl font-medium text-white mb-6">Notification Settings</h2>
                  <form onSubmit={handleNotificationSubmit}>
                    <div className="mb-6">
                      <div className="flex items-center justify-between py-4 border-b border-gray-800">
                        <div>
                          <h3 className="text-white font-medium">Email Notifications</h3>
                          <p className="text-sm text-gray-500">Receive email notifications when you get new responses</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            name="emailNotifications"
                            checked={profileData.emailNotifications}
                            onChange={handleChange}
                          />
                          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between py-4 border-b border-gray-800">
                        <div>
                          <h3 className="text-white font-medium">Browser Notifications</h3>
                          <p className="text-sm text-gray-500">Receive browser notifications when you get new responses</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer"
                            name="browserNotifications"
                            checked={profileData.browserNotifications}
                            onChange={handleChange}
                          />
                          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
                      >
                        Save Preferences
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
