import { navMain } from './modules/nav-main';
import { textAreaCharacterCount, onChange } from './modules/contact-form-12-col';

console.log('hello world');
navMain()
textAreaCharacterCount()

window.onChange = onChange;
// From the Hugo template.
import * as params from '@params';