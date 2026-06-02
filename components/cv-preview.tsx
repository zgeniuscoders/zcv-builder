'use client';

import { forwardRef } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import type { CVData } from '@/lib/cv-types';
import { getSocialIcon } from '@/lib/social-icons';

interface CVPreviewProps {
  data: CVData;
}

export const CVPreview = forwardRef<HTMLDivElement, CVPreviewProps>(
  function CVPreview({ data }, ref) {
    const primaryColor = data.primaryColor;

    return (
      <div 
        ref={ref} 
        className="bg-white text-gray-900 min-h-[297mm] w-[210mm] mx-auto shadow-lg"
        style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
      >
        {/* Header */}
        <header className="p-8 pb-6" style={{ borderBottom: `3px solid ${primaryColor}` }}>
          <div className="flex items-start gap-6">
            {/* Photo */}
            {data.showPhoto && data.photo && (
              <div 
                className={`shrink-0 overflow-hidden border-2 ${
                  data.photoShape === 'round' ? 'rounded-full' : 'rounded-lg'
                }`}
                style={{ borderColor: primaryColor }}
              >
                <img
                  src={data.photo}
                  alt={data.fullName}
                  className="h-24 w-24 object-cover"
                  crossOrigin="anonymous"
                />
              </div>
            )}
            
            {/* Name & Title */}
            <div className="flex-1">
              <h1 
                className="text-3xl font-bold tracking-tight"
                style={{ color: primaryColor }}
              >
                {data.fullName || 'Votre Nom'}
              </h1>
              <p className="text-lg text-gray-600 mt-1">
                {data.title || 'Votre Titre Professionnel'}
              </p>
              
              {/* Contact Info */}
              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-600">
                {data.email && (
                  <a href={`mailto:${data.email}`} className="flex items-center gap-1.5 hover:text-gray-900">
                    <Mail className="h-4 w-4" style={{ color: primaryColor }} />
                    {data.email}
                  </a>
                )}
                {data.phone && (
                  <a href={`tel:${data.phone}`} className="flex items-center gap-1.5 hover:text-gray-900">
                    <Phone className="h-4 w-4" style={{ color: primaryColor }} />
                    {data.phone}
                  </a>
                )}
                {data.location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" style={{ color: primaryColor }} />
                    {data.location}
                  </span>
                )}
              </div>
              
              {/* Social Links */}
              {data.socialLinks.length > 0 && (
                <div className="flex flex-wrap items-center gap-3 mt-3">
                  {data.socialLinks.map((link) => {
                    const Icon = getSocialIcon(link.platform);
                    return (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900"
                      >
                        <Icon className="h-4 w-4" style={{ color: primaryColor }} />
                        <span className="truncate max-w-[180px]">
                          {link.url.replace(/^https?:\/\/(www\.)?/, '')}
                        </span>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          
          {/* Summary */}
          {data.summary && (
            <p className="mt-4 text-sm text-gray-600 leading-relaxed">
              {data.summary}
            </p>
          )}
        </header>

        <div className="p-8 pt-6 space-y-6">
          {/* Skills */}
          {data.skillCategories.length > 0 && (
            <section>
              <h2 
                className="text-lg font-semibold mb-3 pb-1 border-b-2"
                style={{ color: primaryColor, borderColor: primaryColor }}
              >
                Compétences
              </h2>
              <div className="space-y-3">
                {data.skillCategories.map((category) => (
                  <div key={category.id}>
                    <h3 className="text-sm font-medium text-gray-700 mb-1.5">
                      {category.name}
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {category.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 text-xs font-medium rounded-md"
                          style={{ 
                            backgroundColor: `${primaryColor}15`,
                            color: primaryColor
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Experience */}
          {data.experiences.length > 0 && (
            <section>
              <h2 
                className="text-lg font-semibold mb-3 pb-1 border-b-2"
                style={{ color: primaryColor, borderColor: primaryColor }}
              >
                Expériences Professionnelles
              </h2>
              <div className="space-y-4">
                {data.experiences.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                        <p className="text-sm text-gray-600">{exp.company}</p>
                      </div>
                      <span 
                        className="text-xs font-medium px-2 py-1 rounded shrink-0"
                        style={{ 
                          backgroundColor: `${primaryColor}15`,
                          color: primaryColor
                        }}
                      >
                        {exp.startDate} – {exp.endDate}
                      </span>
                    </div>
                    {exp.description && (
                      <p className="text-sm text-gray-600 mt-1.5">{exp.description}</p>
                    )}
                    {exp.missions.length > 0 && (
                      <ul className="mt-2 space-y-1">
                        {exp.missions.map((mission, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                            <span 
                              className="mt-2 h-1.5 w-1.5 rounded-full shrink-0"
                              style={{ backgroundColor: primaryColor }}
                            />
                            {mission}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {data.projects.length > 0 && (
            <section>
              <h2 
                className="text-lg font-semibold mb-3 pb-1 border-b-2"
                style={{ color: primaryColor, borderColor: primaryColor }}
              >
                Projets Personnels
              </h2>
              <div className="space-y-4">
                {data.projects.map((proj) => (
                  <div key={proj.id}>
                    <h3 className="font-semibold text-gray-900">{proj.name}</h3>
                    {proj.description && (
                      <p className="text-sm text-gray-600 mt-1">{proj.description}</p>
                    )}
                    {proj.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {proj.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 text-xs rounded border"
                            style={{ 
                              borderColor: primaryColor,
                              color: primaryColor
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <section>
              <h2 
                className="text-lg font-semibold mb-3 pb-1 border-b-2"
                style={{ color: primaryColor, borderColor: primaryColor }}
              >
                Formation
              </h2>
              <div className="space-y-3">
                {data.education.map((edu) => (
                  <div key={edu.id} className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                      <p className="text-sm text-gray-600">{edu.institution}</p>
                    </div>
                    <span 
                      className="text-xs font-medium px-2 py-1 rounded shrink-0"
                      style={{ 
                        backgroundColor: `${primaryColor}15`,
                        color: primaryColor
                      }}
                    >
                      {edu.startYear} – {edu.endYear}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {data.languages.length > 0 && (
            <section>
              <h2 
                className="text-lg font-semibold mb-3 pb-1 border-b-2"
                style={{ color: primaryColor, borderColor: primaryColor }}
              >
                Langues
              </h2>
              <div className="flex flex-wrap gap-4">
                {data.languages.map((lang) => (
                  <div key={lang.id} className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{lang.name}</span>
                    <span className="text-sm text-gray-500">({lang.level})</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* References */}
          {data.references.length > 0 && (
            <section>
              <h2 
                className="text-lg font-semibold mb-3 pb-1 border-b-2"
                style={{ color: primaryColor, borderColor: primaryColor }}
              >
                Références
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {data.references.map((ref) => (
                  <div key={ref.id}>
                    <h3 className="font-semibold text-gray-900">{ref.name}</h3>
                    {ref.position && (
                      <p className="text-sm text-gray-600">{ref.position}</p>
                    )}
                    <p className="text-sm text-gray-500">{ref.company}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    );
  }
);
