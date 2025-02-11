import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Column 1 - About */}
        <div>
          <h3 className="text-lg font-semibold">About Us</h3>
          <p className="text-gray-400 mt-2">
            We provide high-quality custom printed merchandise to elevate your
            brand.
          </p>
        </div>

        {/* Column 2 - Quick Links */}
        <div>
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <Link href="/" className="text-gray-400 hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="text-gray-400 hover:text-white">
                Products
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-gray-400 hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-gray-400 hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3 - Contact Info */}
        <div>
          <h3 className="text-lg font-semibold">Contact Us</h3>
          <p className="text-gray-400 mt-2">Email: support@example.com</p>
          <p className="text-gray-400">Phone: +1 234 567 890</p>
          <div className="flex space-x-4 mt-4">
            <Link href="#">
              <span className="text-gray-400 hover:text-white">
                📘 Facebook
              </span>
            </Link>
            <Link href="#">
              <span className="text-gray-400 hover:text-white">
                📷 Instagram
              </span>
            </Link>
            <Link href="#">
              <span className="text-gray-400 hover:text-white">🐦 Twitter</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} SleekPrint. All rights reserved.
      </div>
    </footer>
  );
}
