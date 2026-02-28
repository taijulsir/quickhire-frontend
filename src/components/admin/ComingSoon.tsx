'use client';

export default function ComingSoon({ title }: { title: string }) {
    return (
        <div className="flex-1 overflow-y-auto flex items-center justify-center p-8">
            <div className="bg-white rounded-2xl border border-gray-100 p-12 shadow-sm text-center max-w-md w-full">
                <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-3">{title}</h1>
                <p className="text-gray-500 text-lg mb-8">
                    We are working hard to bring this feature to life. Check back soon for updates!
                </p>
                <button
                    onClick={() => window.history.back()}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                    Go Back
                </button>
            </div>
        </div>
    );
}
