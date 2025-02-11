const featuredProducts = [
  { id: 1, name: "Printed T-Shirt", price: 15, image: "/tshirt.jpg" },
  { id: 2, name: "Custom Mug", price: 10, image: "/mugs.jpg" },
  { id: 3, name: "Branded Notebook", price: 8, image: "/office.jpg" },
  { id: 4, name: "USB Flash Drive", price: 12, image: "/tech.jpg" },
];

export default function FeaturedProducts() {
  return (
    <section className="max-w-6xl mx-auto py-12 text-center">
      <h2 className="text-3xl font-bold mb-6">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {featuredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h3>
              <p className="text-gray-600 mt-2">${product.price}</p>
              <button className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md w-full">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
