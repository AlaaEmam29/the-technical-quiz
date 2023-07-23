import React from 'react';
import Typed from 'typed.js';
const strings = [
    "Linux",
"DevOps",
"Networking",
"Programming", 
"Cloud",
"Docker",
"Kubernetes",
"And lots more"
]
export default function Typing() {
  // Create reference to store the DOM element containing the animation
  const el = React.useRef(null);

  React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings,
      typeSpeed: 50,
      backSpeed: 30, 
      loop: true, 
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);

    return (
      <div className='header'>
        <h1>
          The Technical Quiz includes a wide number of &nbsp;
          <span ref={el} /> questions
        </h1>
        <p>Test your knowledge on a specific topic with our quizzes!</p>
      </div>
    );
}
