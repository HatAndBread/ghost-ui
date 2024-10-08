const htmlHeaders = new Headers();

htmlHeaders.set("Content-Type", "text/html");
export const controller = {
  get: async (request: Request) => {
    return new Response(
      `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <title>Dommie Test</title>
        </head>
        <body>
        <div id="app"></div>
        <script type="text/javascript" src="/public/test-pages/ui-test.js"></script>
        </body>
      </html>`,

      { headers: htmlHeaders },
    );
  },
};
