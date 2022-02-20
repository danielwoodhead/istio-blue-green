import createApp from "./app";

const port = 3000;
const app = createApp();

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
