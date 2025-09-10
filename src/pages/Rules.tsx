export default function Rules() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-dark eagle-lake-font">Rules</h1>
        <button className="btn-primary">Upload Rules</button>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {/* Rules documents will be mapped here */}
        <div className="card">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-medium text-dark eagle-lake-font">Core Rulebook</h2>
                <p className="text-sm text-gray-500">PDF • 25MB</p>
              </div>
            </div>
            <button className="btn-secondary">View</button>
          </div>
        </div>
      </div>
    </div>
  );
}



