import React, { useState } from 'react'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    subject: '',
    email: '',
    message: '',
  })

  const [errors, setErrors] = useState({})

  // form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // validate form 
  const validateForm = () => {
    let newErrors = {}
    if (formData.fullName.length < 3) {
      newErrors.fullName = 'Full name must be at least 3 characters.'
    }
    if (formData.subject.length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters.'
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address.'
    }
    if (formData.message.length < 3) {
      newErrors.message = 'Message must be at least 3 characters.'
    }
    return newErrors
  }

  // handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
    } else {
      console.log('Form Submitted Successfully:', formData)
      setErrors({})
      alert('Message Sent Successfully!')
      setFormData({ fullName: '', subject: '', email: '', message: '' }) 
    }
  }

  return (
    <div>
      <div className="contact-container">
        <h1>Contact Us</h1>
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <label>name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <p className="error">{errors.fullName}</p>}

          {/* Subject */}
          <label>subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
          />
          {errors.subject && <p className="error">{errors.subject}</p>}

          {/* Email */}
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}

          {/* Message */}
          <label>Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
          />
          {errors.message && <p className="error">{errors.message}</p>}

          {/* Submit Button */}
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  )
}

export default ContactPage
