

export default function Component() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="w-full px-6 py-4">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">SearchHub</div>
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
            >
              About
            </a>
            <a
              href="#"
              className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
            >
              Features
            </a>
            <a
              href="#"
              className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
            >
              Contact
            </a>
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-4xl mx-auto text-center">
          {/* Hero Section */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-slate-100 mb-6">
              Find Anything,
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Instantly
              </span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
              The most powerful search engine to discover, explore, and find exactly what you're looking for across the
              web.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for anything..."
                className="w-full pl-12 pr-4 py-4 text-lg rounded-full border-2 border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 shadow-lg bg-white dark:bg-slate-800"
              />
              <Button size="lg" className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full px-8">
                Search
              </Button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <Button variant="secondary" size="sm" className="rounded-full">
              Popular Searches
            </Button>
            <Button variant="secondary" size="sm" className="rounded-full">
              Trending Now
            </Button>
            <Button variant="secondary" size="sm" className="rounded-full">
              Advanced Search
            </Button>
            <Button variant="secondary" size="sm" className="rounded-full">
              Lucky Search
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">10M+</div>
              <div className="text-slate-600 dark:text-slate-400">Searches Daily</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">99.9%</div>
              <div className="text-slate-600 dark:text-slate-400">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">{"<0.1s"}</div>
              <div className="text-slate-600 dark:text-slate-400">Average Response</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full px-6 py-8 border-t border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">SearchHub</div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                The next generation search platform for the modern web.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>
                  <a href="#" className="hover:text-slate-900 dark:hover:text-slate-100">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-slate-900 dark:hover:text-slate-100">
                    API
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-slate-900 dark:hover:text-slate-100">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>
                  <a href="#" className="hover:text-slate-900 dark:hover:text-slate-100">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-slate-900 dark:hover:text-slate-100">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-slate-900 dark:hover:text-slate-100">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>
                  <a href="#" className="hover:text-slate-900 dark:hover:text-slate-100">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-slate-900 dark:hover:text-slate-100">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-slate-900 dark:hover:text-slate-100">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700 mt-8 pt-8 text-center text-sm text-slate-600 dark:text-slate-400">
            © 2024 SearchHub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
