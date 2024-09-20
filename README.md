# CodeSlicer

CodeSlicer is a web-based tool that allows users to slice code into manageable segments, add notes, and customize the display of code snippets.

## Purpose

I use this program (CodeSlicer) daily to review my code or documentation's code or any code I want to understand. It helps me to focus easily. I liked to share this project with you guys, hope you will like it!

## Features

- Monaco editor integration for code input
- Automatic language detection
- Support for multiple programming languages
- Code slicing based on comment markers
- Syntax highlighting for sliced code
- Editable slice names
- Note-taking capability for each slice using Quill editor
- File upload functionality
- Custom language support

## Current Limitations

CodeSlicer is a work in progress. Here are some important limitations to be aware of:

- No save state: CodeSlicer does not currently save your notes or code. All work is lost when you refresh or close the page.
- Limited language support: While the tool can detect various languages, Prism syntax highlighting is currently only implemented for JavaScript and HTML.
- Does not support CSS files or code.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/Adam-Elmi/CodeSlicer.git
   ```

2. Navigate to the project directory:
   ```
   cd CodeSlicer
   ```

3. Open `index.html` in a web browser.

## Usage

To use CodeSlicer:

1. You can upload an existing file (e.g., index.js) by clicking the file upload button.
2. If your code doesn't have slice markers, add them using lowercase comments:
``` 
// start slice
// Your code here
// end slice
```

 ### Example
```javascript
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

#### Important
- The slice markers `// start slice` and `// end slice` must be lowercase, or they will not be recognized.

After adding slice markers, click the "Prepare Slices" button to generate and display the slices.
