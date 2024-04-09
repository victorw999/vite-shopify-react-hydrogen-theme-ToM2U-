function App() {
  return (
    <div className="App tw-container tw-font-sans">
      <div className="min-h-screen bg-slate-50 dark:bg-black dark:text-white">
        <header className="bg-teal-700 text-white sticky top-0 z-10">
          <section className="bg-teal-600 max-w-4xl mx-auto p-4 flex justify-between items-center">
            <h1 className="text-4xl  font-extrabold text-white uppercase">
              <a href="" id="">
                Test tailwindcss
              </a>
            </h1>
            <div>
              <button id="mobile-open-button" className="text-3xl sm:hidden focus:outline-none">
                &#9776;
              </button>
            </div>
            <nav className="tw-hide-on-mobile space-x-8 text-xl " aria-label="main">
              <a href="#" className="hover:opacity-50 hover:font-extrabold">
                One
              </a>
              <a href="#" className="hover:opacity-50 hover:font-extrabold">
                Two
              </a>
              <a href="#" className="hover:opacity-50 hover:font-extrabold">
                Three
              </a>
            </nav>
          </section>
        </header>
        <main className="max-w-4xl mx-auto bg-teal-100">main section</main>
      </div>
    </div>
  );
}

export default App;
