const fs = require("fs");
const { execSync } = require("child_process");
const path = require("path");

const outDir = path.join(process.cwd(), "out");
const gitDir = path.join(outDir, ".git");
const tempDir = path.join(process.cwd(), ".git_temp");



// 1. Check if .git exists in out/ or is already preserved in tempDir
let shouldRestoreGit = fs.existsSync(tempDir);
if (fs.existsSync(gitDir)) {
  console.log("--- Preserving .git directory from out/ ---");
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true, maxRetries: 10, retryDelay: 100 });
  }
  fs.renameSync(gitDir, tempDir);
  shouldRestoreGit = true;
}

// 1.5 Pre-clean 'out' directory to avoid Next.js EBUSY errors (Windows)
if (fs.existsSync(outDir)) {
  console.log("--- Cleaning existing out/ directory ---");
  try {
    fs.rmSync(outDir, { recursive: true, force: true, maxRetries: 10, retryDelay: 100 });
  } catch (e) {
    console.warn("--- Warning: Could not fully remove out/ due to EBUSY. Attempting to rename it. ---");
    const trashDir = path.join(process.cwd(), `.out_trash_${Date.now()}`);
    fs.renameSync(outDir, trashDir);
  }
}

try {
  // 2. Run the actual build
  console.log("--- Running next build ---");
  execSync("next build", { stdio: "inherit" });
} catch (error) {
  console.error("--- Build failed ---");
  console.error(error);
  process.exit(1);
} finally {
  // 4. Move .git back
  if (shouldRestoreGit && fs.existsSync(tempDir)) {
    console.log("--- Restoring .git directory to out/ ---");
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }
    // If out/.git already exists for some reason, remove it first
    if (fs.existsSync(gitDir)) {
      fs.rmSync(gitDir, { recursive: true, force: true, maxRetries: 10, retryDelay: 100 });
    }
    fs.renameSync(tempDir, gitDir);
  }
}
