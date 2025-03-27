import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export function parseGeneratedFiles(content: string): Record<string, string> {
  const fileMap: Record<string, string> = {};
  const regex = /=== (.*?) ===\n([\s\S]*?)(?=(?:=== |$))/g;
  let match;

  while ((match = regex.exec(content)) !== null) {
    const [, fileName, fileContent] = match;
    fileMap[fileName.trim()] = fileContent.trim();
  }

  return fileMap;
}

export async function downloadZip(files: Record<string, string>, name = 'project.zip') {
  const zip = new JSZip();
  for (const fileName in files) {
    zip.file(fileName, files[fileName]);
  }

  const blob = await zip.generateAsync({ type: 'blob' });
  saveAs(blob, name);
}
