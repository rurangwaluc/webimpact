import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  ExternalLink,
  Layers3,
} from "lucide-react";
import type { WorkProject } from "@/lib/cms/work";
import styles from "./work-preview-section.module.css";

export function WorkPreviewSectionClient({
  projects,
}: {
  projects: WorkProject[];
}) {
  const visualProjects = projects
    .filter((project) => Boolean(project.cover_image_url))
    .slice(0, 6);

  if (visualProjects.length === 0) {
    return <EmptyWorkState />;
  }

  const mainProject = visualProjects[0];
  const supportingProjects = visualProjects.slice(1, 5);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Proof</p>
            <h2 className={styles.title}>
              Real systems. Real interfaces. Real business use.
            </h2>
            <p className={styles.subtitle}>
              Visual proof first. Open the case study only when you want the full problem, system, and result.
            </p>
          </div>

          <Link href="/work" className={styles.headerLink}>
            View all work
            <ArrowRight className={styles.linkIcon} />
          </Link>
        </div>

        <div className={styles.board}>
          <FeaturedProject project={mainProject} />

          {supportingProjects.length > 0 ? (
            <div className={styles.supportGrid}>
              {supportingProjects.map((project) => (
                <SupportProject key={project.id} project={project} />
              ))}
            </div>
          ) : null}
        </div>

        <Link href="/work" className={styles.libraryLink}>
          <span className={styles.libraryIcon}>
            <BriefcaseBusiness className={styles.librarySvg} />
          </span>
          <span className={styles.libraryCopy}>
            <strong>See the full proof library</strong>
            <span>More real projects with screenshots and case studies.</span>
          </span>
          <span className={styles.libraryAction}>
            Open work
            <ArrowRight className={styles.linkIcon} />
          </span>
        </Link>
      </div>
    </section>
  );
}

function FeaturedProject({ project }: { project: WorkProject }) {
  return (
    <article className={styles.featuredCard}>
      <ProjectImage project={project} className={styles.featuredImage} priority />

      <div className={styles.featuredBody}>
        <div>
          <div className={styles.metaRow}>
            <span className={styles.featuredBadge}>
              <CheckCircle2 className={styles.badgeIcon} />
              Featured proof
            </span>
            <span className={styles.typeBadge}>{project.project_type}</span>
          </div>

          <h3 className={styles.featuredTitle}>{project.title}</h3>
        </div>

        <div className={styles.proofStrip} aria-label="Case study proof points">
          <ProofItem label="Problem" text={project.problem} />
          <ProofItem label="System" text={project.solution} />
          <ProofItem label="Result" text={project.result} />
        </div>

        <div className={styles.actionRow}>
          <Link href={`/work/${project.slug}`} className={styles.primaryAction}>
            Read case study
            <ArrowRight className={styles.linkIcon} />
          </Link>

          {project.live_url ? (
            <Link
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondaryAction}
            >
              Live project
              <ExternalLink className={styles.linkIcon} />
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function SupportProject({ project }: { project: WorkProject }) {
  return (
    <article className={styles.supportCard}>
      <ProjectImage project={project} className={styles.supportImage} small />

      <div className={styles.supportBody}>
        <span className={styles.typeBadge}>{project.project_type}</span>
        <h3 className={styles.supportTitle}>{project.title}</h3>
        <Link href={`/work/${project.slug}`} className={styles.supportAction}>
          Read case study
          <ArrowRight className={styles.linkIcon} />
        </Link>
      </div>
    </article>
  );
}

function ProofItem({ label, text }: { label: string; text: string }) {
  return (
    <div className={styles.proofItem}>
      <p>{label}</p>
      <span>{text}</span>
    </div>
  );
}

function ProjectImage({
  project,
  className,
  priority = false,
  small = false,
}: {
  project: WorkProject;
  className: string;
  priority?: boolean;
  small?: boolean;
}) {
  return (
    <Link
      href={`/work/${project.slug}`}
      aria-label={`View ${project.title} case study`}
      className={`${styles.imageLink} ${className}`}
    >
      {project.cover_image_url ? (
        <img
          src={project.cover_image_url}
          alt={`${project.title} case study preview`}
          loading={priority ? "eager" : "lazy"}
          className={styles.image}
        />
      ) : (
        <div className={styles.emptyImage}>
          <BriefcaseBusiness className={styles.emptyIcon} />
        </div>
      )}

      {small ? <span className={styles.proofPill}>Proof</span> : null}
    </Link>
  );
}

function EmptyWorkState() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.emptyState}>
          <div className={styles.emptyMark}>
            <Layers3 className={styles.emptyMarkIcon} />
          </div>
          <div>
            <p className={styles.eyebrow}>Proof</p>
            <h2 className={styles.title}>Add visual published work to power this section.</h2>
            <p className={styles.subtitle}>
              Publish work projects with cover images and the homepage will show real visual proof here.
            </p>
          </div>
          <Link href="/work" className={styles.primaryAction}>
            Open work page
            <ArrowRight className={styles.linkIcon} />
          </Link>
        </div>
      </div>
    </section>
  );
}
