import esbuild from 'esbuild';
import fs from 'fs';

export const buildProject = (entryPoint, outFilePath) => {
  esbuild.build({
    entryPoints: {
      server: entryPoint
    },
    bundle: true,
    minify: true,
    splitting: true,
    format: 'esm',
    outdir: 'target',
    platform: 'node',
    chunkNames: 'chunks/[name]-[hash]',
    entryNames: '[dir]/[name]',
    logLevel: 'debug'
  }).then(() => {
    console.log("Cleaning up...");
    fs.unlinkSync(outFilePath);
    console.log("Done!");
  }).catch(() => process.exit(1));
};

