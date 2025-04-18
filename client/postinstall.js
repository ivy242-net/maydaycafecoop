import fse from 'fs-extra';
import path from 'path';
const topDir = import.meta.dirname;
fse.emptyDirSync(path.join(topDir, '../server/pb_hooks/pages/assets', 'tinymce'));
fse.copySync(path.join(topDir, '../node_modules', 'tinymce'), path.join(topDir, '../server/pb_hooks/pages/assets', 'tinymce'), { overwrite: true });