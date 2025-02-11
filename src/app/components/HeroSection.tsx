export default function HeroSection() {
  return (
    <section className="relative h-screen flex flex-col justify-center items-center text-white">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40 "
        style={{ backgroundImage: "url('/home-cover.jpg')" }}
      ></div>

      <div className="relative z-10 max-w-3xl p-6">
        <h1 className="text-4xl md:text-6xl font-bold">
          Your Brand, Your Style
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-200">
          Custom Printed Merchandise for Businesses & Events. High-Quality, Fast
          Delivery!
        </p>
        <button className="mt-6 bg-green-500 hover:bg-green-600 px-6 py-3 rounded-md text-lg">
          Shop Now
        </button>
      </div>
    </section>
  );
}
