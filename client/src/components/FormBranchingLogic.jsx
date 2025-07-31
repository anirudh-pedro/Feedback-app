import React, { useState } from 'react'

const FormBranchingLogic = ({ formQuestions, onUpdate }) => {
  // State to track the branching rules
  const [branchingRules, setBranchingRules] = useState([])
  const [showAddRuleModal, setShowAddRuleModal] = useState(false)
  const [activeRule, setActiveRule] = useState(null)
  
  // Rule creation state
  const [newRule, setNewRule] = useState({
    id: null,
    sourceQuestionId: '',
    condition: {
      type: 'equals',
      value: ''
    },
    action: {
      type: 'show',
      targetQuestionId: ''
    }
  })
  
  // Get questions that can be used as source (only select, rating, etc.)
  const sourceQuestions = formQuestions.filter(q => 
    q.type === 'rating' || 
    q.type === 'select' || 
    q.type === 'multipleChoice' ||
    q.type === 'boolean'
  )
  
  // Get questions that can be targets (any question)
  const targetQuestions = formQuestions.filter(q => q.id !== newRule.sourceQuestionId)
  
  const handleAddRule = () => {
    setShowAddRuleModal(true)
    setNewRule({
      id: Date.now(),
      sourceQuestionId: sourceQuestions.length > 0 ? sourceQuestions[0].id : '',
      condition: {
        type: 'equals',
        value: ''
      },
      action: {
        type: 'show',
        targetQuestionId: ''
      }
    })
  }
  
  const handleSaveRule = () => {
    if (activeRule) {
      // Edit existing rule
      setBranchingRules(branchingRules.map(rule => 
        rule.id === activeRule.id ? newRule : rule
      ))
    } else {
      // Add new rule
      setBranchingRules([...branchingRules, newRule])
    }
    
    // Notify parent component about the update
    if (onUpdate) {
      const updatedRules = activeRule 
        ? branchingRules.map(rule => rule.id === activeRule.id ? newRule : rule)
        : [...branchingRules, newRule]
      onUpdate(updatedRules)
    }
    
    setShowAddRuleModal(false)
    setActiveRule(null)
  }
  
  const handleEditRule = (rule) => {
    setActiveRule(rule)
    setNewRule(rule)
    setShowAddRuleModal(true)
  }
  
  const handleDeleteRule = (ruleId) => {
    const updatedRules = branchingRules.filter(rule => rule.id !== ruleId)
    setBranchingRules(updatedRules)
    
    // Notify parent component about the update
    if (onUpdate) {
      onUpdate(updatedRules)
    }
  }
  
  const getQuestionById = (id) => {
    return formQuestions.find(q => q.id === parseInt(id)) || { text: 'Question not found' }
  }
  
  const getConditionText = (rule) => {
    switch(rule.condition.type) {
      case 'equals':
        return 'equals'
      case 'greaterThan':
        return 'is greater than'
      case 'lessThan':
        return 'is less than'
      case 'contains':
        return 'contains'
      default:
        return rule.condition.type
    }
  }
  
  const getActionText = (rule) => {
    const targetQuestion = getQuestionById(rule.action.targetQuestionId)
    switch(rule.action.type) {
      case 'show':
        return `show question "${targetQuestion.text}"`
      case 'hide':
        return `hide question "${targetQuestion.text}"`
      case 'skip':
        return `skip to question "${targetQuestion.text}"`
      default:
        return rule.action.type
    }
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-white">Form Branching Logic</h3>
        <button 
          onClick={handleAddRule}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Add Rule
        </button>
      </div>
      
      {branchingRules.length === 0 ? (
        <div className="text-center py-8 border border-dashed border-gray-600 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-400 mb-2">No branching logic rules defined</p>
          <p className="text-sm text-gray-500">
            Add rules to create conditional paths in your form based on responses
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {branchingRules.map((rule) => (
            <div key={rule.id} className="bg-gray-700 rounded-lg p-4 border border-gray-600">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center mb-2">
                    <span className="px-2 py-1 bg-blue-900 text-xs text-blue-300 rounded mr-2">Rule</span>
                    <span className="text-white font-medium">If</span>
                  </div>
                  
                  <div className="pl-4 mb-3">
                    <p className="text-gray-300">
                      <span className="font-medium text-blue-400">"{getQuestionById(rule.sourceQuestionId).text}"</span> 
                      {' '}{getConditionText(rule)}{' '}
                      <span className="font-medium text-green-400">"{rule.condition.value}"</span>
                    </p>
                  </div>
                  
                  <div className="flex items-center mb-2">
                    <span className="text-white font-medium">Then</span>
                  </div>
                  
                  <div className="pl-4">
                    <p className="text-gray-300">
                      {getActionText(rule)}
                    </p>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleEditRule(rule)}
                    className="p-1.5 bg-gray-600 text-gray-300 rounded hover:bg-gray-500 hover:text-white transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => handleDeleteRule(rule.id)}
                    className="p-1.5 bg-gray-600 text-gray-300 rounded hover:bg-red-600 hover:text-white transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Add/Edit Rule Modal */}
      {showAddRuleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4">
            <h3 className="text-lg font-medium text-white mb-4">
              {activeRule ? 'Edit Branching Rule' : 'Add Branching Rule'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  If Question:
                </label>
                <select 
                  value={newRule.sourceQuestionId} 
                  onChange={(e) => setNewRule({...newRule, sourceQuestionId: e.target.value})}
                  className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-white"
                >
                  <option value="">Select a question</option>
                  {sourceQuestions.map(question => (
                    <option key={question.id} value={question.id}>
                      {question.text}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Condition:
                  </label>
                  <select 
                    value={newRule.condition.type} 
                    onChange={(e) => setNewRule({
                      ...newRule, 
                      condition: {...newRule.condition, type: e.target.value}
                    })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-white"
                  >
                    <option value="equals">Equals</option>
                    <option value="greaterThan">Greater Than</option>
                    <option value="lessThan">Less Than</option>
                    <option value="contains">Contains</option>
                  </select>
                </div>
                
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Value:
                  </label>
                  <input 
                    type="text"
                    value={newRule.condition.value} 
                    onChange={(e) => setNewRule({
                      ...newRule, 
                      condition: {...newRule.condition, value: e.target.value}
                    })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-white"
                    placeholder="Value to compare against"
                  />
                </div>
              </div>
              
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Action:
                  </label>
                  <select 
                    value={newRule.action.type} 
                    onChange={(e) => setNewRule({
                      ...newRule, 
                      action: {...newRule.action, type: e.target.value}
                    })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-white"
                  >
                    <option value="show">Show Question</option>
                    <option value="hide">Hide Question</option>
                    <option value="skip">Skip to Question</option>
                  </select>
                </div>
                
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Target Question:
                  </label>
                  <select 
                    value={newRule.action.targetQuestionId} 
                    onChange={(e) => setNewRule({
                      ...newRule, 
                      action: {...newRule.action, targetQuestionId: e.target.value}
                    })}
                    className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-white"
                  >
                    <option value="">Select a question</option>
                    {targetQuestions.map(question => (
                      <option key={question.id} value={question.id}>
                        {question.text}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-6 space-x-3">
              <button 
                onClick={() => {
                  setShowAddRuleModal(false)
                  setActiveRule(null)
                }}
                className="px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveRule}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                disabled={!newRule.sourceQuestionId || !newRule.action.targetQuestionId || !newRule.condition.value}
              >
                {activeRule ? 'Update Rule' : 'Add Rule'}
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
              Branching logic allows you to create dynamic forms that change based on user responses.
            </p>
            <p className="text-xs text-blue-300">
              Example: If rating is 3 or below, show follow-up questions to understand why.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormBranchingLogic
