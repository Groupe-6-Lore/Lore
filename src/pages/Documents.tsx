export default function Documents() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-dark eagle-lake-font">Documents</h1>
        <button className="btn-primary">Upload Document</button>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {/* Documents will be mapped here */}
        <div className="card">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-medium text-dark eagle-lake-font">Campaign Notes</h2>
                <p className="text-sm text-gray-500">Last modified: 2 days ago</p>
              </div>
            </div>
            <button className="btn-secondary">View</button>
          </div>
        </div>
      </div>
    </div>
  );
}



