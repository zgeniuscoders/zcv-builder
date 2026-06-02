'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { 
  Plus, 
  Trash2, 
  GripVertical,
  User,
  Briefcase,
  GraduationCap,
  FolderKanban,
  Languages,
  Users,
  Link2,
  Palette,
  Image as ImageIcon,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import type { CVData, SocialLink, SkillCategory, Experience, Project, Education, Reference, Language, SocialPlatform } from '@/lib/cv-types';
import { socialPlatforms } from '@/lib/social-icons';

interface CVFormProps {
  data: CVData;
  onChange: (data: CVData) => void;
}

function CollapsibleSection({ 
  title, 
  icon: Icon, 
  children, 
  defaultOpen = true 
}: { 
  title: string; 
  icon: React.ComponentType<{ className?: string }>; 
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <Card>
      <CardHeader 
        className="cursor-pointer select-none py-3"
        onClick={() => setIsOpen(!isOpen)}
      >
        <CardTitle className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4 text-primary" />
            {title}
          </div>
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </CardTitle>
      </CardHeader>
      {isOpen && <CardContent className="pt-0">{children}</CardContent>}
    </Card>
  );
}

export function CVForm({ data, onChange }: CVFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateField = <K extends keyof CVData>(field: K, value: CVData[K]) => {
    onChange({ ...data, [field]: value });
  };

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateField('photo', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Social Links
  const addSocialLink = () => {
    const newLink: SocialLink = {
      id: Date.now().toString(),
      platform: 'linkedin',
      url: '',
    };
    updateField('socialLinks', [...data.socialLinks, newLink]);
  };

  const updateSocialLink = (id: string, field: keyof SocialLink, value: string) => {
    updateField(
      'socialLinks',
      data.socialLinks.map((link) =>
        link.id === id ? { ...link, [field]: value } : link
      )
    );
  };

  const removeSocialLink = (id: string) => {
    updateField(
      'socialLinks',
      data.socialLinks.filter((link) => link.id !== id)
    );
  };

  // Skills
  const addSkillCategory = () => {
    const newCategory: SkillCategory = {
      id: Date.now().toString(),
      name: 'Nouvelle Catégorie',
      skills: [],
    };
    updateField('skillCategories', [...data.skillCategories, newCategory]);
  };

  const updateSkillCategory = (id: string, field: keyof SkillCategory, value: string | string[]) => {
    updateField(
      'skillCategories',
      data.skillCategories.map((cat) =>
        cat.id === id ? { ...cat, [field]: value } : cat
      )
    );
  };

  const removeSkillCategory = (id: string) => {
    updateField(
      'skillCategories',
      data.skillCategories.filter((cat) => cat.id !== id)
    );
  };

  // Experiences
  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      title: '',
      company: '',
      startDate: '',
      endDate: '',
      description: '',
      missions: [],
    };
    updateField('experiences', [...data.experiences, newExp]);
  };

  const updateExperience = (id: string, field: keyof Experience, value: string | string[]) => {
    updateField(
      'experiences',
      data.experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  const removeExperience = (id: string) => {
    updateField(
      'experiences',
      data.experiences.filter((exp) => exp.id !== id)
    );
  };

  // Projects
  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
    };
    updateField('projects', [...data.projects, newProject]);
  };

  const updateProject = (id: string, field: keyof Project, value: string | string[]) => {
    updateField(
      'projects',
      data.projects.map((proj) =>
        proj.id === id ? { ...proj, [field]: value } : proj
      )
    );
  };

  const removeProject = (id: string) => {
    updateField(
      'projects',
      data.projects.filter((proj) => proj.id !== id)
    );
  };

  // Education
  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      degree: '',
      institution: '',
      startYear: '',
      endYear: '',
    };
    updateField('education', [...data.education, newEdu]);
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    updateField(
      'education',
      data.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    );
  };

  const removeEducation = (id: string) => {
    updateField(
      'education',
      data.education.filter((edu) => edu.id !== id)
    );
  };

  // References
  const addReference = () => {
    const newRef: Reference = {
      id: Date.now().toString(),
      name: '',
      position: '',
      company: '',
    };
    updateField('references', [...data.references, newRef]);
  };

  const updateReference = (id: string, field: keyof Reference, value: string) => {
    updateField(
      'references',
      data.references.map((ref) =>
        ref.id === id ? { ...ref, [field]: value } : ref
      )
    );
  };

  const removeReference = (id: string) => {
    updateField(
      'references',
      data.references.filter((ref) => ref.id !== id)
    );
  };

  // Languages
  const addLanguage = () => {
    const newLang: Language = {
      id: Date.now().toString(),
      name: '',
      level: '',
    };
    updateField('languages', [...data.languages, newLang]);
  };

  const updateLanguage = (id: string, field: keyof Language, value: string) => {
    updateField(
      'languages',
      data.languages.map((lang) =>
        lang.id === id ? { ...lang, [field]: value } : lang
      )
    );
  };

  const removeLanguage = (id: string) => {
    updateField(
      'languages',
      data.languages.filter((lang) => lang.id !== id)
    );
  };

  return (
    <div className="space-y-4 p-4 overflow-y-auto h-full">
      {/* Profile Section */}
      <CollapsibleSection title="Profil" icon={User}>
        <div className="space-y-3">
          <div>
            <Label htmlFor="fullName">Nom complet</Label>
            <Input
              id="fullName"
              value={data.fullName}
              onChange={(e) => updateField('fullName', e.target.value)}
              placeholder="Jean Dupont"
            />
          </div>
          <div>
            <Label htmlFor="title">Titre / Poste</Label>
            <Input
              id="title"
              value={data.title}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="Développeur Fullstack & Ingénieur IA"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="email@example.com"
              />
            </div>
            <div>
              <Label htmlFor="phone">Téléphone</Label>
              <Input
                id="phone"
                value={data.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                placeholder="+243..."
              />
            </div>
          </div>
          <div>
            <Label htmlFor="location">Localisation</Label>
            <Input
              id="location"
              value={data.location}
              onChange={(e) => updateField('location', e.target.value)}
              placeholder="Kinshasa, RDC"
            />
          </div>
          <div>
            <Label htmlFor="summary">Résumé (optionnel)</Label>
            <Textarea
              id="summary"
              value={data.summary}
              onChange={(e) => updateField('summary', e.target.value)}
              placeholder="Décrivez-vous en quelques lignes..."
              rows={3}
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* Photo Section */}
      <CollapsibleSection title="Photo de profil" icon={ImageIcon} defaultOpen={false}>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Afficher la photo</Label>
            <Switch
              checked={data.showPhoto}
              onCheckedChange={(checked) => updateField('showPhoto', checked)}
            />
          </div>
          {data.showPhoto && (
            <>
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full"
                >
                  <ImageIcon className="h-4 w-4 mr-2" />
                  {data.photo ? 'Changer la photo' : 'Ajouter une photo'}
                </Button>
                {data.photo && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => updateField('photo', null)}
                    className="w-full mt-2 text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Supprimer la photo
                  </Button>
                )}
              </div>
              <div>
                <Label>Forme de la photo</Label>
                <Select
                  value={data.photoShape}
                  onValueChange={(value: 'round' | 'square') => updateField('photoShape', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="round">Ronde</SelectItem>
                    <SelectItem value="square">Carrée</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </div>
      </CollapsibleSection>

      {/* Color Picker */}
      <CollapsibleSection title="Couleur principale" icon={Palette} defaultOpen={false}>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={data.primaryColor}
            onChange={(e) => updateField('primaryColor', e.target.value)}
            className="h-10 w-14 cursor-pointer rounded border border-border"
          />
          <Input
            value={data.primaryColor}
            onChange={(e) => updateField('primaryColor', e.target.value)}
            placeholder="#3b82f6"
            className="flex-1"
          />
        </div>
        <div className="flex gap-2 mt-3 flex-wrap">
          {['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'].map((color) => (
            <button
              key={color}
              onClick={() => updateField('primaryColor', color)}
              className="h-8 w-8 rounded-full border-2 transition-transform hover:scale-110"
              style={{ 
                backgroundColor: color,
                borderColor: data.primaryColor === color ? 'var(--foreground)' : 'transparent'
              }}
              aria-label={`Sélectionner la couleur ${color}`}
            />
          ))}
        </div>
      </CollapsibleSection>

      {/* Social Links */}
      <CollapsibleSection title="Liens professionnels" icon={Link2} defaultOpen={false}>
        <div className="space-y-3">
          {data.socialLinks.map((link) => (
            <div key={link.id} className="flex items-center gap-2 p-2 border rounded-lg bg-secondary/30">
              <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
              <Select
                value={link.platform}
                onValueChange={(value: SocialPlatform) => updateSocialLink(link.id, 'platform', value)}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {socialPlatforms.map((platform) => (
                    <SelectItem key={platform.value} value={platform.value}>
                      {platform.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                value={link.url}
                onChange={(e) => updateSocialLink(link.id, 'url', e.target.value)}
                placeholder="https://..."
                className="flex-1"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeSocialLink(link.id)}
                className="text-destructive shrink-0"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addSocialLink} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Ajouter un lien
          </Button>
        </div>
      </CollapsibleSection>

      {/* Skills */}
      <CollapsibleSection title="Compétences" icon={Briefcase}>
        <div className="space-y-3">
          {data.skillCategories.map((category) => (
            <div key={category.id} className="p-3 border rounded-lg bg-secondary/30">
              <div className="flex items-center gap-2 mb-2">
                <Input
                  value={category.name}
                  onChange={(e) => updateSkillCategory(category.id, 'name', e.target.value)}
                  placeholder="Nom de la catégorie"
                  className="flex-1 font-medium"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeSkillCategory(category.id)}
                  className="text-destructive shrink-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Input
                value={category.skills.join(', ')}
                onChange={(e) =>
                  updateSkillCategory(
                    category.id,
                    'skills',
                    e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                  )
                }
                placeholder="Python, Java, React... (séparés par des virgules)"
              />
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addSkillCategory} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Ajouter une catégorie
          </Button>
        </div>
      </CollapsibleSection>

      {/* Experience */}
      <CollapsibleSection title="Expériences" icon={Briefcase}>
        <div className="space-y-3">
          {data.experiences.map((exp) => (
            <div key={exp.id} className="p-3 border rounded-lg bg-secondary/30 space-y-2">
              <div className="flex items-start gap-2">
                <div className="flex-1 space-y-2">
                  <Input
                    value={exp.title}
                    onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                    placeholder="Titre du poste"
                    className="font-medium"
                  />
                  <Input
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                    placeholder="Entreprise"
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeExperience(exp.id)}
                  className="text-destructive shrink-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  value={exp.startDate}
                  onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                  placeholder="Date début"
                />
                <Input
                  value={exp.endDate}
                  onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                  placeholder="Date fin"
                />
              </div>
              <Textarea
                value={exp.description}
                onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                placeholder="Description du poste"
                rows={2}
              />
              <div>
                <Label className="text-xs text-muted-foreground">Missions (une par ligne)</Label>
                <Textarea
                  value={exp.missions.join('\n')}
                  onChange={(e) =>
                    updateExperience(
                      exp.id,
                      'missions',
                      e.target.value.split('\n').filter(Boolean)
                    )
                  }
                  placeholder="• Mission 1&#10;• Mission 2"
                  rows={3}
                />
              </div>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addExperience} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Ajouter une expérience
          </Button>
        </div>
      </CollapsibleSection>

      {/* Projects */}
      <CollapsibleSection title="Projets personnels" icon={FolderKanban} defaultOpen={false}>
        <div className="space-y-3">
          {data.projects.map((proj) => (
            <div key={proj.id} className="p-3 border rounded-lg bg-secondary/30 space-y-2">
              <div className="flex items-start gap-2">
                <Input
                  value={proj.name}
                  onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
                  placeholder="Nom du projet"
                  className="flex-1 font-medium"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeProject(proj.id)}
                  className="text-destructive shrink-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Textarea
                value={proj.description}
                onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                placeholder="Description du projet"
                rows={2}
              />
              <Input
                value={proj.technologies.join(', ')}
                onChange={(e) =>
                  updateProject(
                    proj.id,
                    'technologies',
                    e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                  )
                }
                placeholder="Technologies (séparées par des virgules)"
              />
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addProject} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Ajouter un projet
          </Button>
        </div>
      </CollapsibleSection>

      {/* Education */}
      <CollapsibleSection title="Formation" icon={GraduationCap} defaultOpen={false}>
        <div className="space-y-3">
          {data.education.map((edu) => (
            <div key={edu.id} className="p-3 border rounded-lg bg-secondary/30 space-y-2">
              <div className="flex items-start gap-2">
                <Input
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                  placeholder="Diplôme / Formation"
                  className="flex-1 font-medium"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeEducation(edu.id)}
                  className="text-destructive shrink-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Input
                value={edu.institution}
                onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                placeholder="Établissement"
              />
              <div className="grid grid-cols-2 gap-2">
                <Input
                  value={edu.startYear}
                  onChange={(e) => updateEducation(edu.id, 'startYear', e.target.value)}
                  placeholder="Année début"
                />
                <Input
                  value={edu.endYear}
                  onChange={(e) => updateEducation(edu.id, 'endYear', e.target.value)}
                  placeholder="Année fin"
                />
              </div>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addEducation} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Ajouter une formation
          </Button>
        </div>
      </CollapsibleSection>

      {/* Languages */}
      <CollapsibleSection title="Langues" icon={Languages} defaultOpen={false}>
        <div className="space-y-3">
          {data.languages.map((lang) => (
            <div key={lang.id} className="flex items-center gap-2">
              <Input
                value={lang.name}
                onChange={(e) => updateLanguage(lang.id, 'name', e.target.value)}
                placeholder="Langue"
                className="flex-1"
              />
              <Input
                value={lang.level}
                onChange={(e) => updateLanguage(lang.id, 'level', e.target.value)}
                placeholder="Niveau"
                className="flex-1"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeLanguage(lang.id)}
                className="text-destructive shrink-0"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addLanguage} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Ajouter une langue
          </Button>
        </div>
      </CollapsibleSection>

      {/* References */}
      <CollapsibleSection title="Références" icon={Users} defaultOpen={false}>
        <div className="space-y-3">
          {data.references.map((ref) => (
            <div key={ref.id} className="p-3 border rounded-lg bg-secondary/30 space-y-2">
              <div className="flex items-start gap-2">
                <Input
                  value={ref.name}
                  onChange={(e) => updateReference(ref.id, 'name', e.target.value)}
                  placeholder="Nom"
                  className="flex-1 font-medium"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeReference(ref.id)}
                  className="text-destructive shrink-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Input
                value={ref.position}
                onChange={(e) => updateReference(ref.id, 'position', e.target.value)}
                placeholder="Poste (optionnel)"
              />
              <Input
                value={ref.company}
                onChange={(e) => updateReference(ref.id, 'company', e.target.value)}
                placeholder="Entreprise"
              />
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addReference} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Ajouter une référence
          </Button>
        </div>
      </CollapsibleSection>
    </div>
  );
}
