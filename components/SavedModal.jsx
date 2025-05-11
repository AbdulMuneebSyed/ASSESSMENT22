
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const SavedModal = ({ theme }) => {
  // Default to the default theme if no theme is provided
  const themeStyles = theme || {
    bg: "bg-gray-100",
    text: "text-gray-800",
    font: "font-sans",
    primary: "bg-green-500",
    card: "bg-white rounded-lg shadow-md p-4",
  };

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { scale: 0.8, opacity: 0, y: 20 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  const checkmarkVariants = {
    hidden: { scale: 0, pathLength: 0 },
    visible: {
      scale: 1,
      pathLength: 1,
      transition: {
        delay: 0.2,
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3,
        duration: 0.3,
      },
    },
  };

  const animationVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.5,
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={backdropVariants}
    >
      <motion.div
        className={`${themeStyles.card} max-w-md w-full mx-4 text-center`}
        variants={modalVariants}
      >
        <div className="flex flex-col items-center py-6 px-4">
          {/* Success checkmark */}
          <motion.div
            className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${themeStyles.primary}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <Check className="w-10 h-10 text-white" />
          </motion.div>

          {/* Success message */}
          <motion.h3
            className={`text-2xl font-bold mb-2 ${themeStyles.text} ${themeStyles.font}`}
            variants={textVariants}
          >
            Customization Saved!
          </motion.h3>

          <motion.p
            className={`text-gray-600 mb-6 ${themeStyles.font}`}
            variants={textVariants}
          >
            Your t-shirt design has been successfully saved.
          </motion.p>

          {/* Animation illustration */}
          <motion.div
            className="relative w-full h-16 mb-4"
            variants={animationVariants}
          >
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                x: [0, -10, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              <svg
                width="120"
                height="60"
                viewBox="0 0 120 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 10H100V50H20V10Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M20 10L40 20V40L20 50"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M100 10L80 20V40L100 50"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <motion.circle
                  cx="60"
                  cy="30"
                  r="10"
                  fill="currentColor"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                />
              </svg>
            </motion.div>
          </motion.div>

          <motion.p
            className={`text-sm ${themeStyles.text} ${themeStyles.font}`}
            variants={textVariants}
          >
            Your Shirt have been registered.
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SavedModal;
