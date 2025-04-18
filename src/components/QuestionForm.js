import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const [prompt, setPrompt] = useState("");
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [correctIndex, setCorrectIndex] = useState("0");

  function handleSubmit(e) {
    e.preventDefault();
    const newQuestion = {
      prompt,
      answers: [answer1, answer2],
      correctIndex: parseInt(correctIndex),
    };

    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    })
      .then((r) => r.json())
      .then(onAddQuestion);
  }

  return (
    <section>
      <h2>New Question</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </label>
        <label>
          Answer 1:
          <input
            type="text"
            value={answer1}
            onChange={(e) => setAnswer1(e.target.value)}
          />
        </label>
        <label>
          Answer 2:
          <input
            type="text"
            value={answer2}
            onChange={(e) => setAnswer2(e.target.value)}
          />
        </label>
        <label>
          Correct Answer:
          <select
            value={correctIndex}
            onChange={(e) => setCorrectIndex(e.target.value)}
          >
            <option value="0">Answer 1</option>
            <option value="1">Answer 2</option>
          </select>
        </label>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;
