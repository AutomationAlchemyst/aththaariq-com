import * as React from 'react';

interface WelcomeEmailProps {
  email: string;
}

export const WelcomeEmail: React.FC<Readonly<WelcomeEmailProps>> = ({ email }) => (
  <div>
    <h1>Welcome, Systems Thinker!</h1>
    <p>
      Thank you for subscribing, {email}. As promised, here is your guide:
    </p>
    <p>
      <strong>The 5-Minute Daily Automation Audit</strong>
    </p>
    <p>
      This is the exact checklist I use to find and eliminate time-wasting tasks and foundational risks in any business. 
      {/* In a real-world scenario, you would link to your PDF here. */}
      <a href="#">Download Your PDF Here</a>
    </p>
    <p>
      I look forward to helping you build better systems.
    </p>
    <p>
      Best,
      <br />
      Ath Thaariq
    </p>
  </div>
);
