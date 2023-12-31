const LoadCards = () => {
  return (
    <div className="border border-blue-300 dark:border-white shadow rounded-md p-4 w-full mx-auto mb-4">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-slate-700 dark:bg-slate-200 h-10 w-10"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-slate-700 dark:bg-slate-200 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-700 rounded dark:bg-slate-200 col-span-2"></div>
              <div className="h-2 bg-slate-700 rounded dark:bg-slate-200 col-span-1"></div>
            </div>
            <div className="h-2 bg-slate-700 dark:bg-slate-200 rounded"></div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="h-2 bg-slate-700 rounded dark:bg-slate-200 col-span-1"></div>
            <div className="h-2 bg-slate-700 rounded dark:bg-slate-200 col-span-2"></div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div className="h-2 bg-slate-700 rounded dark:bg-slate-200 col-span-2"></div>
            <div className="h-2 bg-slate-700 rounded dark:bg-slate-200 col-span-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadCards;
