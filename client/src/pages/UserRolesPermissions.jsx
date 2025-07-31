import React, { useState } from 'react'

const UserRolesPermissions = () => {
  // Mock roles and users data
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: 'Administrator',
      description: 'Full access to all features and settings',
      permissions: [
        'create_forms', 'edit_forms', 'delete_forms', 
        'view_responses', 'export_responses', 'delete_responses',
        'manage_users', 'manage_billing', 'access_api'
      ]
    },
    {
      id: 2,
      name: 'Form Manager',
      description: 'Can create and manage forms and view responses',
      permissions: [
        'create_forms', 'edit_forms', 'view_responses', 
        'export_responses'
      ]
    },
    {
      id: 3,
      name: 'Analyst',
      description: 'Can view and export form responses only',
      permissions: [
        'view_responses', 'export_responses'
      ]
    },
    {
      id: 4,
      name: 'Viewer',
      description: 'Can only view form responses',
      permissions: [
        'view_responses'
      ]
    }
  ])
  
  const [users, setUsers] = useState([
    { id: 1, name: 'Jane Smith', email: 'jane@example.com', roleId: 1, active: true },
    { id: 2, name: 'John Doe', email: 'john@example.com', roleId: 2, active: true },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com', roleId: 3, active: true },
    { id: 4, name: 'Bob Williams', email: 'bob@example.com', roleId: 4, active: false },
  ])
  
  // UI state
  const [activeTab, setActiveTab] = useState('users')
  const [showAddUserModal, setShowAddUserModal] = useState(false)
  const [showEditRoleModal, setShowEditRoleModal] = useState(false)
  const [activeRole, setActiveRole] = useState(null)
  
  // Form state
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    roleId: 2, // Default role
    active: true
  })
  
  // All available permissions
  const allPermissions = [
    { id: 'create_forms', category: 'Forms', name: 'Create forms' },
    { id: 'edit_forms', category: 'Forms', name: 'Edit forms' },
    { id: 'delete_forms', category: 'Forms', name: 'Delete forms' },
    { id: 'view_responses', category: 'Responses', name: 'View responses' },
    { id: 'export_responses', category: 'Responses', name: 'Export responses' },
    { id: 'delete_responses', category: 'Responses', name: 'Delete responses' },
    { id: 'manage_users', category: 'Administration', name: 'Manage users' },
    { id: 'manage_billing', category: 'Administration', name: 'Manage billing' },
    { id: 'access_api', category: 'Advanced', name: 'Access API' },
    { id: 'customize_branding', category: 'Advanced', name: 'Customize branding' },
    { id: 'view_analytics', category: 'Analytics', name: 'View analytics' },
    { id: 'schedule_reports', category: 'Analytics', name: 'Schedule reports' }
  ]
  
  // Get role by ID
  const getRoleById = (roleId) => {
    return roles.find(role => role.id === roleId) || { name: 'Unknown' }
  }
  
  // Handle adding a new user
  const handleAddUser = () => {
    setUsers([...users, {
      id: users.length + 1,
      ...newUser
    }])
    setNewUser({
      name: '',
      email: '',
      roleId: 2,
      active: true
    })
    setShowAddUserModal(false)
  }
  
  // Handle editing a role
  const handleEditRole = (role) => {
    setActiveRole({...role})
    setShowEditRoleModal(true)
  }
  
  // Save role changes
  const handleSaveRole = () => {
    setRoles(roles.map(role => 
      role.id === activeRole.id ? activeRole : role
    ))
    setShowEditRoleModal(false)
    setActiveRole(null)
  }
  
  // Toggle permission for a role
  const togglePermission = (permissionId) => {
    if (activeRole.permissions.includes(permissionId)) {
      setActiveRole({
        ...activeRole,
        permissions: activeRole.permissions.filter(id => id !== permissionId)
      })
    } else {
      setActiveRole({
        ...activeRole,
        permissions: [...activeRole.permissions, permissionId]
      })
    }
  }
  
  // Change user role
  const changeUserRole = (userId, roleId) => {
    setUsers(users.map(user => 
      user.id === userId ? {...user, roleId: parseInt(roleId)} : user
    ))
  }
  
  // Toggle user active status
  const toggleUserStatus = (userId) => {
    setUsers(users.map(user => 
      user.id === userId ? {...user, active: !user.active} : user
    ))
  }
  
  // Group permissions by category
  const permissionsByCategory = allPermissions.reduce((acc, permission) => {
    if (!acc[permission.category]) {
      acc[permission.category] = []
    }
    acc[permission.category].push(permission)
    return acc
  }, {})

  return (
    <div className="bg-gray-900 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Team Management</h1>
        
        {/* Tabs */}
        <div className="border-b border-gray-700 mb-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('users')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'users'
                  ? 'border-blue-500 text-blue-500'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              Users
            </button>
            <button
              onClick={() => setActiveTab('roles')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'roles'
                  ? 'border-blue-500 text-blue-500'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              Roles & Permissions
            </button>
          </nav>
        </div>
        
        {/* Users Tab */}
        {activeTab === 'users' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-white">Team Members</h2>
              <button 
                onClick={() => setShowAddUserModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Add User
              </button>
            </div>
            
            <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr className="bg-gray-900">
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Role
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {users.map(user => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {user.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        <select 
                          value={user.roleId} 
                          onChange={(e) => changeUserRole(user.id, e.target.value)}
                          className="bg-gray-700 text-white text-sm rounded-md border border-gray-600 px-3 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          {roles.map(role => (
                            <option key={role.id} value={role.id}>{role.name}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.active 
                            ? 'bg-green-900 text-green-300' 
                            : 'bg-red-900 text-red-300'
                        }`}>
                          {user.active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        <button 
                          onClick={() => toggleUserStatus(user.id)}
                          className="text-blue-400 hover:text-blue-300 mr-3"
                        >
                          {user.active ? 'Deactivate' : 'Activate'}
                        </button>
                        <button className="text-red-400 hover:text-red-300">
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 bg-blue-900 bg-opacity-30 border border-blue-800 rounded-lg p-4">
              <div className="flex">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-blue-200">
                  Team members can access the forms and responses based on their assigned roles. Deactivated users cannot log in but their account information is preserved.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Roles Tab */}
        {activeTab === 'roles' && (
          <div>
            <div className="mb-6">
              <h2 className="text-lg font-medium text-white mb-6">Roles & Permissions</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {roles.map(role => (
                  <div key={role.id} className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                    <div className="p-5 border-b border-gray-700 flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-medium text-white">{role.name}</h3>
                        <p className="text-sm text-gray-400 mt-1">{role.description}</p>
                      </div>
                      <button 
                        onClick={() => handleEditRole(role)}
                        className="px-3 py-1.5 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 transition-colors"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="p-5">
                      <h4 className="text-sm font-medium text-gray-400 uppercase mb-3">Permissions</h4>
                      <div className="space-y-3">
                        {Object.entries(permissionsByCategory).map(([category, permissions]) => {
                          const categoryPermissions = permissions.filter(p => role.permissions.includes(p.id))
                          if (categoryPermissions.length === 0) return null
                          
                          return (
                            <div key={category}>
                              <h5 className="text-xs text-gray-500 uppercase mb-1">{category}</h5>
                              <div className="space-y-1.5">
                                {categoryPermissions.map(permission => (
                                  <div key={permission.id} className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-sm text-gray-300">{permission.name}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    <div className="bg-gray-900 px-5 py-4 text-sm text-gray-400">
                      {users.filter(user => user.roleId === role.id).length} users with this role
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-6 bg-blue-900 bg-opacity-30 border border-blue-800 rounded-lg p-4">
              <div className="flex">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-blue-200">
                  Roles define what actions team members can perform. Customize permissions for each role to fit your organization's workflow and security requirements.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-white mb-4">
              Add Team Member
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input 
                  type="text"
                  value={newUser.name} 
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input 
                  type="email"
                  value={newUser.email} 
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Email address"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Role
                </label>
                <select 
                  value={newUser.roleId} 
                  onChange={(e) => setNewUser({...newUser, roleId: parseInt(e.target.value)})}
                  className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  {roles.map(role => (
                    <option key={role.id} value={role.id}>
                      {role.name} - {role.description}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center">
                <input 
                  id="active"
                  type="checkbox"
                  checked={newUser.active} 
                  onChange={(e) => setNewUser({...newUser, active: e.target.checked})}
                  className="h-4 w-4 text-blue-600 rounded border-gray-700 focus:ring-blue-500 bg-gray-900"
                />
                <label htmlFor="active" className="ml-2 block text-sm text-gray-300">
                  Active user (can log in immediately)
                </label>
              </div>
            </div>
            
            <div className="flex justify-end mt-6 space-x-3">
              <button 
                onClick={() => setShowAddUserModal(false)}
                className="px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddUser}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                disabled={!newUser.name || !newUser.email}
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Edit Role Modal */}
      {showEditRoleModal && activeRole && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-3xl w-full mx-4 max-h-screen overflow-y-auto">
            <h3 className="text-lg font-medium text-white mb-4">
              Edit Role: {activeRole.name}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Role Name
                </label>
                <input 
                  type="text"
                  value={activeRole.name} 
                  onChange={(e) => setActiveRole({...activeRole, name: e.target.value})}
                  className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <input 
                  type="text"
                  value={activeRole.description} 
                  onChange={(e) => setActiveRole({...activeRole, description: e.target.value})}
                  className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Permissions
                </label>
                
                {Object.entries(permissionsByCategory).map(([category, permissions]) => (
                  <div key={category} className="mb-6">
                    <h5 className="text-sm font-medium text-gray-400 uppercase mb-3">{category}</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {permissions.map(permission => (
                        <div key={permission.id} className="flex items-center">
                          <input 
                            id={`permission-${permission.id}`}
                            type="checkbox"
                            checked={activeRole.permissions.includes(permission.id)} 
                            onChange={() => togglePermission(permission.id)}
                            className="h-4 w-4 text-blue-600 rounded border-gray-700 focus:ring-blue-500 bg-gray-900"
                          />
                          <label htmlFor={`permission-${permission.id}`} className="ml-2 block text-sm text-gray-300">
                            {permission.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end mt-6 space-x-3">
              <button 
                onClick={() => {
                  setShowEditRoleModal(false)
                  setActiveRole(null)
                }}
                className="px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveRole}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserRolesPermissions
