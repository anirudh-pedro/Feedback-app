import React, { useState } from 'react'

const FormEmbedding = ({ formId, formTitle }) => {
  const [embedMode, setEmbedMode] = useState('iframe');
  const [customization, setCustomization] = useState({
    width: '100%',
    height: '600px',
    theme: 'dark',
    hideHeader: false,
    transparentBackground: false,
    autoHeight: true
  });
  
  // Generate embed code based on current settings
  const getEmbedCode = () => {
    const baseUrl = `https://quickfeedback.com/embed/${formId}`;
    const queryParams = [];
    
    if (customization.theme !== 'dark') {
      queryParams.push(`theme=${customization.theme}`);
    }
    if (customization.hideHeader) {
      queryParams.push('hideHeader=true');
    }
    if (customization.transparentBackground) {
      queryParams.push('transparent=true');
    }
    if (customization.autoHeight) {
      queryParams.push('autoHeight=true');
    }
    
    const fullUrl = queryParams.length > 0 
      ? `${baseUrl}?${queryParams.join('&')}` 
      : baseUrl;
      
    switch(embedMode) {
      case 'iframe':
        return `<iframe src="${fullUrl}" width="${customization.width}" height="${customization.autoHeight ? 'auto' : customization.height}" frameborder="0" title="${formTitle} Feedback Form"></iframe>`;
      
      case 'javascript':
        return `<div id="quickfeedback-container"></div>\n<script src="https://quickfeedback.com/embed.js"></script>\n<script>\n  QuickFeedback.initialize({\n    formId: "${formId}",\n    container: "#quickfeedback-container",\n    theme: "${customization.theme}",\n    hideHeader: ${customization.hideHeader},\n    transparent: ${customization.transparentBackground},\n    autoHeight: ${customization.autoHeight}\n  });\n</script>`;
      
      case 'link':
        return `https://quickfeedback.com/form/${formId}`;
        
      case 'qrcode':
        // In a real implementation, you would generate a QR code dynamically
        return `https://quickfeedback.com/qr/${formId}`;
        
      default:
        return '';
    }
  };
  
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(getEmbedCode())
      .then(() => {
        // In a real app, you would show a toast notification
        console.log('Copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy:', err);
      });
  };
  
  const handleCustomizationChange = (key, value) => {
    setCustomization({
      ...customization,
      [key]: value
    });
  };
  
  const previewEmbedStyle = {
    border: '1px dashed #4B5563',
    backgroundColor: customization.transparentBackground ? 'transparent' : '#1F2937',
    padding: '16px',
    borderRadius: '8px'
  };
  
  const getQRCodeUrl = () => {
    // In a real app, you would generate a QR code dynamically
    // For now, we'll use a placeholder
    return 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' + 
      encodeURIComponent(`https://quickfeedback.com/form/${formId}`);
  };
  
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="mb-6">
        <h3 className="text-lg font-medium text-white mb-2">Embed Your Form</h3>
        <p className="text-gray-400">
          Share your form on your website or via direct link to collect feedback from anywhere.
        </p>
      </div>
      
      {/* Embed Modes Tabs */}
      <div className="flex border-b border-gray-700 mb-6">
        <button
          className={`px-4 py-2 text-sm font-medium ${embedMode === 'iframe' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
          onClick={() => setEmbedMode('iframe')}
        >
          Embed Code
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${embedMode === 'javascript' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
          onClick={() => setEmbedMode('javascript')}
        >
          JavaScript
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${embedMode === 'link' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
          onClick={() => setEmbedMode('link')}
        >
          Direct Link
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${embedMode === 'qrcode' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
          onClick={() => setEmbedMode('qrcode')}
        >
          QR Code
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Customization */}
        <div>
          <h4 className="text-md font-medium text-white mb-4">Customization</h4>
          <div className="space-y-4 bg-gray-900 rounded-lg p-4">
            {/* Display options based on embed mode */}
            {(embedMode === 'iframe' || embedMode === 'javascript') && (
              <>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">Theme</label>
                  <div className="flex space-x-4">
                    <div 
                      className={`flex items-center justify-center p-3 rounded-lg border ${customization.theme === 'dark' ? 'border-blue-500 bg-gray-700' : 'border-gray-700'}`}
                      onClick={() => handleCustomizationChange('theme', 'dark')}
                    >
                      <div className="w-12 h-8 bg-gray-800 rounded flex items-center justify-center">
                        <span className="text-xs text-white">Dark</span>
                      </div>
                    </div>
                    <div 
                      className={`flex items-center justify-center p-3 rounded-lg border ${customization.theme === 'light' ? 'border-blue-500 bg-gray-700' : 'border-gray-700'}`}
                      onClick={() => handleCustomizationChange('theme', 'light')}
                    >
                      <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                        <span className="text-xs text-gray-800">Light</span>
                      </div>
                    </div>
                    <div 
                      className={`flex items-center justify-center p-3 rounded-lg border ${customization.theme === 'brand' ? 'border-blue-500 bg-gray-700' : 'border-gray-700'}`}
                      onClick={() => handleCustomizationChange('theme', 'brand')}
                    >
                      <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
                        <span className="text-xs text-white">Brand</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">Size</label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Width</label>
                      <input
                        type="text"
                        value={customization.width}
                        onChange={(e) => handleCustomizationChange('width', e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Height</label>
                      <input
                        type="text"
                        value={customization.height}
                        onChange={(e) => handleCustomizationChange('height', e.target.value)}
                        className={`w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white text-sm ${customization.autoHeight ? 'opacity-50' : ''}`}
                        disabled={customization.autoHeight}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">Options</label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        id="auto-height"
                        type="checkbox"
                        checked={customization.autoHeight}
                        onChange={(e) => handleCustomizationChange('autoHeight', e.target.checked)}
                        className="h-4 w-4 text-blue-600 rounded"
                      />
                      <label htmlFor="auto-height" className="ml-2 block text-sm text-gray-300">
                        Auto-adjust height
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="hide-header"
                        type="checkbox"
                        checked={customization.hideHeader}
                        onChange={(e) => handleCustomizationChange('hideHeader', e.target.checked)}
                        className="h-4 w-4 text-blue-600 rounded"
                      />
                      <label htmlFor="hide-header" className="ml-2 block text-sm text-gray-300">
                        Hide form header
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="transparent-bg"
                        type="checkbox"
                        checked={customization.transparentBackground}
                        onChange={(e) => handleCustomizationChange('transparentBackground', e.target.checked)}
                        className="h-4 w-4 text-blue-600 rounded"
                      />
                      <label htmlFor="transparent-bg" className="ml-2 block text-sm text-gray-300">
                        Transparent background
                      </label>
                    </div>
                  </div>
                </div>
              </>
            )}
            
            {embedMode === 'qrcode' && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">QR Code Options</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <select className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white text-sm">
                      <option value="png">PNG Format</option>
                      <option value="svg">SVG Format</option>
                      <option value="pdf">PDF Format</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Size:</span>
                    <div className="flex items-center">
                      <button className="px-2 py-1 bg-gray-700 text-gray-300 rounded-l-md">S</button>
                      <button className="px-2 py-1 bg-blue-600 text-white">M</button>
                      <button className="px-2 py-1 bg-gray-700 text-gray-300 rounded-r-md">L</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Right Column: Preview & Code */}
        <div>
          {embedMode !== 'qrcode' && (
            <>
              <h4 className="text-md font-medium text-white mb-4">Code</h4>
              <div className="bg-gray-900 rounded-lg overflow-hidden mb-6">
                <div className="bg-gray-850 py-2 px-4 flex justify-between items-center border-b border-gray-700">
                  <span className="text-xs text-gray-400">
                    {embedMode === 'iframe' 
                      ? 'HTML Embed Code' 
                      : embedMode === 'javascript' 
                        ? 'JavaScript Embed Code' 
                        : 'Direct Link'}
                  </span>
                  <button 
                    onClick={handleCopyToClipboard}
                    className="text-xs text-blue-400 hover:text-blue-300"
                  >
                    Copy to clipboard
                  </button>
                </div>
                <div className="p-4 overflow-x-auto">
                  <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">
                    {getEmbedCode()}
                  </pre>
                </div>
              </div>
            </>
          )}
          
          <h4 className="text-md font-medium text-white mb-4">Preview</h4>
          <div className="bg-gray-900 rounded-lg p-4">
            {embedMode === 'qrcode' ? (
              <div className="flex flex-col items-center">
                <div className="bg-white p-4 rounded-lg mb-3">
                  <img 
                    src={getQRCodeUrl()}
                    alt="QR Code for form" 
                    className="w-48 h-48"
                  />
                </div>
                <div className="flex space-x-3 mt-2">
                  <button className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors">
                    Download QR Code
                  </button>
                  <button className="px-3 py-1.5 bg-gray-700 text-white text-sm rounded-md hover:bg-gray-600 transition-colors">
                    Print
                  </button>
                </div>
              </div>
            ) : (
              <div style={previewEmbedStyle} className="p-4 rounded-lg">
                <div className={`${customization.hideHeader ? 'hidden' : 'mb-4'}`}>
                  <h4 className={`text-lg font-medium ${customization.theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
                    {formTitle || "Feedback Form"}
                  </h4>
                </div>
                <div className={`space-y-4 ${customization.theme === 'light' ? 'text-gray-800' : 'text-gray-300'}`}>
                  <div>
                    <label className={`block text-sm font-medium ${customization.theme === 'light' ? 'text-gray-700' : 'text-gray-300'} mb-1`}>
                      How would you rate your experience?
                    </label>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button 
                          key={num}
                          className={`w-10 h-10 flex items-center justify-center rounded-full ${
                            num === 5 
                              ? customization.theme === 'brand' 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-gray-700 text-white' 
                              : customization.theme === 'light'
                                ? 'bg-gray-200 text-gray-700'
                                : 'bg-gray-700 text-gray-300'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className={`block text-sm font-medium ${customization.theme === 'light' ? 'text-gray-700' : 'text-gray-300'} mb-1`}>
                      Any additional comments?
                    </label>
                    <textarea 
                      className={`w-full rounded-md px-3 py-2 text-sm ${
                        customization.theme === 'light' 
                          ? 'bg-white border border-gray-300 text-gray-800' 
                          : 'bg-gray-700 border border-gray-600 text-white'
                      }`}
                      rows="3"
                      placeholder="Your feedback helps us improve..."
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-end">
                    <button className={`px-4 py-2 rounded-md ${
                      customization.theme === 'brand'
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : customization.theme === 'light'
                          ? 'bg-gray-800 text-white hover:bg-gray-700'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                    } transition-colors text-sm`}>
                      Submit Feedback
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-6 bg-blue-900 bg-opacity-30 border border-blue-800 rounded-lg p-4">
        <div className="flex">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm text-blue-200 mb-1">
              Embed your form anywhere you want to collect feedback.
            </p>
            <p className="text-xs text-blue-300">
              Your embedded form will automatically update whenever you make changes to the original.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormEmbedding
