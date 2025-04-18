import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleDelete() {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    }).then(() => onDeleteQuestion(id));
  }

  function handleChange(e) {
    const newIndex = parseInt(e.target.value);

    // 1) Optimistically update UI:
    onUpdateQuestion({ ...question, correctIndex: newIndex });

    // 2) Then persist to server:
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex: newIndex }),
    })
      .then((r) => r.json())
      .then((updatedQuestion) => {
        // Reconcile in case server munged anything
        onUpdateQuestion(updatedQuestion);
      });
  }

  return (
    <li>
      <h4>{prompt}</h4>
      <label>
        Correct Answer:
        <select value={correctIndex} onChange={handleChange}>
          {answers.map((ans, idx) => (
            <option key={idx} value={idx}>
              {ans}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
