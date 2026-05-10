const ErrorFallback = ({ error, resetErrorBoundary }: any) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-100 p-8 text-center bg-red-900/10 rounded-2xl border border-red-900/20">
            <h2 className="text-2xl font-bold text-red-500 mb-4">Sorry, something went wrong.</h2>
            <p className="text-gray-400 mb-6">{error.message}</p>
            <button
                onClick={resetErrorBoundary}
                className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-full font-bold transition-all"
            >
                Try Again
            </button>
        </div>
    );
};

export default ErrorFallback;
