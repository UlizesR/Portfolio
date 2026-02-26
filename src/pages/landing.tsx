import type { ContentItem } from '../lib/content';
import { getCategories } from '../lib/content';
import {
  Nav,
  PageLayout,
  Hero,
  SectionHeader,
  Footer,
  ProjectCard,
  CategoryCard,
} from '../components';

interface LandingProps {
  blogs: ContentItem[];
  projects: ContentItem[];
}

export default function Landing({ blogs, projects }: LandingProps) {
  const categories = getCategories(blogs);

  return (
    <PageLayout>
      <Nav />
      <Hero />
      <main className="space-y-40">
        <section id="projects">
          <SectionHeader>Projects</SectionHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {projects.map(project => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>

        <section id="blogs">
          <SectionHeader>Blogs</SectionHeader>
          <div className="flex flex-col gap-8">
            <a href="#/blogs" className="text-sm font-bold text-tn-fg-muted hover:text-tn-accent transition uppercase inline-flex items-center gap-2">
              View all blogs →
            </a>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {categories.map(cat => (
                <CategoryCard key={cat.name} name={cat.name} count={cat.count} image={cat.image} />
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </PageLayout>
  );
}
