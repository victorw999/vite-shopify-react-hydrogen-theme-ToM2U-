import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Placeholder components
function Home() {
  return <div>This is the Home view</div>
}

function About() {
  return <div>This is the About view</div>
}

function Contact() {
  return <div>This is the Contact view</div>
}

function App() {
  const [currentView, setCurrentView] = useState('home')

  return (
    <BrowserRouter>
      <div>
        {/* Navigation - buttons or links to update currentView */}
        <button onClick={() => setCurrentView('home')}>Home</button>
        <button onClick={() => setCurrentView('about')}>About</button>
        <button onClick={() => setCurrentView('contact')}>Contact</button>
      </div>

      <Routes>
        {/* Single catch-all route */}
        <Route
          path="*"
          element={
            <div>
              {currentView === 'home' && <Home />}
              {currentView === 'about' && <About />}
              {currentView === 'contact' && <Contact />}
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
