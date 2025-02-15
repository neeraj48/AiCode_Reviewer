// import { useEffect, useState } from "react";
// import "prismjs/themes/prism-tomorrow.css";
// import "./App.css";
// import prism from "prismjs";
// import Editor from "react-simple-code-editor";
// import axios from "axios";
// import Markdown from "react-markdown";

// function App() {
//   const [code, setCode] = useState("");
//   const [codeReview, setCodeReview] = useState("");
//   useEffect(() => {
//     prism.highlightAll();
//   });

//   const reviewHandler = async () => {
//     try {
//       const res = await axios.post("http://localhost:3000/ai/get-response", {
//         code,
//       });
//       console.log(res.data);
//       setCodeReview(res.data?.response);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <>
//       <main>
//         <div className="left">
//           <div className="code">
//             <Editor
//               value={code}
//               onValueChange={(code) => setCode(code)}
//               highlight={(code) =>
//                 prism.highlight(code, prism.languages.javascript, "javascript")
//               }
//               padding={10}
//               style={{
//                 fontFamily: '"Fira code", "Fira Mono", monospace',
//                 fontSize: 12,
//                 border: "1px solid #ddd",
//                 borderRadius: "5px",
//                 height: "100%",
//                 width: "100%",
//               }}
//             />
//           </div>
//           <div className="review" onClick={reviewHandler}>
//             Review
//           </div>
//         </div>
//         <div className="right">
//           <Markdown>{codeReview}</Markdown>
//         </div>
//       </main>
//     </>
//   );
// }

// export default App;

import React, { useEffect, useState, useCallback } from "react";
import "prismjs/themes/prism-tomorrow.css";
import "./App.css";
import prism from "prismjs";
import Editor from "react-simple-code-editor";
import axios from "axios";
import Markdown from "react-markdown";
// process.env.REACT_APP_API_ENDPOINT ||
const API_ENDPOINT = "http://localhost:3000/ai/get-response"; // Use environment variable

function App() {
  const [code, setCode] = useState("");
  const [codeReview, setCodeReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const highlight = useCallback((code) => {
    return prism.highlight(code, prism.languages.javascript, "javascript");
  }, []);

  useEffect(() => {
    prism.highlightAll();
  }, [codeReview]); // re-highlight when the review changes

  const reviewHandler = async () => {
    if(code.trim() === "") {
      setError("Please enter some code to review.");
      return;
    }
    setLoading(true);
    setError(null); // Clear any previous errors
    try {
      const res = await axios.post(API_ENDPOINT, { code });

      if (res.status !== 200) {
        throw new Error(`HTTP error! Status: ${res.status}`); // Handle non-200 responses
      }

      setCodeReview(res.data?.response);
    } catch (err) {
      console.error("Error fetching code review:", err);
      setError(err.message || "Failed to fetch code review."); // Provide user-friendly error message
      setCodeReview(""); // Clear any existing review on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <h4>Code Reviewer Powered by Gen Ai</h4>
      </div>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={highlight}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%",
              }}
            />
          </div>
          <button className="review" onClick={reviewHandler} disabled={loading}>
            {loading ? "Reviewing..." : "Review"}
          </button>
        </div>
        <div className="right">
          {error && <div className="error-message">Error: {error}</div>}{" "}
          {/* Display error message */}
          {loading ? <p>Loading...</p> : <Markdown>{codeReview}</Markdown>}{" "}
          {/* Show loading indicator */}
        </div>
      </main>
    </>
  );
}

export default App;
