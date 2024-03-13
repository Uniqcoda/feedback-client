"use client";
import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    email: "rooms@hotel.ng",
    first_name: "Maureen",
    last_name: "Doe",
    gender: "",
    country: "",
    message: "Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdamrecusandae alias error harum maxime adipisci amet laborum. Perspiciatis minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur fugiat, temporibus enim commodi iusto libero magni deleniti quod quam consequuntur! Commodi minima excepturi repudiandae velit hic maximedoloremque. Quaerat provident commodi consectetur veniam similique ad earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labore suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab laudantiummodi minima sunt esse temporibus sint culpa, recusandae aliquam numquam totam ratione voluptas quod exercitationem fuga.",
    agree_to_terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            mutation SubmitFeedback($input: FeedbackInput!) {
              submitFeedback(input: $input) {
                email
                first_name
                last_name
                gender
                country
                message
                agree_to_terms
              }
            }
          `,
          variables: {
            input: formData,
          },
        }),
      });

      const data = await response.json();

      if (data.errors) {
        throw new Error(data.errors[0].message);
      } else {
        alert("Feedback submitted successfully!");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Error submitting feedback. Please try again.");
    }
  };

  return (
    <div>
      <h1>Feedback Form</h1>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />
        <label>First Name:</label>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
        <br />
        <label>Last Name:</label>
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
        <br />
        <label>Gender:</label>
        <input
          type="radio"
          name="gender"
          value="Male"
          onChange={handleChange}
          required
        />{" "}
        Male
        <input
          type="radio"
          name="gender"
          value="Female"
          onChange={handleChange}
          required
        />{" "}
        Female
        <br />
        <label>Country:</label>
        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
        >
          <option value="">--Please choose a country--</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
          <option value="Nigeria">Nigeria</option>
          <option value="India">India</option>
          <option value="Kenya">Kenya</option>
          <option value="Canada">Canada</option>
          {/* Add more countries as needed */}
        </select>
        <br />
        <label>Message:</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <br />
        <label>
          <input
            type="checkbox"
            name="agree_to_terms"
            checked={formData.agree_to_terms}
            onChange={handleChange}
            required
          />{" "}
          I agree to the terms and conditions
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
