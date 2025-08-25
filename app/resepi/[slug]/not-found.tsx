import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <div className="mb-8">
        <svg
          className="w-24 h-24 mx-auto text-gray-400 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467-.881-6.08-2.33M15 17.5c0 1.38-1.12 2.5-2.5 2.5S10 18.88 10 17.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5z"
          />
        </svg>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Resepi Tidak Dijumpai</h1>
        <p className="text-lg text-gray-600 mb-8">
          Maaf, resepi yang anda cari tidak wujud atau mungkin telah dialihkan.
        </p>
      </div>

      <div className="space-y-4">
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Kembali ke Halaman Utama
        </Link>
        
        <div className="text-gray-600">
          atau{' '}
          <Link href="/" className="text-blue-600 hover:text-blue-800 underline">
            cari resepi lain
          </Link>
        </div>
      </div>
    </div>
  )
}
