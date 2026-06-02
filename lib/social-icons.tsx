import { 
  Github, 
  Linkedin, 
  Youtube, 
  Twitter, 
  Globe, 
  Dribbble,
  PenTool,
  BookOpen,
  Code2,
  type LucideIcon 
} from 'lucide-react';
import type { SocialPlatform } from './cv-types';

// GitLab SVG Icon Component
function GitLabIcon({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className}
      aria-hidden="true"
    >
      <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z"/>
    </svg>
  );
}

export const socialPlatforms: { value: SocialPlatform; label: string }[] = [
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'github', label: 'GitHub' },
  { value: 'gitlab', label: 'GitLab' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'twitter', label: 'Twitter / X' },
  { value: 'portfolio', label: 'Portfolio' },
  { value: 'dribbble', label: 'Dribbble' },
  { value: 'behance', label: 'Behance' },
  { value: 'medium', label: 'Medium' },
  { value: 'stackoverflow', label: 'Stack Overflow' },
];

export function getSocialIcon(platform: SocialPlatform): LucideIcon | typeof GitLabIcon {
  const icons: Record<SocialPlatform, LucideIcon | typeof GitLabIcon> = {
    linkedin: Linkedin,
    github: Github,
    gitlab: GitLabIcon,
    youtube: Youtube,
    twitter: Twitter,
    portfolio: Globe,
    dribbble: Dribbble,
    behance: PenTool,
    medium: BookOpen,
    stackoverflow: Code2,
  };
  return icons[platform];
}

export function getSocialLabel(platform: SocialPlatform): string {
  const labels: Record<SocialPlatform, string> = {
    linkedin: 'LinkedIn',
    github: 'GitHub',
    gitlab: 'GitLab',
    youtube: 'YouTube',
    twitter: 'Twitter',
    portfolio: 'Portfolio',
    dribbble: 'Dribbble',
    behance: 'Behance',
    medium: 'Medium',
    stackoverflow: 'Stack Overflow',
  };
  return labels[platform];
}
