import Document, { Head, Html, Main, NextScript } from 'next/document'
class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="h-full">
        <Head title="Eli Panda - ">
          <script src="https://unpkg.com/htmx.org" async></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  const theme = localStorage.getItem('theme');
                  const themeObj = JSON.parse(theme);
                  if (themeObj.state.isDark === true) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                })();

                document.addEventListener('htmx:configRequest', function(event) {
                  const token = localStorage.getItem('apiAccessToken');
                  if (token) {
                    event.detail.headers['Authorization'] = 'Bearer ' + token;
                  }
                });
              `
            }}
          ></script>
        </Head>
        <body className="h-full bg-white  dark:bg-gray-800">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
