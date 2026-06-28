import { BarChart3, Boxes, Globe2, Workflow, Zap, Layers3 } from "lucide-react";

const credibilityItems = [
  { label: "Sales visibility", icon: BarChart3 },
  { label: "Stock control", icon: Boxes },
  { label: "Internal workflows", icon: Workflow },
  { label: "Executive dashboards", icon: Layers3 },
  { label: "Automation", icon: Zap },
  { label: "Websites that sell", icon: Globe2 },
];

export function CredibilityStrip() {
  return (
    <section className="credibility-section">
      <div className="home-container">
        <div className="credibility-panel">
          <div className="credibility-lead">
            <p>Built for serious operations</p>
            <p>Systems for businesses that need control, speed, and clarity.</p>
          </div>

          <div className="credibility-grid">
            {credibilityItems.map((item) => {
              const Icon = item.icon;

              return (
                <div className="credibility-item" key={item.label}>
                  <span className="credibility-icon">
                    <Icon />
                  </span>
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
