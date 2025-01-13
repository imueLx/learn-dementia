"use client";
import { useState } from "react";
import {
  FaBrain,
  FaInfoCircle,
  FaHeartbeat,
  FaStethoscope,
} from "react-icons/fa";

export default function Learn() {
  const [modalContent, setModalContent] = useState(null);

  const dementiaTypes = [
    {
      icon: <FaBrain size={40} />,
      title: "Alzheimer's Disease",
      description:
        "The most common form of dementia, affecting memory and behavior.",
      details:
        "Alzheimer's disease is a progressive disorder that causes brain cells to degenerate and die. It's the most common cause of dementia and leads to memory loss, confusion, and changes in behavior. Early diagnosis can help manage symptoms effectively.",
    },
    {
      icon: <FaHeartbeat size={40} />,
      title: "Vascular Dementia",
      description:
        "Caused by reduced blood flow to the brain, often after a stroke.",
      details:
        "Vascular dementia results from damage to blood vessels in the brain, often caused by strokes or other conditions that impede blood flow. Symptoms include difficulty planning, slowed thinking, and poor concentration.",
    },
    {
      icon: <FaStethoscope size={40} />,
      title: "Lewy Body Dementia",
      description:
        "Characterized by abnormal deposits of protein in brain cells.",
      details:
        "Lewy body dementia is marked by deposits of protein called alpha-synuclein in the brain. It leads to visual hallucinations, movement disorders, and cognitive decline.",
    },
    {
      icon: <FaInfoCircle size={40} />,
      title: "Frontotemporal Dementia",
      description: "Affects personality, behavior, and language skills.",
      details:
        "Frontotemporal dementia involves the degeneration of the frontal and temporal lobes of the brain. It often causes significant changes in personality, social behavior, and communication abilities.",
    },
  ];

  const handleModalOpen = (details) => setModalContent(details);
  const handleModalClose = () => setModalContent(null);

  return (
    <>
      <main className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
        {/* Header */}
        <header className="bg-gradient-to-r from-blue-600 to-blue-400 text-white text-center py-16 px-6 dark:from-blue-700 dark:to-blue-500">
          <h1 className="text-5xl font-bold">Learn About Dementia</h1>
          <p className="mt-4 text-xl">
            Empower yourself with knowledge to understand dementia better.
          </p>
        </header>

        {/* Definition Section */}
        <section className="py-12 px-6 max-w-4xl mx-auto">
          <h2 className="text-4xl font-semibold text-center dark:text-white">
            What is Dementia?
          </h2>
          <p className="mt-6 text-lg text-gray-700 text-center leading-relaxed dark:text-gray-300">
            Dementia describes a group of symptoms affecting memory, thinking,
            and social abilities significantly enough to interfere with daily
            life. It's not a specific disease but a general term for several
            conditions.
          </p>
        </section>

        {/* Common Types Section */}
        <section className="py-12 bg-gray-100 dark:bg-gray-800">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl font-semibold text-center dark:text-white">
              Common Types of Dementia
            </h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dementiaTypes.map((type, index) => (
                <Card
                  key={index}
                  icon={type.icon}
                  title={type.title}
                  description={type.description}
                  onLearnMore={() => handleModalOpen(type.details)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Symptoms Section */}
        <section
          id="symptoms"
          className="pt-24 sm:pt-32 py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl font-semibold text-center dark:text-white">
            Symptoms of Dementia
          </h2>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-700 text-center dark:text-gray-300">
            Dementia symptoms can vary, but common signs include:
          </p>
          <ul className="mt-8 space-y-6">
            <li className="bg-white shadow-lg rounded-lg p-6 sm:p-8 text-base sm:text-lg text-gray-700 text-center dark:bg-gray-700 dark:text-white">
              <span className="text-4xl block mb-4">🧠</span>
              <span>Memory loss, especially forgetting recent events.</span>
            </li>
            <li className="bg-white shadow-lg rounded-lg p-6 sm:p-8 text-base sm:text-lg text-gray-700 text-center dark:bg-gray-700 dark:text-white">
              <span className="text-4xl block mb-4">🔍</span>
              <span>Difficulty concentrating and solving problems.</span>
            </li>
            <li className="bg-white shadow-lg rounded-lg p-6 sm:p-8 text-base sm:text-lg text-gray-700 text-center dark:bg-gray-700 dark:text-white">
              <span className="text-4xl block mb-4">⏳</span>
              <span>
                Confusion about time and place, leading to disorientation.
              </span>
            </li>
            <li className="bg-white shadow-lg rounded-lg p-6 sm:p-8 text-base sm:text-lg text-gray-700 text-center dark:bg-gray-700 dark:text-white">
              <span className="text-4xl block mb-4">💬</span>
              <span>
                Language problems, including struggling to find the right words.
              </span>
            </li>
            <li className="bg-white shadow-lg rounded-lg p-6 sm:p-8 text-base sm:text-lg text-gray-700 text-center dark:bg-gray-700 dark:text-white">
              <span className="text-4xl block mb-4">🚶</span>
              <span>
                Changes in personality and mood, such as depression or apathy.
              </span>
            </li>
          </ul>
        </section>

        {/* Call-to-Action Footer */}
        <footer className="bg-blue-600 text-white py-12 px-6 text-center dark:bg-blue-800">
          <h2 className="text-3xl font-semibold">Want to Learn More?</h2>
          <p className="mt-4 text-lg">
            Discover more resources or reach out to support groups for help.
          </p>
          <button className="mt-6 bg-blue-700 hover:bg-blue-800 text-white py-2 px-6 rounded-md font-semibold text-lg dark:bg-blue-600 dark:hover:bg-blue-500">
            <a
              href="https://www.alz.org/alzheimers-dementia/what-is-dementia"
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore Resources
            </a>
          </button>
        </footer>
      </main>

      {/* Modal */}
      {modalContent && (
        <Modal content={modalContent} onClose={handleModalClose} />
      )}
    </>
  );
}

// Card Component
function Card({ icon, title, description, onLearnMore }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center dark:bg-gray-700 dark:text-white">
      <div className="text-blue-500 mb-4">{icon}</div>
      <h3 className="text-2xl font-semibold">{title}</h3>
      <p className="mt-4 text-gray-600 dark:text-gray-300">{description}</p>
      <button
        onClick={onLearnMore}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md dark:bg-blue-500 dark:hover:bg-blue-400"
      >
        Learn More
      </button>
    </div>
  );
}

// Modal Component
function Modal({ content, onClose }) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto dark:bg-gray-800 dark:text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl text-gray-600 font-semibold mb-4 dark:text-white">
          More Information
        </h2>
        <p className="text-gray-700 dark:text-gray-300">{content}</p>
        <button
          onClick={onClose}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md dark:bg-blue-500 dark:hover:bg-blue-400"
        >
          Close
        </button>
      </div>
    </div>
  );
}
