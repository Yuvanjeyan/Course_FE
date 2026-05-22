import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";

const questions = [
  {
    id: 1,
    question: "What is the best way to stay engaged in an online course?",
    options: ["Watch videos passively", "Practice regularly", "Skip quizzes", "Ignore deadlines"],
    answer: 1,
  },
  {
    id: 2,
    question: "What is most important for professional course completion?",
    options: ["Consistency", "Trying once", "Skipping modules", "Relying on others"],
    answer: 0,
  },
];

function QuizPage() {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const handleSelect = (questionId, optionIndex) => {
    setAnswers({ ...answers, [questionId]: optionIndex });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const score = questions.reduce((acc, item) => {
      return acc + (answers[item.id] === item.answer ? 1 : 0);
    }, 0);
    setResult(`${score} / ${questions.length}`);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-200 p-10">
        <p className="text-sm uppercase tracking-[0.2em] text-blue-600">Learning Assessment</p>
        <h1 className="text-4xl font-semibold mt-4 mb-6">Quiz System</h1>
        <p className="text-gray-600 mb-8">Engage with course assessments designed to help you retain knowledge and earn progress milestones.</p>

        <form className="space-y-8" onSubmit={handleSubmit}>
          {questions.map((item) => (
            <div key={item.id} className="rounded-3xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">{item.question}</h2>
              <div className="grid gap-3">
                {item.options.map((option, index) => (
                  <button
                    type="button"
                    key={option}
                    onClick={() => handleSelect(item.id, index)}
                    className={`text-left rounded-2xl border p-4 ${answers[item.id] === index ? "border-blue-600 bg-blue-50" : "border-gray-200 bg-white"}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <button className="bg-blue-600 text-white py-4 px-8 rounded-3xl hover:bg-blue-700">Submit Answers</button>
        </form>

        {result && (
          <div className="mt-8 rounded-3xl border border-green-200 bg-green-50 p-6 text-green-800">
            <p className="font-semibold">Quiz Complete</p>
            <p className="mt-2">Your score is {result}. Keep learning to improve your results.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default QuizPage;
