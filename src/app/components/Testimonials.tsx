const testimonials = [
  {
    name: "John Doe",
    text: "Amazing quality and super fast shipping!",
    rating: 5,
  },
  {
    name: "Sarah Smith",
    text: "Our company swag has never looked better!",
    rating: 4.5,
  },
  {
    name: "Mike Johnson",
    text: "Highly recommend for all branding needs!",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="max-w-6xl mx-auto py-12 text-center">
      <h2 className="text-3xl font-bold mb-6">What Our Customers Say</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {testimonials.map((review, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-6">
            <p className="text-gray-600 italic">"{review.text}"</p>
            <h4 className="mt-4 font-semibold text-gray-800">{review.name}</h4>
            <p className="text-yellow-500">
              {"⭐".repeat(Math.floor(review.rating))}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
