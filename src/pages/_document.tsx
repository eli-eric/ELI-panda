import Document, { Head, Html, Main, NextScript } from 'next/document'
class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="h-full">
        <Head title="Eli Panda - " />
        <body className="h-full bg-white dark:bg-gray-800 dark:bg-gray-800">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
