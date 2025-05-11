
import { motion } from "framer-motion";

const Preloader = ({ theme }) => {
  // Default to the default theme if no theme is provided
  const themeStyles = theme || {
    bg: "bg-gray-100",
    text: "text-gray-800",
    font: "font-sans",
    primary: "bg-green-500",
  };

  // Animation variants for the loading dots
  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const dotVariants = {
    initial: { y: 0, opacity: 0 },
    animate: {
      y: [0, -15, 0],
      opacity: 1,
      transition: {
        duration: 0.8,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  };

  const logoVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div
      className={`fixed inset-0 ${themeStyles.bg} flex flex-col items-center justify-center z-50`}
    >
      <motion.div
        className="flex flex-col items-center"
        initial="initial"
        animate="animate"
        variants={containerVariants}
      >
        {/* Logo or icon */}
        <motion.div className="mb-8" variants={logoVariants}>
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={themeStyles.text}
          >
            <path
              d="M20.38 3.46L16 2L8 2L3.62 3.46C2.67 3.73 2 4.6 2 5.58V20.01C2 21.11 2.89 22 3.99 22H20.01C21.11 22 22 21.11 22 20.01V5.58C22 4.6 21.33 3.73 20.38 3.46ZM16 18H8V16H16V18ZM16 14H8V12H16V14ZM16 10H8V8H16V10Z"
              fill="currentColor"
            />
          </svg>
        </motion.div>

        <motion.h2
          className={`text-2xl font-bold mb-6 ${themeStyles.text} ${themeStyles.font}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Loading T-Shirt Customizer
        </motion.h2>

        {/* Loading dots */}
        <motion.div className="flex space-x-3">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className={`w-4 h-4 rounded-full ${themeStyles.primary}`}
              variants={dotVariants}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Preloader;
