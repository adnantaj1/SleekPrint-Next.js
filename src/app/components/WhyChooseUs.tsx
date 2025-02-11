export default function WhyChooseUs() {
  return (
    <section className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
        <p className="text-lg text-gray-300 mb-6">
          We are dedicated to providing top-quality custom printing solutions
          for businesses and individuals.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {/* Feature 1 */}
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">🚚 Fast Delivery</h3>
            <p className="text-gray-400 mt-2">
              Get your custom products delivered in record time.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">🏆 Premium Quality</h3>
            <p className="text-gray-400 mt-2">
              We use high-quality materials and printing techniques.
            </p>
          </div>
          {/* Feature 3 */}
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">💰 Affordable Prices</h3>
            <p className="text-gray-400 mt-2">
              Enjoy great pricing with bulk order discounts.
            </p>
          </div>
          {/* Feature 4 */}
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">🔄 100% Satisfaction</h3>
            <p className="text-gray-400 mt-2">
              We guarantee top-notch customer satisfaction.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
