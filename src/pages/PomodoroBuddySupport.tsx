import './PomodoroBuddySupport.css'
import ThemeToggle from '../components/ThemeToggle'

function PomodoroBuddySupport() {
  return (
    <div className="support-page">
      <ThemeToggle />
      <div className="support-container">
        <header className="support-header">
          <h1 className="support-title">Pomodoro Buddy</h1>
          <p className="support-subtitle">Support & Help</p>
        </header>

        <main className="support-content">
          <section className="support-section">
            <h2 className="support-section-title">Getting Started</h2>
            <p>
              Pomodoro Buddy is a focus timer app that uses the Pomodoro
              Technique to help you work in structured intervals. Open the app,
              tap play, and start your first focus session.
            </p>

            <h3>Timer Modes</h3>
            <ul>
              <li>
                <strong>Pomodoro Mode</strong> — Work sessions followed by short
                breaks, with a long break after a set number of sessions. The
                app handles the full cycle automatically.
              </li>
              <li>
                <strong>Simple Mode</strong> — A single focus timer with no
                automatic break cycling. Start and stop whenever you want.
              </li>
            </ul>
            <p>
              You can switch between modes in the <strong>Settings</strong> tab.
            </p>

            <h3>Customizing Durations</h3>
            <p>In Settings, adjust:</p>
            <ul>
              <li>
                <strong>Work duration</strong> — Length of each focus session
                (1–60 minutes)
              </li>
              <li>
                <strong>Short break</strong> — Length of short breaks between
                sessions (1–30 minutes)
              </li>
              <li>
                <strong>Long break</strong> — Length of the longer break after
                completing a cycle (5–60 minutes)
              </li>
              <li>
                <strong>Long break after</strong> — Number of work sessions
                before a long break (2–8 sessions)
              </li>
            </ul>

            <h3>Focus Mode</h3>
            <p>
              Tap the <strong>Focus Mode</strong> button on the timer screen to
              enter an immersive fullscreen view. Tap anywhere to show or hide
              the controls. Tap the palette icon to cycle through background
              gradients.
            </p>

            <h3>Live Activities</h3>
            <p>
              When a timer is running, Pomodoro Buddy displays your progress on
              the Lock Screen and in the Dynamic Island. This lets you track your
              session without opening the app.
            </p>

            <h3>Home Screen Widget</h3>
            <p>
              Add the Pomodoro Buddy widget to your home screen to see your
              daily focus progress at a glance. Long-press your home screen, tap{' '}
              <strong>+</strong>, search for "Pomodoro Buddy", and add the
              widget.
            </p>

            <h3>Statistics</h3>
            <p>
              The <strong>Stats</strong> tab shows:
            </p>
            <ul>
              <li>Today's completed sessions and focus minutes</li>
              <li>Daily goal progress</li>
              <li>Current streak</li>
              <li>Weekly session chart</li>
              <li>Recent session history</li>
            </ul>

            <h3>Notifications</h3>
            <p>
              Pomodoro Buddy sends a notification when each session completes.
              You can enable or disable notifications in Settings. When prompted,
              allow notifications for the best experience.
            </p>
          </section>

          <section className="support-section">
            <h2 className="support-section-title">Frequently Asked Questions</h2>

            <div className="faq-item">
              <h3>Does the timer work in the background?</h3>
              <p>
                Yes. When you leave the app, the timer continues running. A
                notification will alert you when the session completes, and the
                Live Activity on your Lock Screen shows the remaining time.
              </p>
            </div>

            <div className="faq-item">
              <h3>Can I change the daily goal?</h3>
              <p>
                Yes. Go to <strong>Settings</strong> and adjust the{' '}
                <strong>Daily Goal</strong> to any number between 1 and 20
                sessions.
              </p>
            </div>

            <div className="faq-item">
              <h3>How do I reset my data?</h3>
              <p>
                In Settings, scroll to the bottom and tap{' '}
                <strong>Clear All Data</strong>. This will delete all session
                history and reset settings to defaults. This action cannot be
                undone.
              </p>
            </div>

            <div className="faq-item">
              <h3>Does the app collect any data?</h3>
              <p>
                No. All data is stored locally on your device. Pomodoro Buddy
                has no accounts, no analytics, and no network communication.
                Your data stays on your device.
              </p>
            </div>

            <div className="faq-item">
              <h3>Does the app work without an internet connection?</h3>
              <p>Yes. Pomodoro Buddy works entirely offline.</p>
            </div>
          </section>

          <section className="support-section">
            <h2 className="support-section-title">Troubleshooting</h2>

            <div className="troubleshoot-item">
              <h3>Timer not showing on Lock Screen</h3>
              <p>
                Make sure Live Activities are enabled for Pomodoro Buddy. Go to{' '}
                <strong>
                  iOS Settings &rarr; Pomodoro Buddy &rarr; Live Activities
                </strong>{' '}
                and ensure it is turned on.
              </p>
            </div>

            <div className="troubleshoot-item">
              <h3>Not receiving notifications</h3>
              <p>
                Go to{' '}
                <strong>
                  iOS Settings &rarr; Pomodoro Buddy &rarr; Notifications
                </strong>{' '}
                and make sure notifications are allowed. Also check that
                notifications are enabled within the app under{' '}
                <strong>Settings &rarr; Notifications</strong>.
              </p>
            </div>

            <div className="troubleshoot-item">
              <h3>Widget not updating</h3>
              <p>
                Try removing and re-adding the widget. Widgets update
                periodically and may take a moment to reflect your latest
                session data.
              </p>
            </div>
          </section>

          <section className="support-section support-contact">
            <h2 className="support-section-title">Contact</h2>
            <p>If you need help or have feedback, reach out at:</p>
            <a href="mailto:support@example.com" className="contact-link">
              support@example.com
            </a>
            <p className="contact-note">We'd love to hear from you.</p>
          </section>
        </main>
      </div>
    </div>
  )
}

export default PomodoroBuddySupport
