import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

// Prism
import Prism from 'prismjs';
// highlight code
import 'prismjs/components/prism-json';
import { boot } from 'quasar/wrappers';

VMdEditor.use(vuepressTheme, {
  Prism,
});

export default boot(({ app }) => {
  // something to do
  app.use(VMdEditor);
});
