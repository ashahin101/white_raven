import type { Route } from './+types/about';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'about - White_Raven' },
    {
      name: 'about',
      content: 'About White_Raven interactive fiction game developer.',
    },
  ];
}

export default function About() {
  return (
    <div className="p-3 container">
      <h4>About White Raven</h4>

      <p>
        <strong>White Raven</strong> is an interactive fiction experience where
        the reader navigates a branching story. Throughout the narrative,
        riddles are introduced, and the reader selects cards to solve them and
        determine how the story unfolds. Each decision influences the storyline
        and gradually reveals aspects of the reader’s personality.
      </p>
      <p>
        By the end of the journey, the reader receives a personality description
        inspired by
        <a href="https://en.wikipedia.org/wiki/Myers%E2%80%93Briggs_Type_Indicator">
          {' the Myers-Briggs Type Indicator® (MBTI®)'}
        </a>
        , originally developed by Katharine Cook Briggs and Isabel Briggs Myers.
      </p>

      <p>White Raven was created for two main purposes:</p>

      <ol>
        <li>
          <strong>Software engineering showcase</strong> — demonstrating my
          skills in building a full-stack application, including frontend
          architecture, backend services, and application design.
        </li>
        <li>
          <strong>Creative project</strong> — an experimental story engine that
          I plan to expand with deeper narratives, richer mechanics, and
          additional gameplay systems.
        </li>
      </ol>

      <p>
        The project explores how storytelling, decision systems, and personality
        modeling can be combined into an interactive narrative experience.
      </p>
      <hr />
      <section>
        <h5>Why White Raven Is a Strong Skills Showcase</h5>

        <strong>1. It Solves a Real, Non-Trivial Problem</strong>
        <p>
          Building an interactive branching narrative requires designing a
          <strong>{` story tree data structure `}</strong>that is both flexible
          and performant. This is a genuine engineering challenge — not a
          tutorial project.
        </p>

        <strong>2. It Demonstrates Product Thinking</strong>
        <p>
          White Raven isn't just technically functional — it has a
          <strong>{` user experience goal:`}</strong> to entertain, engage, and
          deliver a meaningful personality result. This shows the ability to
          think beyond code and consider the end user.
        </p>

        <strong>3. It Is Publicly Deployable and Shareable</strong>
        <p>
          A live, working application is far more compelling in a portfolio or
          interview than a GitHub repo alone. White Raven can be demoed in
          real-time, which is a powerful differentiator.
        </p>

        <strong>4. It Covers the Full Engineering Lifecycle</strong>
        <p>
          From designing data structures → building APIs → crafting UI
          components → deploying to the cloud, White Raven demonstrates
          ownership of the
          <strong>{` entire software development lifecycle`}</strong>.
        </p>

        <strong>5. It Shows Creative Initiative</strong>
        <p>
          Taking a personal creative idea — interactive fiction with personality
          modeling — and engineering it into a working product signals
          self-motivation, curiosity, and the ability to drive projects
          independently.
        </p>
      </section>
      <hr />
      <div className="mb-3 p-3 border border-secondary-subtle rounded">
        <p className="m-0">
          Developed by<strong>{` Abdallah Shahin`}</strong>.
          <br />
          <a href="https://github.com/ashahin101">Github: ashahin101</a>
          <br />
          <a href="https://github.com/ashahin101/white_raven" target="_blank">
            {'White Raven Sourcecode'}
          </a>
          <br />
          <a
            href="https://illustrious-peak-4c2.notion.site/A-Shahin-Home-3017eced98738006ac8dd9ac809de8e4?source=copy_link"
            target="_blank"
          >
            {'My Portfolio'}
          </a>
          <br />
          <a
            href="https://illustrious-peak-4c2.notion.site/Contact-Us-3017eced98738059ac71da25023415f1"
            target="_blank"
          >
            {'Contact-us'}
          </a>
        </p>
      </div>
    </div>
  );
}
