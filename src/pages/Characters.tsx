export default function Characters() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-dark eagle-lake-font">Characters</h1>
        <button className="btn-primary">New Character</button>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Character cards will be mapped here */}
        <div className="card">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-gray-200"></div>
            <div>
              <h2 className="text-lg font-medium text-dark eagle-lake-font">Example NPC</h2>
              <p className="text-sm text-gray-500">Human Merchant</p>
            </div>
          </div>
          <div className="mt-4 flex space-x-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              NPC
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}



