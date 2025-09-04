import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ESモジュールでの__dirname相当
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// パッケージ情報を取得
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8'));

// ディレクトリが存在し、空でないかチェック
function verifyDirectory(dirPath, name) {
  if (!fs.existsSync(dirPath)) {
    console.error(`${name} directory does not exist: ${dirPath}`);
    process.exit(1);
  }
  
  const files = fs.readdirSync(dirPath);
  if (files.length === 0) {
    console.error(`${name} directory is empty: ${dirPath}`);
    process.exit(1);
  }
  
  console.log(`✓ ${name} directory verified: ${files.length} files`);
}

// バージョンチェック
function verifyVersion() {
  try {
    const published = execSync(`npm view ${packageJson.name} version`, { encoding: 'utf8' }).trim();
    if (published === packageJson.version) {
      console.error(`Version ${packageJson.version} already published. Bump version.`);
      process.exit(1);
    }
    console.log(`✓ Version check passed: local=${packageJson.version}, published=${published}`);
  } catch (e) {
    console.log('✓ No published version found (new package)');
  }
}

// Gitタグチェック
function verifyTag() {
  try {
    execSync('git fetch --tags --quiet', { stdio: 'ignore' });
    execSync(`git rev-parse -q --verify refs/tags/v${packageJson.version}`, { stdio: 'ignore' });
    console.error(`Git tag v${packageJson.version} already exists.`);
    process.exit(1);
  } catch (e) {
    console.log(`✓ Git tag v${packageJson.version} does not exist`);
  }
}

// メイン処理
function main() {
  const command = process.argv[2];
  
  switch (command) {
    case 'dist':
      verifyDirectory('dist', 'dist');
      break;
    case 'docs-dist':
      verifyDirectory('docs/dist', 'docs/dist');
      break;
    case 'version':
      verifyVersion();
      break;
    case 'tag':
      verifyTag();
      break;
    default:
      console.error('Usage: node scripts/verify.js <command>');
      console.error('Commands: dist, docs-dist, version, tag');
      process.exit(1);
  }
}

main();
