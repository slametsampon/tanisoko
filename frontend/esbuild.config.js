// frontend/esbuild.config.js

const esbuild = require('esbuild');
const path = require('path');
const fs = require('fs');
const mime = require('mime');
require('tsconfig-paths').register(); // 👈 Ini pentingconst esbuild = require('esbuild');

const isDev = process.env.NODE_ENV === 'development';
const isPreRelease = process.env.NODE_ENV === 'pre-release';
const isProd = process.env.NODE_ENV === 'production';

const pkg = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf8')
);

let publicPath = '/';
if (isPreRelease) publicPath = '/tanisoko';
if (isProd) publicPath = '';

const outputDir = path.resolve(__dirname, '../build/frontend');

const buildOptions = {
  absWorkingDir: path.resolve(__dirname),
  entryPoints: ['src/main.ts'],
  bundle: true,
  sourcemap: isDev || isPreRelease,
  minify: isProd,
  outdir: outputDir,
  target: ['es2020'],
  format: 'esm',
  tsconfig: path.resolve(__dirname, 'tsconfig.json'),
  define: {
    'process.env.NODE_ENV': JSON.stringify(
      process.env.NODE_ENV || 'development'
    ),
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
  loader: {
    '.ts': 'ts',
    '.css': 'css',
    '.png': 'file',
    '.jpg': 'file',
    '.svg': 'file',
    '.ico': 'file',
    '.webp': 'file',
  },
  publicPath,
  logLevel: 'info',
};

// Helpers
const ensureDirExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`📁 Created directory: ${dirPath}`);
  }
};

const copyFile = (src, dest) => {
  try {
    if (!fs.existsSync(src)) {
      throw new Error(`Source file ${src} not found.`);
    }
    fs.copyFileSync(src, dest);
    console.log(`📄 Copied ${src} → ${dest}`);
  } catch (error) {
    console.error(`❌ Failed to copy ${src}:`, error.message);
  }
};

const copyFolderRecursive = (src, dest) => {
  if (!fs.existsSync(src)) {
    console.warn(`⚠️ Warning: Source folder ${src} does not exist. Skipping.`);
    return;
  }

  ensureDirExists(dest);

  const files = fs.readdirSync(src);
  files.forEach((file) => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);

    if (fs.statSync(srcPath).isDirectory()) {
      copyFolderRecursive(srcPath, destPath);
    } else {
      copyFile(srcPath, destPath);
    }
  });
};

// Dev Server
function startDevServer(serveDir, port) {
  const http = require('http');

  const server = http.createServer((req, res) => {
    let reqPath = req.url.split('?')[0];
    let filePath = path.join(
      serveDir,
      reqPath === '/' ? '/index.html' : reqPath
    );

    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      filePath = path.join(serveDir, 'index.html');
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('500: Internal Server Error');
        return;
      }
      res.writeHead(200, {
        'Content-Type': mime.getType(filePath) || 'text/html',
      });
      res.end(data);
    });
  });

  server.listen(port, () => {
    console.log(`🌐 Dev server running at http://127.0.0.1:${port}`);
  });
}

// Build Logic
const startBuild = async () => {
  console.log(
    `🔧 Starting esbuild in ${process.env.NODE_ENV || 'development'} mode...`
  );

  try {
    const ctx = await esbuild.context(buildOptions);
    if (process.argv.includes('--watch') || isDev) {
      await ctx.watch();
      console.log('👀 Watching for changes...');
    } else {
      await ctx.rebuild();
      await ctx.dispose();
      console.log('✅ Build complete.');
    }
  } catch (err) {
    console.error('❌ Build failed:', err);
    process.exit(1);
  }
};

// Main Build Process
const main = async () => {
  ensureDirExists(outputDir);

  await startBuild();

  // ⬇️ Fix jalur di sini ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
  const indexSrc = fs.readFileSync('src/index.html', 'utf8'); // ✅ ini jalur benar

  const basePathFinal = publicPath.endsWith('/')
    ? publicPath
    : publicPath + '/';
  const indexHtmlFinal = indexSrc.replace('__BASE_PATH__', basePathFinal);

  fs.writeFileSync(path.join(outputDir, 'index.html'), indexHtmlFinal);

  if (isProd || isPreRelease) {
    fs.writeFileSync(path.join(outputDir, '404.html'), indexHtmlFinal);
    fs.writeFileSync(path.join(outputDir, '.nojekyll'), '');
    console.log('📝 Wrote 404.html for GitHub Pages SPA fallback.');
  }

  // Copy static assets
  copyFolderRecursive('src/assets', path.join(outputDir, 'assets'));

  if (isDev || process.argv.includes('--serve')) {
    startDevServer(outputDir, 51451);
  }
};

main();
