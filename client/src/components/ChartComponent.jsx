import React from 'react'

// Dummy component to simulate chart components
// In a real implementation, you would use react-chartjs-2 components
const ChartComponent = ({ type, data, options, height }) => {
  return (
    <div className={`bg-black border border-gray-800 rounded-lg p-4 ${height || 'h-64'}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white font-medium">{options.title}</h3>
        {options.legend && (
          <div className="flex items-center space-x-4">
            {data.labels.map((label, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-1" 
                  style={{backgroundColor: data.datasets[0].backgroundColor[index]}}
                ></div>
                <span className="text-xs text-gray-400">{label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="flex-1 flex items-center justify-center">
        {type === 'bar' && <BarChartPlaceholder data={data} />}
        {type === 'line' && <LineChartPlaceholder data={data} />}
        {type === 'pie' && <PieChartPlaceholder data={data} />}
        {type === 'doughnut' && <DoughnutChartPlaceholder data={data} />}
      </div>
    </div>
  )
}

// Placeholder components for different chart types
const BarChartPlaceholder = ({ data }) => {
  const maxValue = Math.max(...data.datasets[0].data) || 1
  
  return (
    <div className="w-full h-full flex items-end space-x-2 pt-4 pb-6 px-4">
      {data.datasets[0].data.map((value, index) => (
        <div key={index} className="flex-1 flex flex-col items-center">
          <div 
            className="w-full rounded-t-md" 
            style={{
              backgroundColor: data.datasets[0].backgroundColor[index] || '#3B82F6',
              height: `${(value / maxValue) * 100}%`
            }}
          ></div>
          <span className="text-xs text-gray-400 mt-2">{data.labels[index]}</span>
        </div>
      ))}
    </div>
  )
}

const LineChartPlaceholder = ({ data }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 100 50" className="w-full h-full">
        <polyline
          fill="none"
          stroke="#3B82F6"
          strokeWidth="2"
          points="0,50 20,30 40,35 60,15 80,25 100,10"
        />
        <g>
          {[0, 20, 40, 60, 80, 100].map((x, i) => (
            <circle key={i} cx={x} cy={i === 0 ? 50 : i === 1 ? 30 : i === 2 ? 35 : i === 3 ? 15 : i === 4 ? 25 : 10} r="2" fill="#3B82F6" />
          ))}
        </g>
      </svg>
    </div>
  )
}

const PieChartPlaceholder = ({ data }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-32 h-32">
        <svg viewBox="0 0 36 36" className="w-full h-full">
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="4"
            strokeDasharray="75, 100"
          />
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#8B5CF6"
            strokeWidth="4"
            strokeDasharray="20, 100"
            strokeDashoffset="-75"
          />
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#EC4899"
            strokeWidth="4"
            strokeDasharray="5, 100"
            strokeDashoffset="-95"
          />
        </svg>
      </div>
    </div>
  )
}

const DoughnutChartPlaceholder = ({ data }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-32 h-32">
        <svg viewBox="0 0 36 36" className="w-full h-full">
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="3.8"
            strokeDasharray="60, 100"
          />
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#8B5CF6"
            strokeWidth="3.8"
            strokeDasharray="30, 100"
            strokeDashoffset="-60"
          />
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#EC4899"
            strokeWidth="3.8"
            strokeDasharray="10, 100"
            strokeDashoffset="-90"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-gray-900 rounded-full w-20 h-20"></div>
        </div>
      </div>
    </div>
  )
}

export default ChartComponent
