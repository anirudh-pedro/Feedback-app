import React, { useState } from 'react'

const Dashboard = () => {
  // Sample data for the dashboard
  const [feedbackItems] = useState([
    {
      id: 1,
      title: "Website Navigation Issue",
      category: "Bug Report",
      status: "Open",
      priority: "High",
      date: "2025-07-25",
      description: "Users report difficulty finding the settings page after the latest update.",
      assignedTo: "John Smith",
      votes: 15
    },
    {
      id: 2,
      title: "Add Dark Mode Feature",
      category: "Feature Request",
      status: "In Progress",
      priority: "Medium",
      date: "2025-07-20",
      description: "Multiple users have requested a dark mode option for better night-time viewing.",
      assignedTo: "Sarah Johnson",
      votes: 27
    },
    {
      id: 3,
      title: "Payment Processing Error",
      category: "Bug Report",
      status: "Critical",
      priority: "High",
      date: "2025-07-30",
      description: "Some users receive an error message when attempting to complete payment.",
      assignedTo: "Unassigned",
      votes: 8
    },
    {
      id: 4,
      title: "Improve Mobile Responsiveness",
      category: "Enhancement",
      status: "Open",
      priority: "Medium",
      date: "2025-07-18",
      description: "The dashboard layout doesn't work well on small mobile screens.",
      assignedTo: "Mike Chen",
      votes: 12
    },
    {
      id: 5,
      title: "Add Export to CSV Feature",
      category: "Feature Request",
      status: "Planned",
      priority: "Low",
      date: "2025-07-15",
      description: "Ability to export feedback data to CSV format for analysis.",
      assignedTo: "Lisa Wang",
      votes: 6
    }
  ])

  // Stats data
  const stats = [
    { title: "Total Feedback", value: 128, change: "+12% from last month", icon: "📊" },
    { title: "Open Issues", value: 32, change: "-8% from last month", icon: "🔍" },
    { title: "Completed", value: 87, change: "+15% from last month", icon: "✅" },
    { title: "User Satisfaction", value: "4.7/5", change: "+0.3 from last month", icon: "⭐" }
  ]

  // Status filter
  const [statusFilter, setStatusFilter] = useState("All")
  const statusOptions = ["All", "Open", "In Progress", "Planned", "Critical", "Completed"]

  // Category filter
  const [categoryFilter, setCategoryFilter] = useState("All")
  const categoryOptions = ["All", "Bug Report", "Feature Request", "Enhancement", "Documentation"]

  // Get filtered feedback items
  const filteredFeedback = feedbackItems.filter(item => {
    const statusMatch = statusFilter === "All" || item.status === statusFilter
    const categoryMatch = categoryFilter === "All" || item.category === categoryFilter
    return statusMatch && categoryMatch
  })

  // Get status badge style based on status
  const getStatusStyle = (status) => {
    switch(status) {
      case "Open":
        return "bg-blue-900 text-blue-200"
      case "In Progress":
        return "bg-purple-900 text-purple-200"
      case "Planned":
        return "bg-gray-700 text-gray-200"
      case "Critical":
        return "bg-red-900 text-red-200"
      case "Completed":
        return "bg-green-900 text-green-200"
      default:
        return "bg-gray-700 text-gray-200"
    }
  }

  // Get priority badge style
  const getPriorityStyle = (priority) => {
    switch(priority) {
      case "High":
        return "bg-red-900 text-red-200"
      case "Medium":
        return "bg-yellow-900 text-yellow-200"
      case "Low":
        return "bg-green-900 text-green-200"
      default:
        return "bg-gray-700 text-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Feedback Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, index) => (
            <div key={index} className="bg-black rounded-xl p-6 border border-gray-800 shadow-lg">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">{stat.title}</p>
                  <h3 className="text-2xl font-bold mb-2">{stat.value}</h3>
                  <p className="text-sm text-gray-500">{stat.change}</p>
                </div>
                <div className="text-2xl bg-gray-800 h-12 w-12 flex items-center justify-center rounded-lg">
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Filters */}
        <div className="bg-black rounded-xl p-6 mb-8 border border-gray-800 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Status</label>
              <div className="flex flex-wrap gap-2">
                {statusOptions.map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      statusFilter === status 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
              <div className="flex flex-wrap gap-2">
                {categoryOptions.map((category) => (
                  <button
                    key={category}
                    onClick={() => setCategoryFilter(category)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      categoryFilter === category 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Feedback List */}
        <div className="bg-black rounded-xl border border-gray-800 overflow-hidden shadow-lg">
          <div className="p-6 border-b border-gray-800">
            <h2 className="text-xl font-semibold">Feedback Items</h2>
          </div>
          
          <div>
            {filteredFeedback.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No feedback items match your filters.
              </div>
            ) : (
              <div className="divide-y divide-gray-800">
                {filteredFeedback.map((item) => (
                  <div key={item.id} className="p-6 hover:bg-gray-900 transition-colors duration-150">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex-1">
                        <div className="flex gap-2 mb-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusStyle(item.status)}`}>
                            {item.status}
                          </span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityStyle(item.priority)}`}>
                            {item.priority}
                          </span>
                        </div>
                        <h3 className="text-lg font-medium mb-1">{item.title}</h3>
                        <p className="text-gray-400 text-sm mb-3">{item.description}</p>
                        <div className="text-xs text-gray-500 space-x-4">
                          <span>Category: {item.category}</span>
                          <span>Date: {item.date}</span>
                          <span>Assigned to: {item.assignedTo}</span>
                        </div>
                      </div>
                      <div className="flex items-center mt-4 md:mt-0 space-x-4">
                        <div className="flex items-center">
                          <button className="p-1 text-gray-400 hover:text-blue-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                          </button>
                          <span className="px-2">{item.votes}</span>
                          <button className="p-1 text-gray-400 hover:text-blue-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        </div>
                        <button className="px-3 py-1 bg-gray-800 text-sm text-gray-200 rounded-md hover:bg-gray-700">
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Pagination */}
          <div className="p-4 border-t border-gray-800 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing <span className="font-medium">{filteredFeedback.length}</span> of <span className="font-medium">{feedbackItems.length}</span> items
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-gray-800 text-sm text-gray-300 rounded-md hover:bg-gray-700 disabled:opacity-50" disabled>
                Previous
              </button>
              <button className="px-3 py-1 bg-gray-800 text-sm text-gray-300 rounded-md hover:bg-gray-700 disabled:opacity-50" disabled>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
