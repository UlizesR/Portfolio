import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { getContent, getPrevNext, type ContentItem } from './lib/content';
import Landing from './pages/landing';
import Post from './pages/post';
import AllBlogs from './pages/all-blogs';
import CategoryBlogs from './pages/category-blogs';
import NotFound from './components/NotFound';
import './style.css';

const App = () => {
  const [blogs, setBlogs] = useState<ContentItem[]>([]);
  const [projects, setProjects] = useState<ContentItem[]>([]);
  const [path, setPath] = useState(window.location.hash);

  useEffect(() => {
    getContent('blogs').then(setBlogs);
    getContent('projects').then(setProjects);

    const handleHash = () => {
      setPath(window.location.hash);
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  if (path.startsWith('#/essay/')) {
    const slug = path.replace('#/essay/', '');
    const essay = blogs.find(e => e.slug === slug);
    if (!essay) return <NotFound />;
    const { prev, next } = getPrevNext(blogs, essay);
    return <Post essay={essay} prev={prev} next={next} />;
  }

  if (path === '#/blogs' || path.startsWith('#/blogs/')) {
    const rest = path.replace('#/blogs', '').replace(/^\//, '');
    if (rest === '') {
      return <AllBlogs blogs={blogs} />;
    }
    const category = decodeURIComponent(rest);
    const categoryBlogs = blogs.filter(b => b.category === category);
    return <CategoryBlogs category={category} blogs={categoryBlogs} />;
  }

  return <Landing blogs={blogs} projects={projects} />;
};

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);