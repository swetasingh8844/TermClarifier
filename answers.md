# Short-Answer Questions

## Q1 – Leveraging AI in Front-End Delivery

"Describe, with concrete examples, how you would use AI-powered coding or design assistants to accelerate front-end development in a startup where shipping fast matters but code quality can't slip."

### Answer:

In a fast-paced startup environment, I'd leverage AI tools strategically to accelerate development while maintaining code quality:

1. **AI-powered code generation** for repetitive patterns: I'd use GitHub Copilot or Claude to quickly scaffold React components following our design system. For example, asking "Create a responsive product card component with image, title, price, and add-to-cart button that follows our accessibility guidelines" would give me a starting point that I'd then review and refine.

2. **Design-to-code conversion**: Tools like Builder.io or V0 can transform Figma designs into production-ready React components. We'd integrate these into our CI pipeline where designers can export designs and get preliminary code that developers then optimize.

3. **Automated testing assistance**: Having AI generate test cases for components ensures we don't skip tests when rushing. I'd prompt: "Write Jest tests for this UserProfile component, covering all edge cases including loading states and error handling."

4. **Code reviews and quality checks**: Using AI to pre-review code before human review catches basic issues. A GitHub Action integrating GPT-4 could analyze PRs for potential bugs, accessibility issues, and performance bottlenecks before the team reviews.

5. **Documentation generation**: Automating documentation keeps it from being sacrificed for speed. After completing a feature, I'd ask an AI to "Generate comprehensive JSDoc for this authentication module" and then verify its accuracy.

The key is using AI as an accelerator and first-pass tool, with human developers always reviewing, refining, and making final decisions.

## Q2 – Inventing an AI Feature for Class 11 Students

"You're tasked with designing a new AI feature that makes Physics revision easier for Indian class 11 students. Outline two key features and sketch the user journey in plain text."

### Answer:

### Physics Personalized AI Revision Assistant (PAIR)

#### Feature 1: Concept Visualization Generator
This feature transforms abstract physics concepts into interactive visualizations tailored to each student's learning style.

**User Journey:**
1. Student inputs a difficult concept: "I don't understand the relationship between torque and angular momentum."
2. PAIR analyzes which visualization style works best based on the student's past interactions (3D models, vector diagrams, or real-world analogies).
3. PAIR generates a personalized visualization matching NCERT curriculum specifics.
4. Student can manipulate variables (e.g., changing the force applied to see how torque changes) and observe real-time effects.
5. PAIR provides contextual explanations as the student explores, connecting the visualization to their textbook examples.
6. Student can save visualizations to their personal library for exam revision.

#### Feature 2: Exam-Pattern Practice Problem Generator
This feature creates infinite practice problems following the exact CBSE exam pattern while adapting to individual weaknesses.

**User Journey:**
1. Student selects a chapter (e.g., "Laws of Motion") and difficulty level.
2. PAIR generates a problem set matching CBSE exam style and difficulty.
3. Student solves problems on their tablet/paper and submits solutions through the camera.
4. PAIR analyzes their work, identifying conceptual misunderstandings rather than just marking answers right/wrong.
5. For incorrect solutions, PAIR provides a step-by-step breakdown highlighting exactly where the student's understanding diverged.
6. PAIR updates the student's knowledge graph and generates targeted follow-up problems addressing specific weaknesses.
7. Before exams, PAIR generates a personalized revision plan focusing on concepts where the knowledge graph shows gaps.