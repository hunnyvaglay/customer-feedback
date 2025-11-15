import { useState } from "react";
import "./App.css";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";

const mascot = "/mascot-transparent.png";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    rating: "",
    feedback: "",
    suggestions: "",
  });

  const [status, setStatus] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [showMascotMessage, setShowMascotMessage] = useState(false);

  const [width, height] = useWindowSize();
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");
    

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbxNkhRLotVbJhlcxnOysM467GM7Gdihxkhb0GjyalK-kkaZvTl4HE0PHeft45qbT7jSkQ/exec",
        {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setStatus("✅ Thank you for your feedback!");

      // 🎉 Show confetti + mascot popup
      setShowConfetti(true);
      // setShowMascotMessage(true);

      // Hide animations after 3 seconds
      setTimeout(() => {
        setShowConfetti(false);
        setShowMascotMessage(false);
      }, 2000);
        // Hide the thank-you message after 2 seconds
    setTimeout(() => {
      setStatus("");
    }, 2000);

      // Clear form fields
      setFormData({
        name: "",
        company: "",
        email: "",
        rating: "",
        feedback: "",
        suggestions: "",
        starRating: 0,
        csSpoc: "",


      });
    } catch (err) {
      setStatus("❌ Network error. Please try again later.");
    }
  };

  return (
    <div className="page-container">

      {/* Confetti overlay */}
      {showConfetti && (
        <Confetti width={width} height={height} recycle={false} numberOfPieces={5000} />
      )}

      {/* Mascot Popup (appears above form) */}
      {showMascotMessage && (
    <div className="mascot-popup">
      {/* <img src={mascot} className="mascot-animate" alt="mascot" /> */}
      {/* <p className="thank-text">Thank you for your feedback!</p> */}
    </div>
  )}

      {/* Top-right fixed mascot */}
      <img src={mascot} className="mascot" alt="mascot" />

      <div className="form-card">
        <h1>Customer Happiness Survey </h1>
        <p className="subtext">We value your honest input to help us improve.</p>


        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            name="company"
            placeholder="Company Name"
            value={formData.company}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

         <input
  name="csSpoc"
  type="text"
  placeholder="CS SPOC Name"
  value={formData.csSpoc}
  onChange={handleChange}
  required
/>


          <label >Overall Experience </label >
          <select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            required
          >
            <option value="">Select Rating</option>
            <option value="Excellent">Dissatisfied</option>
            <option value="Good">Satisfied</option>
            <option value="Average">Very Satisfied</option>
            <option value="Poor ">Excellent</option>
          </select>
          {/* 10-Star Additional Rating */}
<label className="rating-label" style={{ marginTop: "10px" }}>
  Customer Happiness Scale
</label>

<div className="stars-container">
  {[...Array(10)].map((_, i) => (
    <span
      key={i}
      className={i < (formData.starRating || 0) ? "star filled" : "star"}
      onClick={() => setFormData({ ...formData, starRating: i + 1 })}
    >
      ★
    </span>
  ))}
</div>


          <textarea
            name="feedback"
            // placeholder="Please share your feedback..."
            placeholder="Tell us about your overall experience with our service..."

            value={formData.feedback}
            onChange={handleChange}
            required
          />

          <textarea
            name="suggestions"
            // placeholder="Any suggestions for improvement?"
            placeholder="Let us know what we could do better to improve your experience..."

            value={formData.suggestions}
            onChange={handleChange}
          />

          <div className="button-div">

          <div className="submit-btn-container">
  <div className="submit-btn" onClick={handleSubmit}>
    Submit Feedback
  </div>
</div>

          </div>
        </form>

        {status && <p className="status">{status}</p>}
      </div>
    </div>
  );
}

export default App;
