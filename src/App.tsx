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
  { id: 'dry-cleaning', name: 'Dry Cleaning', desc: 'Suits, dresses, and delicate fabrics' },
  { id: 'wash-fold', name: 'Wash & Fold', desc: 'Everyday clothes and linens' },
  { id: 'alterations', name: 'Alterations', desc: 'Professional tailoring and repairs' },
  { id: 'household', name: 'Household Items', desc: 'Curtains, bedding, and upholstery' },
  { id: 'express', name: 'Express Service', desc: 'Same-day turnaround available' },
  { id: 'stain-removal', name: 'Stain Removal', desc: 'Specialized stain treatment' },
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

  const resetForm = () => {
    setSubmitted(false)
    setForm({ name: '', phone: '', email: '', address: '', pickupDate: '', pickupTime: '', services: [], specialInstructions: '' })
  }

  if (submitted) {
    return (
      <div className="app">
        <header className="header">
          <div className="logo">
            <h1>Hare Krishna Dry Cleaners</h1>
          </div>
        </header>
        <main className="confirmation">
          <div className="confirmation-card">
            <div className="check-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9 12l2 2 4-4"/>
              </svg>
            </div>
            <h2>Pickup Scheduled</h2>
            <p>Thank you, {form.name}. We will pick up your items on {form.pickupDate} between {form.pickupTime}.</p>
            <p>A confirmation has been sent to {form.email}</p>
            <button className="btn btn-primary" onClick={resetForm}>Book Another Pickup</button>
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
            <h1>Hare Krishna Dry Cleaners</h1>
          </div>
          <ul className="nav-links">
            <li><a href="#services">Services</a></li>
            <li><a href="#booking">Book Pickup</a></li>
            <li><a href="#contact">Contact</a></li>
            <li>
              <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)} aria-label="Toggle dark mode">
                {darkMode ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                  </svg>
                )}
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <h2>Professional Garment Care</h2>
            <p>Quality dry cleaning with convenient pickup and delivery service</p>
            <a href="#booking" className="btn btn-primary">Schedule a Pickup</a>
          </div>
        </section>

        <section id="services" className="services">
          <h2>Our Services</h2>
          <div className="services-grid">
            {services.map(service => (
              <div key={service.id} className="service-card">
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
                  <label htmlFor="name">Full Name</label>
                  <input type="text" id="name" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input type="tel" id="phone" required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input type="email" id="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                </div>
                <div className="form-group full-width">
                  <label htmlFor="address">Pickup Address</label>
                  <input type="text" id="address" required value={form.address} onChange={e => setForm({...form, address: e.target.value})} />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Pickup Schedule</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="pickupDate">Pickup Date</label>
                  <input type="date" id="pickupDate" required value={form.pickupDate} onChange={e => setForm({...form, pickupDate: e.target.value})} min={new Date().toISOString().split('T')[0]} />
                </div>
                <div className="form-group">
                  <label htmlFor="pickupTime">Preferred Time</label>
                  <select id="pickupTime" required value={form.pickupTime} onChange={e => setForm({...form, pickupTime: e.target.value})}>
                    <option value="">Select a time slot</option>
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
              <h4>Address</h4>
              <p>123 Main Street, Your City</p>
            </div>
            <div className="contact-item">
              <h4>Phone</h4>
              <p>+1 (555) 123-4567</p>
            </div>
            <div className="contact-item">
              <h4>Email</h4>
              <p>info@harekrishnadrycleaners.com</p>
            </div>
            <div className="contact-item">
              <h4>Hours</h4>
              <p>Mon - Sat: 8:00 AM - 8:00 PM</p>
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
