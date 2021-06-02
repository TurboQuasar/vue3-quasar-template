import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import { boot } from 'quasar/wrappers';

VMdEditor.use(githubTheme);

export default boot(({ app }) => {
  // something to do
  app.use(VMdEditor);
});
