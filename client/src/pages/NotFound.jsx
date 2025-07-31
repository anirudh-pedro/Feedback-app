import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-gray-800 rounded-full mx-auto flex items-center justify-center mb-6 border-4 border-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold text-white mb-2">404</h1>
          <p className="text-xl text-gray-400 mb-8">Page not found</p>
          <p className="text-gray-500 mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link 
            to="/"
            className="block w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Go to Homepage
          </Link>
          
          <Link
            to="/feedback"
            className="block w-full px-6 py-3 bg-gray-800 text-white font-medium rounded-md hover:bg-gray-700 transition-colors duration-200"
          >
            Create a Feedback Form
          </Link>
          
          <Link
            to="/dashboard"
            className="block w-full px-6 py-3 bg-gray-800 text-white font-medium rounded-md hover:bg-gray-700 transition-colors duration-200"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
