import { privacyPolicyConfig } from '../config/privacy-policy'

export default function PrivacyPolicyComponent() {
  const { appName, organization, lastUpdated, sections } = privacyPolicyConfig

  return (
    <div className="privacy-container">
      {/* Header */}
      <div className="privacy-header">
        <h1 className="privacy-title">{sections.introduction.title}</h1>
        <p className="privacy-subtitle">
          Internal application for {organization}
        </p>
      </div>

      {/* Introduction */}
      <div className="privacy-section">
        <div className="privacy-content">{sections.introduction.content}</div>
      </div>

      {/* Data Access */}
      <div className="privacy-section">
        <h2 className="privacy-section-title">{sections.dataAccess.title}</h2>
        <ul className="privacy-list">
          {sections.dataAccess.items.map((item, index) => (
            <li key={index} className="privacy-list-item">
              <div className="privacy-list-bullet" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Usage Scope */}
      <div className="privacy-section">
        <h2 className="privacy-section-title">{sections.usageScope.title}</h2>
        <div className="privacy-content">{sections.usageScope.content}</div>
      </div>

      {/* Data Storage */}
      <div className="privacy-section">
        <h2 className="privacy-section-title">{sections.dataStorage.title}</h2>
        <div className="privacy-content">{sections.dataStorage.content}</div>
      </div>

      {/* Contact */}
      <div className="privacy-section">
        <h2 className="privacy-section-title">{sections.contact.title}</h2>
        <div className="privacy-content">{sections.contact.content}</div>
      </div>

      {/* Footer */}
      <div className="privacy-footer">
        <p>
          {appName} | {organization}
        </p>
        <p className="mt-2">
          Last updated:{' '}
          {new Date(lastUpdated).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      </div>
    </div>
  )
}
