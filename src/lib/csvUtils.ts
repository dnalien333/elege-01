// CSV utility functions for import/export

export const exportToCSV = (data: any[], filename: string, headers: string[]) => {
  const csvRows = [];
  
  // Add headers
  csvRows.push(headers.join(','));
  
  // Add data rows
  for (const row of data) {
    const values = headers.map(header => {
      const key = header.toLowerCase().replace(/ /g, '_');
      let value = row[key];
      
      // Handle arrays (tags)
      if (Array.isArray(value)) {
        value = value.join(';');
      }
      
      // Handle null/undefined
      if (value === null || value === undefined) {
        value = '';
      }
      
      // Escape quotes and wrap in quotes if needed
      const escaped = String(value).replace(/"/g, '""');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(','));
  }
  
  // Create blob and download
  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const parseCSV = (csvText: string): any[] => {
  const lines = csvText.split('\n').filter(line => line.trim());
  if (lines.length === 0) return [];
  
  const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
  const rows: any[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];
    const row: any = {};
    
    headers.forEach((header, index) => {
      const key = header.toLowerCase().replace(/ /g, '_');
      let value = values[index] ? values[index].replace(/^"|"$/g, '').replace(/""/g, '"').trim() : '';
      
      // Convert semicolon-separated values to arrays (for tags)
      if (key === 'tags' && value) {
        row[key] = value.split(';').map(t => t.trim()).filter(t => t);
      } else {
        row[key] = value || null;
      }
    });
    
    if (Object.keys(row).length > 0) {
      rows.push(row);
    }
  }
  
  return rows;
};

export const readFileAsText = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = (e) => reject(e);
    reader.readAsText(file);
  });
};