function App() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Expense Tracker
        </h1>
        <p className="text-gray-600">
          Welcome to your personal finance manager!
        </p>
        <button className="mt-4 bg-yellow-500 hover:bg-orange-500 text-white font-semibold py-2 px-4 rounded transition-colors">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default App;
