import { useState, useEffect } from 'react'
import './App.css'

interface BookingForm {
  name: string
  phone: string
  email: string
  address: string
  pickupDate: string
  pickupTime: string
  services: string[]
  specialInstructions: string
}

const services = [
  { id: 'dry-cleaning', name: 'Dry Cleaning', icon: '🧥', desc: 'Suits, dresses, delicate fabrics' },
  { id: 'wash-fold', name: 'Wash & Fold', icon: '👕', desc: 'Everyday clothes' },
  { id: 'alterations', name: 'Alterations', icon: '👗', desc: 'Tailoring & repairs' },
  { id: 'household', name: 'Household Items', icon: '🛏️', desc: 'Curtains, bedding, upholstery' },
  { id: 'express', name: 'Express Service', icon: '⚡', desc: 'Same-day turnaround' },
  { id: 'stain-removal', name: 'Stain Removal', icon: '✨', desc: 'Specialized treatment' },
]

function App() {
  const [form, setForm] = useState<BookingForm>({
    name: '', phone: '', email: '', address: '',
    pickupDate: '', pickupTime: '', services: [], specialInstructions: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  const handleServiceToggle = (serviceId: string) => {
    setForm(prev => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(s => s !== serviceId)
        : [...prev.services, serviceId]
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Booking submitted:', form)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="app">
        <header className="header">
          <div className="logo">
            <span className="logo-icon">👔</span>
            <h1>Hare Krishna Dry Cleaners</h1>
          </div>
        </header>
        <main className="confirmation">
          <div className="confirmation-card">
            <span className="check-icon">✅</span>
            <h2>Pickup Scheduled!</h2>
            <p>Thank you, {form.name}! We'll pick up your items on {form.pickupDate} at {form.pickupTime}.</p>
            <p>A confirmation has been sent to {form.email}</p>
            <button className="btn btn-primary" onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', email: '', address: '', pickupDate: '', pickupTime: '', services: [], specialInstructions: '' }) }}>
              Book Another Pickup
            </button>
          </div>
        </main>
      </div>
    )
  }


  return (
    <div className="app">
      <header className="header">
        <nav className="navbar">
          <div className="logo">
            <span className="logo-icon">👔</span>
            <h1>Hare Krishna Dry Cleaners</h1>
          </div>
          <ul className="nav-links">
            <li><a href="#services">Services</a></li>
            <li><a href="#booking">Book Pickup</a></li>
            <li><a href="#contact">Contact</a></li>
            <li>
              <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)} aria-label="Toggle dark mode">
                {darkMode ? '☀️' : '🌙'}
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <h2>Premium Dry Cleaning at Your Doorstep</h2>
            <p>Professional care for your garments with free pickup and delivery</p>
            <a href="#booking" className="btn btn-primary">Schedule Pickup</a>
          </div>
        </section>

        <section id="services" className="services">
          <h2>Our Services</h2>
          <div className="services-grid">
            {services.map(service => (
              <div key={service.id} className="service-card">
                <span className="service-icon">{service.icon}</span>
                <h3>{service.name}</h3>
                <p>{service.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="booking" className="booking">
          <h2>Book a Pickup</h2>
          <form className="booking-form" onSubmit={handleSubmit}>
            <div className="form-section">
              <h3>Contact Information</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input type="text" id="name" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Your name" />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input type="tel" id="phone" required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="Your phone" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input type="email" id="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="your@email.com" />
                </div>
                <div className="form-group full-width">
                  <label htmlFor="address">Pickup Address *</label>
                  <input type="text" id="address" required value={form.address} onChange={e => setForm({...form, address: e.target.value})} placeholder="Full address" />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Pickup Schedule</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="pickupDate">Pickup Date *</label>
                  <input type="date" id="pickupDate" required value={form.pickupDate} onChange={e => setForm({...form, pickupDate: e.target.value})} min={new Date().toISOString().split('T')[0]} />
                </div>
                <div className="form-group">
                  <label htmlFor="pickupTime">Preferred Time *</label>
                  <select id="pickupTime" required value={form.pickupTime} onChange={e => setForm({...form, pickupTime: e.target.value})}>
                    <option value="">Select time slot</option>
                    <option value="9:00 AM - 11:00 AM">9:00 AM - 11:00 AM</option>
                    <option value="11:00 AM - 1:00 PM">11:00 AM - 1:00 PM</option>
                    <option value="1:00 PM - 3:00 PM">1:00 PM - 3:00 PM</option>
                    <option value="3:00 PM - 5:00 PM">3:00 PM - 5:00 PM</option>
                    <option value="5:00 PM - 7:00 PM">5:00 PM - 7:00 PM</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Select Services</h3>
              <div className="services-select">
                {services.map(service => (
                  <label key={service.id} className={`service-option ${form.services.includes(service.id) ? 'selected' : ''}`}>
                    <input type="checkbox" checked={form.services.includes(service.id)} onChange={() => handleServiceToggle(service.id)} />
                    <span className="service-icon">{service.icon}</span>
                    <span className="service-name">{service.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-section">
              <h3>Special Instructions</h3>
              <div className="form-group full-width">
                <textarea id="instructions" rows={3} value={form.specialInstructions} onChange={e => setForm({...form, specialInstructions: e.target.value})} placeholder="Any special care instructions or notes..." />
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-submit" disabled={form.services.length === 0}>
              Schedule Pickup
            </button>
          </form>
        </section>

        <section id="contact" className="contact">
          <h2>Contact Us</h2>
          <div className="contact-grid">
            <div className="contact-item">
              <span>📍</span>
              <p>123 Main Street, Your City</p>
            </div>
            <div className="contact-item">
              <span>📞</span>
              <p>+1 (555) 123-4567</p>
            </div>
            <div className="contact-item">
              <span>✉️</span>
              <p>info@harekrishnadrycleaners.com</p>
            </div>
            <div className="contact-item">
              <span>🕐</span>
              <p>Mon-Sat: 8AM - 8PM</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Hare Krishna Dry Cleaners. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
