import { FaPhone, FaEnvelope, FaInfoCircle } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">
        Contact Us
      </h1>
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flex items-center">
            <FaPhone className="text-blue-500 dark:text-blue-400 mr-4" />
            <span className="text-xl text-gray-900 dark:text-gray-100">
              +63 921 999 8764
            </span>
          </div>
          <div className="flex items-center">
            <FaEnvelope className="text-blue-500 dark:text-blue-400 mr-4" />
            <span className="text-xl text-gray-900 dark:text-gray-100">
              cogniticare101@gmail.com
            </span>
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              About Dementia
            </h2>
            <p className="text-lg text-gray-900 dark:text-gray-100">
              Dementia is a general term for a decline in mental ability severe
              enough to interfere with daily life. It is not a specific disease
              but an overall term that describes a wide range of symptoms.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              FAQ
            </h2>
            <p className="text-lg text-gray-900 dark:text-gray-100">
              <strong>Q: What is dementia?</strong>
              <br />
              A: Dementia is a term used to describe a group of symptoms
              affecting memory, thinking, and social abilities severely enough
              to interfere with daily functioning.
            </p>
            <p className="text-lg text-gray-900 dark:text-gray-100 mt-4">
              <strong>Q: How can I support someone with dementia?</strong>
              <br />
              A: Providing emotional support, creating a safe environment, and
              encouraging social engagement are some ways to support someone
              with dementia.
            </p>
          </div>
        </div>
        <div className="flex items-center col-span-1 md:col-span-2">
          <FaInfoCircle className="text-blue-500 dark:text-blue-400 mr-4" />
          <span className="text-lg text-gray-900 dark:text-gray-100">
            For more information, contact the students who created this website.
          </span>
        </div>
      </div>
    </div>
  );
};

export default Contact;
