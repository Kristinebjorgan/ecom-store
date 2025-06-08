import React, { useState } from 'react'

/**
 * Contact form with validation and basic success handling.
 */
const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    subject: '',
    email: '',
    message: '',
  })

  const [errors, setErrors] = useState({})

  /**
   * Handles form input changes.
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e
   */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  /**
   * Validates the form input fields.
   * @returns {Object} newErrors - any validation errors found
   */
  const validateForm = () => {
    const newErrors = {}

    if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Full name must be at least 3 characters.'
    }
    if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters.'
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address.'
    }
    if (formData.message.trim().length < 3) {
      newErrors.message = 'Message must be at least 3 characters.'
    }

    return newErrors
  }

  /**
   * Handles form submission.
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
    } else {
      setErrors({})
      alert('Message Sent Successfully!')
      setFormData({ fullName: '', subject: '', email: '', message: '' })
    }
  }

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        {/* Full Name */}
        <label htmlFor="fullName">Name</label>
        <input
          id="fullName"
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
        />
        {errors.fullName && <p className="error">{errors.fullName}</p>}

        {/* Subject */}
        <label htmlFor="subject">Subject</label>
        <input
          id="subject"
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
        />
        {errors.subject && <p className="error">{errors.subject}</p>}

        {/* Email */}
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        {/* Message */}
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
        />
        {errors.message && <p className="error">{errors.message}</p>}

        {/* Submit Button */}
        <button type="submit">Send Message</button>
      </form>
    </div>
  )
}

export default ContactPage
