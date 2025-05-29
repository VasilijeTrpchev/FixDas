import { useEffect, useState } from "react";
import { TestimonialsType } from "../../../interfaces/Interfaces";
import "./Testimonials.css";
import TestimonialCard from "./TestimonialCard";
const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<TestimonialsType[]>([]);
  useEffect(() => {
    const fetchTestimonials = async () => {
      const response = await fetch(
        "https://api-fixdas.onrender.com/testimonials"
      );
      const testimonialsData = await response.json();
      setTestimonials(testimonialsData);
    };
    fetchTestimonials();
  }, []);
  return (
    <div className="container-fluid testimonial-bg mt-5">
      <div className="row ">
        <div className="col-12 text-center ">
          <div className="testimonial-top-img">
            <img src="/HomepageTestimonials/testimonial-1.svg" alt="" />
          </div>
          <div className="testimonial-header">
            <h2 className="fs-1 pt-5">Echte Erfahrungen, echte Ergebnisse</h2>
            <p className="text-center">
              Erfahren Sie, wie unsere App Reparaturen und Verbesserungen für
              Menschen wie Sie erleichtert.
            </p>
          </div>
        </div>
        <div className="col-12 col-md-8 mx-md-auto mt-4">
          {testimonials.length > 0 ? (
            testimonials.map((testimonial: TestimonialsType) => (
              <TestimonialCard testimonial={testimonial} key={testimonial.id} />
            ))
          ) : (
            <p>No testimonials available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
