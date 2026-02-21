import './PomodoroBuddySupport.css'
import ThemeToggle from '../components/ThemeToggle'

function PomodoroBuddyPrivacy() {
  return (
    <div className="support-page">
      <ThemeToggle />
      <div className="support-container">
        <header className="support-header">
          <h1 className="support-title">Pomodoro Buddy</h1>
          <p className="support-subtitle">Privacy Policy</p>
        </header>

        <main className="support-content">
          <section className="support-section">
            <h2 className="support-section-title">Key Points</h2>

            <div className="faq-item">
              <h3>Data Collection</h3>
              <p>
                The app collects no personal information whatsoever. It operates
                entirely locally on your device.
              </p>
            </div>

            <div className="faq-item">
              <h3>Local Storage Only</h3>
              <p>
                All data — timer preferences, work session statistics, daily
                goals, and application settings — remains on your device and is
                never transmitted anywhere.
              </p>
            </div>

            <div className="faq-item">
              <h3>Minimal Permissions</h3>
              <p>
                Pomodoro Buddy requests only essential system permissions:
              </p>
              <ul>
                <li>
                  <strong>Notifications</strong> — to alert when sessions
                  complete
                </li>
                <li>
                  <strong>Live Activities</strong> — to display timer progress on
                  the Lock Screen and Dynamic Island
                </li>
              </ul>
            </div>

            <div className="faq-item">
              <h3>Security Features</h3>
              <p>
                The app runs within Apple's App Sandbox, which restricts access
                and prevents unauthorized data access. All data is stored using
                on-device SwiftData and UserDefaults only.
              </p>
            </div>

            <div className="faq-item">
              <h3>Third-Party Services</h3>
              <p>
                No integrations with analytics platforms, advertising networks,
                or external services exist. The app makes no network requests.
              </p>
            </div>

            <div className="faq-item">
              <h3>User Control</h3>
              <p>
                You maintain complete control — all settings can be modified
                within the app, and uninstalling removes all associated data. You
                can also clear all data at any time from the Settings tab.
              </p>
            </div>

            <div className="faq-item">
              <h3>Children's Privacy</h3>
              <p>
                Since no personal information is collected, the app is safe for
                users of all ages.
              </p>
            </div>

            <div className="faq-item">
              <h3>No Data Sharing</h3>
              <p>
                The developers do not share, sell, or provide user information to
                advertisers.
              </p>
            </div>
          </section>

          <section className="support-section support-contact">
            <p className="contact-note">Policy Last Updated: February 20, 2026</p>
            <p>For privacy questions, reach out at:</p>
            <a href="mailto:support@danialbeg.com" className="contact-link">
              support@danialbeg.com
            </a>
          </section>
        </main>
      </div>
    </div>
  )
}

export default PomodoroBuddyPrivacy
