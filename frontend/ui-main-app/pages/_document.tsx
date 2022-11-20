import Document, { Head, Html, Main, NextScript } from 'next/document'
class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="h-full bg-gray-100">
        <Head />
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
