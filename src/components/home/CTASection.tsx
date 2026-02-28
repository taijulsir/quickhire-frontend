import Image from 'next/image';
import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="bg-indigo-600 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Start posting<br />jobs today
            </h2>
            <p className="text-indigo-100 mb-8">
              Start posting jobs for only $10.
            </p>
            <Link
              href="/admin/login"
              className="inline-block bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Sign Up For Free
            </Link>
          </div>
          <div className="relative hidden lg:block">
            <div className="bg-white rounded-xl p-4 shadow-2xl">
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600 font-bold">76</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">Applications</div>
                    <div className="text-xs text-gray-500">This month</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-amber-50 rounded-lg">
                    <div className="text-2xl font-bold text-amber-600">24</div>
                    <div className="text-xs text-gray-500">Interviews Scheduled</div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">158</div>
                    <div className="text-xs text-gray-500">Total Views</div>
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-900">Job Views</span>
                    <span className="text-xs text-gray-500">12</span>
                  </div>
                  <div className="h-24 flex items-end gap-1">
                    {[40, 60, 45, 80, 55, 70, 65, 90, 50, 75, 85, 60].map((h, i) => (
                      <div key={i} className="flex-1 bg-indigo-200 rounded-t" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-indigo-50 rounded-lg">
                  <div className="text-3xl font-bold text-indigo-600">2,342</div>
                  <div className="text-sm text-gray-500">Messages Received</div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">67</div>
                  <div className="text-xs text-gray-500">New Candidates</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
