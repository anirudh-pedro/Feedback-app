import React, { useState } from 'react';

const UserRolesPermissions = ({ users, onUpdateUser }) => {
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({
    id: null,
    name: '',
    email: '',
    role: 'viewer',
    permissions: {
      createForms: false,
      editForms: false,
      deleteForms: false,
      viewResponses: true,
      exportData: false,
      inviteUsers: false,
      manageUsers: false
    }
  });

  // Predefined roles with their default permissions
  const roles = {
    admin: {
      label: 'Administrator',
      description: 'Full access to all features',
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
    editor: {
      label: 'Editor',
      description: 'Can create and edit forms, view responses',
      permissions: {
        createForms: true,
        editForms: true,
        deleteForms: false,
        viewResponses: true,
        exportData: true,
        inviteUsers: false,
        manageUsers: false
      }
    },
    analyst: {
      label: 'Analyst',
      description: 'Can view and export data, but not modify forms',
      permissions: {
        createForms: false,
        editForms: false,
        deleteForms: false,
        viewResponses: true,
        exportData: true,
        inviteUsers: false,
        manageUsers: false
      }
    },
    viewer: {
      label: 'Viewer',
      description: 'Can only view responses',
      permissions: {
        createForms: false,
        editForms: false,
        deleteForms: false,
        viewResponses: true,
        exportData: false,
        inviteUsers: false,
        manageUsers: false
      }
    }
  };

  const handleAddUser = () => {
    setNewUser({
      id: Date.now(),
      name: '',
      email: '',
      role: 'viewer',
      permissions: {...roles.viewer.permissions}
    });
    setSelectedUser(null);
    setShowAddUserModal(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setNewUser({...user});
    setShowAddUserModal(true);
  };

  const handleSaveUser = () => {
    if (onUpdateUser) {
      onUpdateUser(selectedUser ? 'update' : 'add', newUser);
    }
    setShowAddUserModal(false);
  };

  const handleDeleteUser = (userId) => {
    if (onUpdateUser) {
      onUpdateUser('delete', { id: userId });
    }
  };

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setNewUser({
      ...newUser,
      role: selectedRole,
      permissions: {...roles[selectedRole].permissions}
    });
  };

  const handlePermissionChange = (permission) => {
    setNewUser({
      ...newUser,
      permissions: {
        ...newUser.permissions,
        [permission]: !newUser.permissions[permission]
      },
      // If custom permissions, set role to custom
      role: 'custom'
    });
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-white">Team Members & Permissions</h3>
        <button
          onClick={handleAddUser}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Add Team Member
        </button>
      </div>

      {users.length === 0 ? (
        <div className="text-center py-8 border border-dashed border-gray-600 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <p className="text-gray-400 mb-2">No team members added yet</p>
          <p className="text-sm text-gray-500">
            Add team members to collaborate on your feedback forms
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-700 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-800">
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Role</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Permissions</th>
                <th className="py-3 px-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-600">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-650">
                  <td className="py-4 px-4 text-sm text-white">{user.name}</td>
                  <td className="py-4 px-4 text-sm text-white">{user.email}</td>
                  <td className="py-4 px-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.role === 'admin' ? 'bg-purple-900 text-purple-300' : 
                      user.role === 'editor' ? 'bg-blue-900 text-blue-300' :
                      user.role === 'analyst' ? 'bg-green-900 text-green-300' :
                      'bg-gray-900 text-gray-300'
                    }`}>
                      {roles[user.role]?.label || 'Custom'}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-300">
                    <div className="flex flex-wrap gap-1">
                      {user.permissions.createForms && (
                        <span className="px-1.5 py-0.5 bg-gray-600 text-gray-300 text-xs rounded">Create</span>
                      )}
                      {user.permissions.editForms && (
                        <span className="px-1.5 py-0.5 bg-gray-600 text-gray-300 text-xs rounded">Edit</span>
                      )}
                      {user.permissions.viewResponses && (
                        <span className="px-1.5 py-0.5 bg-gray-600 text-gray-300 text-xs rounded">View</span>
                      )}
                      {user.permissions.exportData && (
                        <span className="px-1.5 py-0.5 bg-gray-600 text-gray-300 text-xs rounded">Export</span>
                      )}
                      {user.permissions.manageUsers && (
                        <span className="px-1.5 py-0.5 bg-gray-600 text-gray-300 text-xs rounded">Admin</span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right text-sm">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="text-blue-400 hover:text-blue-300 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
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

      {/* Add/Edit User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4">
            <h3 className="text-lg font-medium text-white mb-4">
              {selectedUser ? 'Edit Team Member' : 'Add Team Member'}
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={newUser.name}
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                    className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-white"
                    placeholder="Full Name"
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
                    className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-white"
                    placeholder="email@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Role
                </label>
                <select
                  value={newUser.role}
                  onChange={handleRoleChange}
                  className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-white"
                >
                  {Object.entries(roles).map(([key, value]) => (
                    <option key={key} value={key}>{value.label}</option>
                  ))}
                  {newUser.role === 'custom' && (
                    <option value="custom">Custom</option>
                  )}
                </select>
                <p className="mt-1 text-sm text-gray-400">
                  {roles[newUser.role]?.description || 'Custom permission set'}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Permissions
                </label>
                <div className="bg-gray-900 border border-gray-700 rounded-md p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center">
                      <input
                        id="permission-create"
                        type="checkbox"
                        checked={newUser.permissions.createForms}
                        onChange={() => handlePermissionChange('createForms')}
                        className="h-4 w-4 text-blue-600 rounded"
                      />
                      <label htmlFor="permission-create" className="ml-2 block text-sm text-gray-300">
                        Create forms
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="permission-edit"
                        type="checkbox"
                        checked={newUser.permissions.editForms}
                        onChange={() => handlePermissionChange('editForms')}
                        className="h-4 w-4 text-blue-600 rounded"
                      />
                      <label htmlFor="permission-edit" className="ml-2 block text-sm text-gray-300">
                        Edit forms
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="permission-delete"
                        type="checkbox"
                        checked={newUser.permissions.deleteForms}
                        onChange={() => handlePermissionChange('deleteForms')}
                        className="h-4 w-4 text-blue-600 rounded"
                      />
                      <label htmlFor="permission-delete" className="ml-2 block text-sm text-gray-300">
                        Delete forms
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="permission-view"
                        type="checkbox"
                        checked={newUser.permissions.viewResponses}
                        onChange={() => handlePermissionChange('viewResponses')}
                        className="h-4 w-4 text-blue-600 rounded"
                      />
                      <label htmlFor="permission-view" className="ml-2 block text-sm text-gray-300">
                        View responses
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="permission-export"
                        type="checkbox"
                        checked={newUser.permissions.exportData}
                        onChange={() => handlePermissionChange('exportData')}
                        className="h-4 w-4 text-blue-600 rounded"
                      />
                      <label htmlFor="permission-export" className="ml-2 block text-sm text-gray-300">
                        Export data
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="permission-invite"
                        type="checkbox"
                        checked={newUser.permissions.inviteUsers}
                        onChange={() => handlePermissionChange('inviteUsers')}
                        className="h-4 w-4 text-blue-600 rounded"
                      />
                      <label htmlFor="permission-invite" className="ml-2 block text-sm text-gray-300">
                        Invite users
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="permission-manage"
                        type="checkbox"
                        checked={newUser.permissions.manageUsers}
                        onChange={() => handlePermissionChange('manageUsers')}
                        className="h-4 w-4 text-blue-600 rounded"
                      />
                      <label htmlFor="permission-manage" className="ml-2 block text-sm text-gray-300">
                        Manage users
                      </label>
                    </div>
                  </div>
                </div>
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
                onClick={handleSaveUser}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                disabled={!newUser.name || !newUser.email}
              >
                {selectedUser ? 'Update' : 'Add'}
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
              Team members can have different roles and permissions based on their responsibilities.
            </p>
            <p className="text-xs text-blue-300">
              Each role has preset permissions, but you can also customize individual access levels.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRolesPermissions;
