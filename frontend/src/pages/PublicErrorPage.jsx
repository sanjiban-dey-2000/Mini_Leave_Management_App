import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const PublicErrorPage = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6">
      {/* Big 404 */}
      <h1 className="text-8xl font-extrabold drop-shadow-lg">404</h1>

      {/* Message */}
      <h2 className="mt-4 text-2xl md:text-3xl font-bold">
        Oops! Page Not Found
      </h2>
      <p className="mt-2 text-center text-sm md:text-base text-indigo-200 max-w-md">
        The page you’re looking for doesn’t exist or has been moved. Don’t worry, you can
        always head back to safety.
      </p>

      {/* Button */}
      <Link
        to="/"
        className="mt-6 flex items-center gap-2 bg-white text-indigo-700 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-indigo-100 transition"
      >
        <FaHome /> Go Back Home
      </Link>
    </section>
  );
};

export default PublicErrorPage;
