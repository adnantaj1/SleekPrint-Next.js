import Link from "next/link";

const categories = [
  {
    name: "T-Shirts",
    image: "/tshirt.jpg",
    link: "/products?category=tshirts",
  },
  {
    name: "Mugs & Bottles",
    image: "/mugs.jpg",
    link: "/products?category=mugs",
  },
  {
    name: "Office Supplies",
    image: "/office.jpg",
    link: "/products?category=office",
  },
  { name: "Tech Gadgets", image: "/tech.jpg", link: "/products?category=tech" },
];

export default function CategorySection() {
  return (
    <section className="max-w-6xl mx-auto py-12 text-center">
      <h2 className="text-3xl font-bold mb-6">Browse by Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={category.link}
            className="block shadow-lg rounded-lg overflow-hidden bg-white"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-40 object-cover"
            />
            <h3 className="text-xl font-semibold p-4 text-gray-800">
              {category.name}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
