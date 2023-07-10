import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, setQuestions }) {
  async function handleDelete(id) {
    const response = await fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    });
    const filteredQuestions = questions.filter(
      (question) => question.id !== id
    );
    setQuestions(filteredQuestions);
  }

  const handleAnswerChange = async (selection, id) => {
    const response = await fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex: selection })
    });
    const data = await response.json();
    const filteredQuestions = questions.map((question) => question.id !== id)
    setQuestions(filteredQuestions);
  };

  const questionMap = questions.map((question) => (
    <QuestionItem
      key={question.id}
      onAnswerChange={handleAnswerChange}
      onDeleteQuestion={handleDelete}
      question={question}
    />
  ));
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionMap}</ul>
    </section>
  );
}

export default QuestionList;
