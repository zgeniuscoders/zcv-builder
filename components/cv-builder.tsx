'use client';

import { useState, useRef, useCallback } from 'react';
import { Download, FileText, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CVForm } from '@/components/cv-form';
import { CVPreview } from '@/components/cv-preview';
import { defaultCVData } from '@/lib/cv-types';
import type { CVData } from '@/lib/cv-types';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export function CVBuilder() {
  const [cvData, setCVData] = useState<CVData>(defaultCVData);
  const [isExporting, setIsExporting] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleExportPDF = useCallback(async () => {
    if (!previewRef.current) return;

    setIsExporting(true);
    try {
      const element = previewRef.current;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: element.scrollWidth,
        height: element.scrollHeight,
      });

      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const scaledWidth = imgWidth * ratio;
      const scaledHeight = imgHeight * ratio;

      const x = (pdfWidth - scaledWidth) / 2;
      const y = 0;
      
      pdf.addImage(imgData, 'PNG', x, y, scaledWidth, scaledHeight);

      const fileName = cvData.fullName
        ? `CV_${cvData.fullName.replace(/\s+/g, '_')}.pdf`
        : 'CV.pdf';
      pdf.save(fileName);
    } catch (error) {
      console.error('PDF export failed:', error);
    } finally {
      setIsExporting(false);
    }
  }, [cvData.fullName]);

  return (
    <div className="h-screen flex flex-col bg-background">

      <header className="h-14 border-b bg-card flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          <h1 className="text-lg font-semibold">Z CV Builder</h1>
        </div>
        <Button 
          onClick={handleExportPDF} 
          disabled={isExporting}
          className="gap-2"
        >
          {isExporting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Export en cours...
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              Télécharger PDF
            </>
          )}
        </Button>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <aside className="w-[420px] border-r bg-card overflow-hidden flex flex-col shrink-0">
          <div className="p-4 border-b bg-secondary/30">
            <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
              Éditeur de CV
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            <CVForm data={cvData} onChange={setCVData} />
          </div>
        </aside>

        <main className="flex-1 overflow-auto bg-muted/30 p-6">
          <div className="flex justify-center">
            <div className="transform origin-top scale-[0.75] lg:scale-[0.85] xl:scale-100">
              <CVPreview ref={previewRef} data={cvData} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
