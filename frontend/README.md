# React AI Chat Component

A flexible and customizable React chat component that supports context-aware conversations and document processing. This component provides a modern chat interface with support for file uploads, dark/light mode, and intermediate step visualization for AI responses.

## Installation (NPM Package)

You can install the package from NPM:

```bash
yarn add chatbot-test-william
```

or using npm:

```bash
npm install chatbot-test-william
```

## UMD Usage (Direct HTML Integration)

This component is built as a **UMD (Universal Module Definition) bundle**, making it easy to use in HTML pages without requiring a build step. This is useful for integrating the chat component into existing websites or content management systems.

### Basic HTML Integration

1. Add the required React and ReactDOM scripts in your HTML `<head>`:

```html
<head>
  <!-- React and ReactDOM must be loaded before the component -->
  <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  
  <!-- Your chat component UMD bundle -->
  <script src="path/to/your/build/chat-component.umd.js"></script>
</head>
```

2. Add the root div at the end of your HTML body:

```html
<body>
  <!-- Your existing content -->
  <div id="root"></div>
</body>
```

3. Initialize the chat component:

```html
<script>
  window.ChatbotTest.mountApp({
    endpoint: window.chatConfig.endpoint,
    titleText: window.chatConfig.titleText,
    placeholder: window.chatConfig.placeholder,
    showUpload: window.chatConfig.showUpload,
    uploadEndpoint: window.chatConfig.showUpload ? window.chatConfig.uploadEndpoint : undefined
  });
</script>
```

### Configuration via Global Object

Instead of passing options manually, you can set configuration through a global `chatConfig` object:

```html
<script>
  window.chatConfig = {
    endpoint: 'https://your-api.example.com/chat',
    titleText: 'Custom Chat Title',
    placeholder: 'Type your message...',
    showUpload: true,
    uploadEndpoint: 'https://your-api.example.com/upload'
  };
</script>
```

## License

This project is **open-source** and licensed under the **Mozilla Public License 2.0 (MPL 2.0)**. This ensures that any modifications to this project remain open-source while allowing it to be combined with proprietary software. See the full license in the `LICENSE` file or visit [Mozilla Public License 2.0](https://www.mozilla.org/en-US/MPL/2.0/).

## Building UMD Bundle

To generate the UMD bundle for distribution:

```bash
yarn build:umd
```

The resulting bundle will be available in the `build/` directory and can be served from your preferred hosting solution.