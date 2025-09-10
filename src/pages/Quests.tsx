export default function Quests() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-dark eagle-lake-font">Quests</h1>
        <button className="btn-primary">New Quest</button>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {/* Quest cards will be mapped here */}
        <div className="card">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-medium text-dark eagle-lake-font">Example Quest</h2>
              <p className="mt-1 text-sm text-gray-500">A brief description of the quest objectives</p>
            </div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              In Progress
            </span>
          </div>
          <div className="mt-4">
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block text-primary-600">
                    Progress
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-primary-600">
                    30%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary-200">
                <div style={{ width: "30%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



