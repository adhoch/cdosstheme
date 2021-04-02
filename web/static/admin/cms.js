// This global flag enables manual initialization.
window.CMS_MANUAL_INIT = true
// Usage with import from npm package
// import CMS, { init } from 'netlify-cms'
// Usage with script tag
const { CMS, initCMS: init } = window
/**
 * Initialize without passing in config - equivalent to just importing
 * Netlify CMS the old way.
 */
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
   "backend": {
      "name": "proxy",
      "proxy_url": "http://localhost:8081/api/v1",
      "local_backend": {
         "url": "http://localhost:8081/api/v1"
      }
   },
   "media_folder": "static/img",
   "public_folder": "/img",
   "collections": [
      {
         "name": "case_studies",
         "label": "Case Studies",
         "folder": "content/case_studies",
         "create": true,
         "extension": ".md",
         "format": "frontmatter",
         "slug": "{{title}}",
         "editor": {
            "preview": false
         },
         "fields": [
            {
               "label": "Site Name",
               "name": "title",
               "widget": "string"
            },
            {
               "label": "Short Description",
               "name": "short_description",
               "widget": "string"
            },
            {
               "label": "Color",
               "name": "color",
               "widget": "color",

            },
            {
               "label": "Featured Image",
               "name": "featured_image",
               "widget": "image"
            },
            {
               "label": "Card Image",
               "name": "card_image",
               "widget": "image"
            },
            {
               "name": "body",
               "widget": "list",
               "types": [
                  {
                     "name": "two_column",
                     "label": "Two Columns",
                     "widget": "object",
                     "fields": [
                        {
                           "label": "First Column",
                           "name": "first_column",
                           "widget": "markdown"
                        },
                        {
                           "label": "Second Column",
                           "name": "second_column",
                           "widget": "markdown"
                        }
                     ]
                  },
                  {
                     "name": "full_width_image",
                     "label": "Full Width Image",
                     "widget": "object",
                     "fields": [
                        {
                           "label": "Image",
                           "name": "full_width_image",
                           "widget": "image"
                        },
                        {
                           "label": "Quote",
                           "name": "image_quote",
                           "widget": "object",
                           "fields": [
                              {
                                 "label": "Quote",
                                 "name": "quote",
                                 "widget": "string",
                                 "default": "Everything is awesome!"
                              },
                              {
                                 "label": "Attribution",
                                 "name": "attribution",
                                 "widget": "string",
                                 "default": "So says I!"
                              }
                           ]
                        }
                     ]
                  },
                  {
                     "name": "multiple_images_object",
                     "label": "Two or Three Image Row",
                     "widget": "object",
                     "field": {
                        "name": "multiple_images_list",
                        "label": "Multiple Images",
                        "widget": "list",
                        "min": 2,
                        "max": 3,
                        "field": {
                           "label": "Image",
                           "name": "images_mult",
                           "widget": "image"
                        }
                     }
                  }
               ]
            }
         ]
      }
   ]
}
})
const CategoriesControl = createClass({
  handleChange: function(e) {
    const separator = this.props.field.get('separator', ', ')
    this.props.onChange(e.target.value.split(separator).map((e) => e.trim()));
  },

  render: function() {
    const separator = this.props.field.get('separator', ', ');
    var value = this.props.value;
    return h('input', {
      id: this.props.forID,
      className: this.props.classNameWrapper,
      type: 'text',
      value: value ? value.join(separator) : '',
      onChange: this.handleChange,
    });
  },
});

var CategoriesPreview = createClass({
  render: function() {
    return h('ul', {},
      this.props.value.map(function(val, index) {
        return h('li', {key: index}, val);
      })
    );
  }
});

var schema = {
  properties: {
    separator: { type: 'string' },
  },
}

CMS.registerWidget('categories', CategoriesControl, CategoriesPreview, schema);

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
