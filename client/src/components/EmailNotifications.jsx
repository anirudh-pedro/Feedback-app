import React, { useState } from 'react'

const EmailNotifications = ({ notificationSettings, onUpdate }) => {
  const [settings, setSettings] = useState(notificationSettings || {
    newResponse: true,
    dailySummary: false,
    weeklySummary: true,
    responseThreshold: true,
    thresholdValue: 50,
    emailRecipients: [
      { id: 1, email: 'your.email@example.com', notifications: ['newResponse', 'weeklySummary'] }
    ],
    customMessages: {
      newResponse: 'You have received a new feedback submission for: {{formName}}',
      dailySummary: 'Your daily feedback summary is ready: {{count}} new responses today',
      weeklySummary: 'Your weekly feedback summary is ready: {{count}} responses this week',
      responseThreshold: 'Your form "{{formName}}" has reached {{threshold}}% completion'
    }
  });
  
  const [showAddRecipientModal, setShowAddRecipientModal] = useState(false);
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);
  const [activeCustomTemplate, setActiveCustomTemplate] = useState(null);
  const [customTemplate, setCustomTemplate] = useState('');
  
  const [newRecipient, setNewRecipient] = useState({
    id: null,
    email: '',
    notifications: ['newResponse']
  });
  
  const handleAddRecipient = () => {
    setNewRecipient({
      id: Date.now(),
      email: '',
      notifications: ['newResponse']
    });
    setShowAddRecipientModal(true);
  };
  
  const handleSaveRecipient = () => {
    if (newRecipient.id) {
      // Update existing
      const updatedRecipients = settings.emailRecipients.map(recipient => 
        recipient.id === newRecipient.id ? newRecipient : recipient
      );
      handleUpdateSettings('emailRecipients', updatedRecipients);
    } else {
      // Add new
      const newRecipientWithId = {
        ...newRecipient,
        id: Date.now()
      };
      handleUpdateSettings('emailRecipients', [...settings.emailRecipients, newRecipientWithId]);
    }
    setShowAddRecipientModal(false);
  };
  
  const handleRemoveRecipient = (id) => {
    const updatedRecipients = settings.emailRecipients.filter(recipient => recipient.id !== id);
    handleUpdateSettings('emailRecipients', updatedRecipients);
  };
  
  const handleEditRecipient = (recipient) => {
    setNewRecipient({...recipient});
    setShowAddRecipientModal(true);
  };
  
  const handleNotificationToggle = (key) => {
    handleUpdateSettings(key, !settings[key]);
  };
  
  const handleThresholdChange = (value) => {
    handleUpdateSettings('thresholdValue', parseInt(value));
  };
  
  const handleRecipientNotificationToggle = (notificationType) => {
    const notifications = newRecipient.notifications.includes(notificationType) 
      ? newRecipient.notifications.filter(type => type !== notificationType)
      : [...newRecipient.notifications, notificationType];
    
    setNewRecipient({...newRecipient, notifications});
  };
  
  const handleUpdateSettings = (key, value) => {
    const updatedSettings = {
      ...settings,
      [key]: value
    };
    setSettings(updatedSettings);
    if (onUpdate) {
      onUpdate(updatedSettings);
    }
  };
  
  const handleCustomizeTemplate = (type) => {
    setActiveCustomTemplate(type);
    setCustomTemplate(settings.customMessages[type]);
    setShowCustomizeModal(true);
  };
  
  const handleSaveTemplate = () => {
    const updatedMessages = {
      ...settings.customMessages,
      [activeCustomTemplate]: customTemplate
    };
    
    handleUpdateSettings('customMessages', updatedMessages);
    setShowCustomizeModal(false);
  };
  
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-white">Email Notifications</h3>
      </div>
      
      <div className="space-y-6">
        {/* Notification Types */}
        <div>
          <h4 className="text-md font-medium text-white mb-3">Notification Types</h4>
          <div className="space-y-3 bg-gray-900 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center">
                  <span className="font-medium text-white">New Response Alerts</span>
                  <span className="ml-2 px-2 py-0.5 bg-green-900 text-green-300 text-xs rounded-full">Real-time</span>
                </div>
                <p className="text-sm text-gray-400">Get notified instantly when someone submits a response</p>
              </div>
              <div className="flex items-center">
                <button 
                  onClick={() => handleCustomizeTemplate('newResponse')}
                  className="text-xs text-blue-400 mr-3"
                >
                  Customize
                </button>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={settings.newResponse} 
                    onChange={() => handleNotificationToggle('newResponse')}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
            
            <div className="border-t border-gray-700 my-3"></div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center">
                  <span className="font-medium text-white">Daily Summary</span>
                  <span className="ml-2 px-2 py-0.5 bg-blue-900 text-blue-300 text-xs rounded-full">Daily</span>
                </div>
                <p className="text-sm text-gray-400">Receive a daily digest of all responses at 9:00 AM</p>
              </div>
              <div className="flex items-center">
                <button 
                  onClick={() => handleCustomizeTemplate('dailySummary')}
                  className="text-xs text-blue-400 mr-3"
                >
                  Customize
                </button>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={settings.dailySummary} 
                    onChange={() => handleNotificationToggle('dailySummary')}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
            
            <div className="border-t border-gray-700 my-3"></div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center">
                  <span className="font-medium text-white">Weekly Report</span>
                  <span className="ml-2 px-2 py-0.5 bg-purple-900 text-purple-300 text-xs rounded-full">Weekly</span>
                </div>
                <p className="text-sm text-gray-400">Get a comprehensive weekly report every Monday</p>
              </div>
              <div className="flex items-center">
                <button 
                  onClick={() => handleCustomizeTemplate('weeklySummary')}
                  className="text-xs text-blue-400 mr-3"
                >
                  Customize
                </button>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={settings.weeklySummary} 
                    onChange={() => handleNotificationToggle('weeklySummary')}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
            
            <div className="border-t border-gray-700 my-3"></div>
            
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center">
                    <span className="font-medium text-white">Response Threshold Alert</span>
                    <span className="ml-2 px-2 py-0.5 bg-yellow-900 text-yellow-300 text-xs rounded-full">Threshold</span>
                  </div>
                  <p className="text-sm text-gray-400">Get notified when your form reaches a specific response count</p>
                </div>
                <div className="flex items-center">
                  <button 
                    onClick={() => handleCustomizeTemplate('responseThreshold')}
                    className="text-xs text-blue-400 mr-3"
                  >
                    Customize
                  </button>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={settings.responseThreshold} 
                      onChange={() => handleNotificationToggle('responseThreshold')}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
              
              {settings.responseThreshold && (
                <div className="mt-3 pl-6">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-400 mr-3">Notify when form reaches</span>
                    <input
                      type="number"
                      min="1"
                      max="1000"
                      value={settings.thresholdValue}
                      onChange={(e) => handleThresholdChange(e.target.value)}
                      className="w-20 bg-gray-700 border border-gray-600 rounded-md px-2 py-1 text-white text-sm"
                    />
                    <span className="text-sm text-gray-400 ml-2">responses</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Recipients */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-md font-medium text-white">Email Recipients</h4>
            <button 
              onClick={handleAddRecipient}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Add Recipient
            </button>
          </div>
          
          {settings.emailRecipients.length === 0 ? (
            <div className="bg-gray-900 rounded-lg p-4 text-center">
              <p className="text-gray-400">No recipients added yet</p>
            </div>
          ) : (
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-800">
                <thead className="bg-gray-800">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Notifications</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {settings.emailRecipients.map((recipient) => (
                    <tr key={recipient.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{recipient.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          {recipient.notifications.includes('newResponse') && (
                            <span className="px-2 py-1 bg-green-900 text-green-300 text-xs rounded-full">Real-time</span>
                          )}
                          {recipient.notifications.includes('dailySummary') && (
                            <span className="px-2 py-1 bg-blue-900 text-blue-300 text-xs rounded-full">Daily</span>
                          )}
                          {recipient.notifications.includes('weeklySummary') && (
                            <span className="px-2 py-1 bg-purple-900 text-purple-300 text-xs rounded-full">Weekly</span>
                          )}
                          {recipient.notifications.includes('responseThreshold') && (
                            <span className="px-2 py-1 bg-yellow-900 text-yellow-300 text-xs rounded-full">Threshold</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          onClick={() => handleEditRecipient(recipient)}
                          className="text-blue-400 hover:text-blue-300 mr-3"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleRemoveRecipient(recipient.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      
      {/* Add/Edit Recipient Modal */}
      {showAddRecipientModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-white mb-4">
              {newRecipient.id ? 'Edit Recipient' : 'Add Recipient'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={newRecipient.email}
                  onChange={(e) => setNewRecipient({...newRecipient, email: e.target.value})}
                  className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-white"
                  placeholder="email@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Notification Types
                </label>
                <div className="space-y-2 bg-gray-900 border border-gray-700 rounded-md p-3">
                  <div className="flex items-center">
                    <input
                      id="notification-realtime"
                      type="checkbox"
                      checked={newRecipient.notifications.includes('newResponse')}
                      onChange={() => handleRecipientNotificationToggle('newResponse')}
                      className="h-4 w-4 text-blue-600 rounded"
                    />
                    <label htmlFor="notification-realtime" className="ml-2 block text-sm text-white">
                      New Response Alerts (Real-time)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="notification-daily"
                      type="checkbox"
                      checked={newRecipient.notifications.includes('dailySummary')}
                      onChange={() => handleRecipientNotificationToggle('dailySummary')}
                      className="h-4 w-4 text-blue-600 rounded"
                    />
                    <label htmlFor="notification-daily" className="ml-2 block text-sm text-white">
                      Daily Summary
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="notification-weekly"
                      type="checkbox"
                      checked={newRecipient.notifications.includes('weeklySummary')}
                      onChange={() => handleRecipientNotificationToggle('weeklySummary')}
                      className="h-4 w-4 text-blue-600 rounded"
                    />
                    <label htmlFor="notification-weekly" className="ml-2 block text-sm text-white">
                      Weekly Report
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="notification-threshold"
                      type="checkbox"
                      checked={newRecipient.notifications.includes('responseThreshold')}
                      onChange={() => handleRecipientNotificationToggle('responseThreshold')}
                      className="h-4 w-4 text-blue-600 rounded"
                    />
                    <label htmlFor="notification-threshold" className="ml-2 block text-sm text-white">
                      Response Threshold Alert
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-6 space-x-3">
              <button
                onClick={() => setShowAddRecipientModal(false)}
                className="px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveRecipient}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                disabled={!newRecipient.email || newRecipient.notifications.length === 0}
              >
                {newRecipient.id ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Customize Template Modal */}
      {showCustomizeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4">
            <h3 className="text-lg font-medium text-white mb-4">
              Customize Email Template
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message Template
                </label>
                <textarea
                  value={customTemplate}
                  onChange={(e) => setCustomTemplate(e.target.value)}
                  rows={5}
                  className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-white"
                  placeholder="Enter your custom message template"
                ></textarea>
                <div className="mt-2 text-sm text-gray-400">
                  <p>Available variables:</p>
                  <ul className="list-disc pl-5 mt-1">
                    <li>{'{{formName}}'} - The name of the feedback form</li>
                    <li>{'{{count}}'} - Number of responses</li>
                    <li>{'{{threshold}}'} - Response threshold value</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-6 space-x-3">
              <button
                onClick={() => setShowCustomizeModal(false)}
                className="px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveTemplate}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Save Template
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-6 bg-blue-900 bg-opacity-30 border border-blue-800 rounded-lg p-4">
        <div className="flex">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm text-blue-200 mb-1">
              Email notifications help you stay up-to-date with incoming feedback.
            </p>
            <p className="text-xs text-blue-300">
              Customize templates and recipients to tailor your notification experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmailNotifications
