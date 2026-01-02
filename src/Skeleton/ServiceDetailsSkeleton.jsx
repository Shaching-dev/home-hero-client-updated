import React from "react";

const ServiceDetailsSkeleton = () => {
  return (
    <div className="bg-[#F5F5F5] py-10 min-h-screen">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-2/5 h-64 md:h-[400px] bg-gray-200"></div>

            <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="h-6 w-20 bg-gray-200 rounded-full"></div>

                  <div className="h-8 w-16 bg-gray-200 rounded-lg"></div>
                </div>

                <div className="h-10 w-3/4 bg-gray-200 rounded-lg mb-4"></div>

                <div className="space-y-3 mb-6">
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                  <div className="h-4 w-full bg-gray-200 rounded"></div>
                  <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
                </div>

                <div className="space-y-3 border-t pt-4">
                  <div className="flex gap-4">
                    <div className="h-4 w-16 bg-gray-100 rounded"></div>
                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                  </div>
                  <div className="flex gap-4">
                    <div className="h-4 w-16 bg-gray-100 rounded"></div>
                    <div className="h-4 w-40 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <div className="h-12 w-full md:w-40 bg-gray-200 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsSkeleton;
