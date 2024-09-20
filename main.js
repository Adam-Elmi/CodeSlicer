import Prism from 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/+esm'
import 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-javascript.min.js'
import 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/plugins/line-numbers/prism-line-numbers.min.js'

// Initialize Prism
document.addEventListener('DOMContentLoaded', (event) => {
  require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.30.1/min/vs' } });

  require(['vs/editor/editor.main'], function () {
    // Define the custom theme for Monaco
    monaco.editor.defineTheme('custom-one-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '5C6370', fontStyle: 'italic' },
        { token: 'prolog', foreground: '5C6370' },
        { token: 'doctype', foreground: '5C6370' },
        { token: 'cdata', foreground: '5C6370' },
        { token: 'punctuation', foreground: 'ABB2BF' },
        { token: 'property', foreground: 'D19A66' },
        { token: 'tag', foreground: 'D19A66' },
        { token: 'boolean', foreground: 'D19A66' },
        { token: 'number', foreground: 'D19A66' },
        { token: 'constant', foreground: 'D19A66' },
        { token: 'symbol', foreground: 'D19A66' },
        { token: 'deleted', foreground: 'D19A66' },
        { token: 'selector', foreground: '98C379' },
        { token: 'attr-name', foreground: '98C379' },
        { token: 'string', foreground: '98C379' },
        { token: 'char', foreground: '98C379' },
        { token: 'builtin', foreground: '98C379' },
        { token: 'inserted', foreground: '98C379' },
        { token: 'operator', foreground: '56B6C2' },
        { token: 'entity', foreground: '56B6C2' },
        { token: 'url', foreground: '56B6C2' },
        { token: 'variable', foreground: 'E06C75' },
        { token: 'atrule', foreground: 'C678DD' },
        { token: 'attr-value', foreground: 'C678DD' },
        { token: 'keyword', foreground: 'C678DD' },
        { token: 'function', foreground: '61AFEF' },
        { token: 'class-name', foreground: '61AFEF' },
        { token: 'regex', foreground: 'C678DD' },
        { token: 'important', foreground: 'C678DD', fontStyle: 'bold' },
        { token: 'italic', fontStyle: 'italic' },
      ],
      colors: {
        'editor.background': '#282C34',
        'editor.foreground': '#ABB2BF',
        'editorLineNumber.foreground': '#636D83',
        'editor.selectionBackground': '#3E4451',
        'editor.lineHighlightBackground': '#2C313A',
        'editorCursor.foreground': '#528BFF',
        'editorWhitespace.foreground': '#747369',
        'editor.selectionHighlightBackground': '#9AA2B1',
      }
    });

    const editorContainer = document.getElementById('monaco-editor');

    var editor = monaco.editor.create(editorContainer, {
      value: [
        '// Your code here',
        'function example() {',
        '    console.log("Hello, CodeSlicer!");',
        '}',
        '',
        '// start slice',
        'function sliceExample1() {',
        '    console.log("This is the first sliced function");',
        '}',
        '// end slice',
        '',
        '// Some code between slices',
        '',
        '// start slice',
        'function sliceExample2() {',
        '    console.log("This is the second sliced function");',
        '}',
        '// end slice',
        '',
        '// Add more code and slices as needed'
      ].join('\n'),
      language: 'javascript',
      theme: 'custom-one-dark', // Use the custom theme
      fontFamily: "'Fira Code', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
      fontSize: 14,
      lineNumbers: 'on',
      roundedSelection: false,
      scrollBeyondLastLine: true,
      readOnly: false,
      minimap: {
        enabled: false
      },
      renderLineHighlight: 'all',
    });

    // Make editor globally accessible
    window.monacoEditor = editor;

    function updateEditorHeight() {
      const contentHeight = 200;
      editorContainer.style.height = `${contentHeight}px`;
      editor.layout();
    }

    editor.onDidChangeModelContent(updateEditorHeight);
    updateEditorHeight();

    // Adjust editor size on window resize
    window.addEventListener('resize', function () {
      updateEditorHeight();
    });

    // Function to get the current editor content
    window.getEditorContent = function() {
      return editor.getValue();
    };

    // Move the prepare slices button listener here
    const prepareSlicesBtn = document.getElementById('prepare-slices-btn');
    prepareSlicesBtn.addEventListener('click', () => {
      const code = window.getEditorContent();
      const slices = prepareSlices(code);
      displaySlices(slices);
    });

    const languageSelector = document.getElementById('language-selector');
    const customLanguageInput = document.getElementById('custom-language');

    languageSelector.addEventListener('change', function() {
        if (this.value === 'custom') {
            customLanguageInput.style.display = 'inline-block';
            customLanguageInput.focus();
        } else {
            customLanguageInput.style.display = 'none';
            setEditorLanguage(this.value);
        }
    });

    customLanguageInput.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            setEditorLanguage(this.value.trim());
        }
    });

    function setEditorLanguage(language) {
        if (window.monacoEditor) {
            // Convert language to lowercase
            const lowerCaseLanguage = language.toLowerCase();
            monaco.editor.setModelLanguage(window.monacoEditor.getModel(), lowerCaseLanguage);
            console.log('Language set to:', lowerCaseLanguage);
        } else {
            console.error('Monaco editor not initialized');
        }
    }

    const slicesContainer = document.getElementById('slices-container');

    const dropzoneFile = document.getElementById('dropzone-file');
    dropzoneFile.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (window.monacoEditor) {
                    window.monacoEditor.setValue(e.target.result);
                } else {
                    console.error('Monaco editor not initialized');
                }
            };
            reader.readAsText(file);
        }
    });

   
    function detectLanguage(code) {
        // Updated language detection
        if (code.includes('<?php')) return 'php';
        if (code.includes('import ') || code.includes('def ')) return 'python';
        if (code.includes('function ') || code.includes('var ') || code.includes('let ') || code.includes('const ')) return 'javascript';
        if (code.includes('<html>') || code.includes('<!DOCTYPE html>') || code.match(/<\w+>/)) return 'html';
        if (code.includes('class ') || code.includes('public static void main')) return 'java';
        return 'clike'; // Default to C-like syntax
    }

    function getCommentPattern(language) {
        const patterns = {
            'javascript': { start: '//', end: '', multiStart: '/\\*', multiEnd: '\\*/' },
            'python': { start: '#', end: '', multiStart: '"""', multiEnd: '"""' },
            'php': { start: '//', end: '', multiStart: '/\\*', multiEnd: '\\*/' },
            'java': { start: '//', end: '', multiStart: '/\\*', multiEnd: '\\*/' },
            'clike': { start: '//', end: '', multiStart: '/\\*', multiEnd: '\\*/' },
            'html': { start: '<!--', end: '-->', multiStart: '<!--', multiEnd: '-->' }
        };
        return patterns[language] || patterns['clike'];
    }

    function prepareSlices(code) {
        const language = detectLanguage(code);
        const commentPattern = getCommentPattern(language);
        const lines = code.split('\n');
        const slices = [];
        let currentSlice = [];
        let inSlice = false;

        const startSlicePattern = new RegExp(`^\\s*(${commentPattern.start}|${commentPattern.multiStart})\\s*start\\s+slice\\s*(${commentPattern.end}|${commentPattern.multiEnd})?`, 'i');
        const endSlicePattern = new RegExp(`^\\s*(${commentPattern.start}|${commentPattern.multiStart})\\s*end\\s+slice\\s*(${commentPattern.end}|${commentPattern.multiEnd})?`, 'i');

        console.log('Total lines:', lines.length);

        lines.forEach((line, index) => {
            if (startSlicePattern.test(line)) {
                console.log(`Start slice found at line ${index + 1}`);
                inSlice = true;
                currentSlice = [];
            } else if (endSlicePattern.test(line)) {
                console.log(`End slice found at line ${index + 1}`);
                inSlice = false;
                if (currentSlice.length > 0) {
                    slices.push({
                        code: currentSlice.join('\n'),
                        language: language
                    });
                    console.log(`Slice added, total slices: ${slices.length}`);
                }
            } else if (inSlice) {
                currentSlice.push(line);
            }
        });

        if (inSlice && currentSlice.length > 0) {
            slices.push({
                code: currentSlice.join('\n'),
                language: language
            });
            console.log('Final slice added due to no end marker');
        }

        console.log('Total slices found:', slices.length);
        return slices;
    }

    function displaySlices(slices) {
        console.log('Displaying slices, count:', slices.length);
        slicesContainer.innerHTML = '';
        slices.forEach((slice, index) => {
            console.log(`Processing slice ${index + 1}`);
            const sliceElement = document.createElement('div');
            sliceElement.className = 'bg-gray-100 p-4 rounded-lg';

            // Map languages to Prism-supported language classes
            const languageMap = {
                'python': 'language-python',
                'java': 'language-java',
                'php': 'language-php',
                'html': 'language-markup',
                'javascript': 'language-javascript',
                'clike': 'language-clike'
            };

            const languageClass = languageMap[slice.language] || 'language-clike';

            sliceElement.innerHTML = `
                <div class="flex items-center mb-2">
                    <h3 class="text-lg font-semibold mr-2">Slice ${index + 1}:</h3>
                    <input type="text" class="slice-name-input border-b border-gray-300 bg-transparent focus:outline-none focus:border-blue-500" value="Untitled Slice" />
                </div>
                <pre><code class="${languageClass}">${escapeHtml(slice.code)}</code></pre>
                <div id="editor-${index}" class="mt-4 h-32"></div>
            `;
            slicesContainer.appendChild(sliceElement);

            // Initialize Quill editor for this slice
            new Quill(`#editor-${index}`, {
                theme: 'snow',
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'],
                        ['blockquote', 'code-block'],
                        [{ 'header': 1 }, { 'header': 2 }],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        [{ 'color': [] }, { 'background': [] }],
                        ['clean']
                    ]
                },
                placeholder: 'Add notes for this slice...'
            });

            // Add event listener for slice name input
            const sliceNameInput = sliceElement.querySelector('.slice-name-input');
            sliceNameInput.addEventListener('change', (e) => {
                console.log(`Slice ${index + 1} renamed to: ${e.target.value}`);
            });

            // Highlight the code
            Prism.highlightElement(sliceElement.querySelector('code'));
        });
    }

    function escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
  });
});