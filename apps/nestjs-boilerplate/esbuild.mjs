import fs from 'fs';
import path from 'path';
import { build } from 'esbuild';
import { fileURLToPath } from 'url';
import { copy } from 'esbuild-plugin-copy';
import { esbuildDecorators } from '@anatine/esbuild-decorators';

// __dirname
const currentUrl = new URL(import.meta.url);
const normalizedUrl = fileURLToPath(currentUrl);
const __dirname = path.dirname(normalizedUrl);

// Main settings
const buildFolderName = 'dist';
const tsConfigName = 'tsconfig.build.json';
const projectFolderName = 'nestjs-boilerplate';
const rootFolder = path.resolve(__dirname, '../../');

// Directories
const appsDir = path.resolve(rootFolder, 'apps');
const libsDir = path.resolve(rootFolder, 'libs');
const toolsDir = path.resolve(rootFolder, 'tools');
const projectDir = path.join(appsDir, projectFolderName);
const buildDir = path.join(projectDir, buildFolderName);
const modulesDir = path.join(projectDir, 'modules');
const sharedDir = path.join(projectDir, 'shared');

// Input Files/Folders
const rootFolders = [
  projectDir + '/*.ts',
  libsDir + '/**/*.ts',
  toolsDir + '/**/*.ts',
  sharedDir + '/**/*.ts',
  modulesDir + '/**/*.ts',
];

async function esbuildTranspiler() {
  const tsconfig = projectDir + '/' + tsConfigName;
  const buildFilePath = buildDir;

  console.time('build');

  const result = await build({
    platform: 'node',
    target: 'node20',
    sourcemap: false,
    logLevel: 'error',
    plugins: [
      esbuildDecorators({
        tsconfig,
        cwd: rootFolder,
      }),
      copy({
        resolveFrom: buildFilePath,
        assets: {
          from: ['../../.env'],
          to: ['.'],
        },
        watch: true,
      }),
    ],
    entryPoints: [...rootFolders],
    outdir: buildFilePath,
    format: 'cjs',
    bundle: false,
    tsconfig,
    allowOverwrite: true,
    metafile: true, // Generate a metafile
  });
  // external: Object.keys(dependencies).concat(Object.keys(peerDependencies)),

  // Replace import paths in the output files with the correct build js paths
  const filteredOutputPathes = Object.keys(result.metafile.outputs).filter(x => !x.includes('node_modules'));

  for (const filePath of filteredOutputPathes) {
    const sourceCode = await fs.promises.readFile(filePath, 'utf-8');
    const updatedSourceCode = sourceCode
      .replace(/\"shared\//g, `"${buildDir}/apps/${projectFolderName}/shared/`)
      .replace(/\"modules\//g, `"${buildDir}/apps/${projectFolderName}/modules/`)
      .replace(/\"@libs\//g, `"${buildDir}/libs/`)
      .replace(/\"@tools\//g, `"${buildDir}/tools/`)
      .replace(/\"@packages\//g, `"${buildDir}/packages/`);

    await fs.promises.writeFile(filePath, updatedSourceCode, 'utf-8');
  }

  console.timeEnd('build');
}

esbuildTranspiler();
