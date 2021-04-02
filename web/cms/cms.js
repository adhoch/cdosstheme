// This global flag enables manual initialization.
window.CMS_MANUAL_INIT = true
// Usage with import from npm package
import CMS, { init } from 'netlify-cms'
// Usage with script tag
const { CMS, initCMS: init } = window
/**
 * Initialize without passing in config - equivalent to just importing
 * Netlify CMS the old way.
 */
init()
/**
 * Optionally pass in a config object. This object will be merged into
 * `config.yml` if it exists, and any portion that conflicts with
 * `config.yml` will be overwritten. Arrays will be replaced during merge,
 * not concatenated.
 *
 * For example, the code below contains an incomplete config, but using it,
 * your `config.yml` can be missing its backend property, allowing you
 * to set this property at runtime.
 */
init({
  config: {
    backend: {
      name: 'git-gateway',
    },
  },
})
/**
 * Optionally pass in a complete config object and set a flag
 *  (`load_config_file: false`) to ignore the `config.yml`.
 *
 * For example, the code below contains a complete config. The
 * `config.yml` will be ignored when setting `load_config_file` to false.
 * It is not required if the `config.yml` file is missing to set
 * `load_config_file`, but will improve performance and avoid a load error.
 */
init({
  config: {
    backend: {
      name: 'git-gateway',
    },
    load_config_file: false,
    media_folder: "static/images/uploads",
    public_folder: "/images/uploads",
    collections: [
      { label: "Blog", name: "blog", folder: "_posts/blog", create: true, fields: [
        { label: "Title", name: "title", widget: "string" },
        { label: "Publish Date", name: "date", widget: "datetime" },
        { label: "Featured Image", name: "thumbnail", widget: "image" },
        { label: "Body", name: "body", widget: "markdown" },
      ]},
    ],
  },
})
// The registry works as expected, and can be used before or after init.
CMS.registerEditorComponent({
  // Internal id of the component
  id: "highlightBlurb",
  // Visible label
  label: "Highlight Blurb",
  // Fields the user need to fill out when adding an instance of the component
  fields: [
    {name: 'label', label: 'Label', widget: 'string'},
    {name: 'blurb', label: 'Blurb', widget: 'string'}
    ],
  // Pattern to identify a block as being an instance of this component
  pattern: /^highlightBlurb (\S+)$/,
  // Function to extract data elements from the regexp match
  fromBlock: function(match) {
    return {
      id: match[1]
    };
  },
  // Function to create a text block from an instance of this component
  toBlock: function(obj) {
    return 'highlightBlurb ' + obj.label;
  },
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: function(obj) {
    return (
      `<div><span class="h4">${obj.label}</span><p>${obj.blurb}</p>`
    );
  }
});
CMS.registerEditorComponent({
  // Internal id of the component
  id: "pullQuote",
  // Visible label
  label: "Pull Quote",
  // Fields the user need to fill out when adding an instance of the component
  fields: [
    {name: 'quote', label: 'Quote', widget: 'string'},
    {name: 'attribution', label: 'Attribution', widget: 'string'}
    ],
  // Pattern to identify a block as being an instance of this component
  pattern: /^pullQuote (\S+)$/,
  // Function to extract data elements from the regexp match
  fromBlock: function(match) {
    return {
      id: match[1]
    };
  },
  // Function to create a text block from an instance of this component
  toBlock: function(obj) {
    return 'pullQuote ' + obj.quote;
  },
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: function(obj) {
    return (
      `<div><span class="h4">${obj.quote}</span><p>${obj.attribution}</p>`
    );
  }
});
