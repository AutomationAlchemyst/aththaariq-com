import * as React from 'react';

// 1. UPDATE THE INTERFACE
// Add the 'downloadUrl' property to tell the component it should expect this data.
interface WelcomeEmailProps {
  email: string;
  downloadUrl: string;
}

// 2. UPDATE THE COMPONENT'S PROPS
// Add 'downloadUrl' to the list of props the component receives.
export const WelcomeEmail: React.FC<Readonly<WelcomeEmailProps>> = ({ email, downloadUrl }) => (
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
      {/* 3. UPDATE THE LINK */}
      {/* The href now uses the dynamic downloadUrl prop. */}
      <a href={downloadUrl}>Download Your PDF Here</a>
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
