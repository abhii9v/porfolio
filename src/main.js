import fs from 'fs';
import path from 'path';

export default async ({ req, res, log, error }) => {
  try {
    let reqPath = req.path || '/';
    if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
    
    // Check direct path inside out folder
    let filePath = path.join(process.cwd(), 'out', reqPath);

    if (!fs.existsSync(filePath) && !path.extname(reqPath)) {
      filePath = path.join(process.cwd(), 'out', `${reqPath}.html`);
    }

    if (!fs.existsSync(filePath)) {
      filePath = path.join(process.cwd(), 'out', 'index.html');
    }

    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath);
      const ext = path.extname(filePath).toLowerCase();

      const mimeTypes = {
        '.html': 'text/html; charset=utf-8',
        '.js': 'text/javascript; charset=utf-8',
        '.css': 'text/css; charset=utf-8',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.svg': 'image/svg+xml',
        '.pdf': 'application/pdf',
        '.json': 'application/json',
        '.ico': 'image/x-icon',
        '.txt': 'text/plain; charset=utf-8'
      };

      return res.send(content, 200, {
        'content-type': mimeTypes[ext] || 'application/octet-stream',
        'cache-control': 'public, max-age=3600'
      });
    }

    return res.text('Page not found', 404);
  } catch (err) {
    if (error) error('Server error: ' + err.message);
    return res.text('Internal Server Error: ' + err.message, 500);
  }
};
