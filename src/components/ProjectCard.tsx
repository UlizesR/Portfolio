import type { ContentItem } from '../lib/content';

interface ProjectCardProps {
  project: ContentItem;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group">
      <div className="aspect-video bg-tn-bg-alt rounded-2xl mb-6 overflow-hidden border border-tn-border">
        <img src={project.image} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" alt={project.title} />
      </div>
      <h4 className="text-2xl font-bold mb-2">{project.title}</h4>
      <p className="text-tn-fg-muted mb-4 leading-relaxed">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.tags?.map(tag => (
          <span key={tag} className="text-[10px] px-2 py-1 bg-tn-bg-elevated border border-tn-border font-bold uppercase text-tn-fg-muted rounded">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
