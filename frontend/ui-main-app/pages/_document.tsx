import Document, { Html, Head, Main, NextScript } from 'next/document'
class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head className="h-full bg-gray-50" />
        <body className="h-full">
          <div id="overlays" />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
