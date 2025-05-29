import { TestimonialsType } from "../../../interfaces/Interfaces";

const TestimonialCard = ({
  testimonial,
}: {
  testimonial: TestimonialsType;
}) => {
  return (
    <div className="testimonial-card ">
      <div className="top-section">
        <img
          className="profile-img"
          src={testimonial.img}
          alt={testimonial.name}
        />
        <div className="info">
          <h4>{testimonial.name}</h4>
          <p className="city">{testimonial.city} </p>
          <div className="rating"> {"⭐".repeat(testimonial.rating)} </div>
        </div>
      </div>
      <p className="comment">
        Leo did an amazing job fixing our leaking kitchen sink. Super clean and
        professional!
      </p>
      <div className=" d-flex justify-content-around align-items-center ">
        {testimonial.repairImages.length > 0 ? (
          testimonial.repairImages.map((image) => {
            return (
              <img
                className="img-fluid repair-img"
                key={crypto.randomUUID()}
                src={image}
                alt=""
              />
            );
          })
        ) : (
          <p>No repair images available</p>
        )}
      </div>
    </div>
  );
};

export default TestimonialCard;
