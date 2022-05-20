//assetsのnavigation.jsonを参考にメイン画面を表示するためのJSONを作成する

const fs = require("fs");

const initial = {
  id: "index",
  title: "Practice Pronaunce",
  type: "document",
  contents: "",
};

const navigationString = fs.readFileSync("src/assets/navigation.json", "utf-8");
const navigation = JSON.parse(navigationString);
const contents = navigation.map(
  (item) => ` <a class="title-link" href="/${item.id}">
    <div class="title">${item.title}</div>
  </a>`
);
initial.contents = `
<div class="api-body">${contents.join("")}</div>
`;

fs.writeFileSync("src/assets/index.json", JSON.stringify(initial));
