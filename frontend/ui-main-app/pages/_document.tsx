import Document, { Head, Html, Main, NextScript } from 'next/document'
class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="h-full bg-white">
        <Head title="Eli Panda - " />
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
