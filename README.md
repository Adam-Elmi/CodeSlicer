# CodeSlicer

CodeSlicer is a web tool that helps you break down code, add notes, and display snippets.

## Features

- Monaco editor integration
- Automatic language detection
- Code slicing based on comment markers
- Syntax highlighting
- Editable slice names
- Note-taking with Quill editor
- File upload functionality


## Usage

1. Upload a file or paste code
2. Add slice markers using lowercase comments
3. Click the "Prepare Slices" button to generate and display the slices

### Adding Slice Markers

To use CodeSlicer effectively:

1. Upload an existing file (e.g., index.js) by clicking the file upload button or paste your code directly into the editor.
2. If your code doesn't have slice markers, add them using lowercase comments:

### Example

```
// start slice
function exampleSlice() {
  console.log("This is a sliced function");
}
// end slice

// More of your code here

// start slice
const anotherSlice = () => {
  return "This is another slice";
};
// end slice
```

### Important

- The slice markers // start slice and // end slice must be lowercase, or they will not be recognized.


