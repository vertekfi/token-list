const { join } = require("path");
const fs = require("fs-extra");

// Separated here for organization but are stored in a single database table

const URI =
  "https://raw.githubusercontent.com/vertekfi/token-list/dev/tokenlist.json";

const basePath = join(process.cwd());
const tokenListDir = join(basePath, "token-lists");

const mainList = fs.readJSONSync(join(basePath, "tokenlist.json"));
const tokenLists = fs.readdirSync(tokenListDir);
mainList[URI].tokens = [];

tokenLists.forEach((fileName) => {
  const list = fs.readJSONSync(join(tokenListDir, fileName));
  mainList[URI].tokens = [...mainList[URI].tokens, ...list];
});

fs.writeJSONSync(join(basePath, "tokenlist.json"), mainList);
