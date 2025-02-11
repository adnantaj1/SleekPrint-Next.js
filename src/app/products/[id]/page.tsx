export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const res = await fetch(`http://localhost:3000/api/products/${params.id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <main className="max-w-4xl mx-auto py-12 text-center">
        <h1 className="text-3xl font-bold text-red-500">Product Not Found</h1>
        <p className="text-gray-600 mt-4">
          Sorry, this product does not exist.
        </p>
      </main>
    );
  }

  const product = await res.json();

  return (
    <main className="max-w-4xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">{product.title}</h1>
      <img
        src={product.imageUrl}
        alt={product.title}
        className="w-full h-60 object-cover rounded-lg mb-6"
      />
      <p className="text-lg text-gray-700">{product.description}</p>
      <p className="text-2xl font-bold text-green-600 mt-4">${product.price}</p>
      <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md">
        Add to Cart
      </button>
    </main>
  );
}
