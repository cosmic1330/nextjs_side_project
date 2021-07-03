export default function createCsvFile(name, list) {
  let fileName = `${name}.csv`; //匯出的檔名
  let data = list;
  let link = document.createElement("a");
  document.body.appendChild(link);
  link.download = fileName;
  link.href = "data:text/csv;charset=utf-8,\uFEFF" + encodeURI(data);
  // link.href = "data:text/csv;charset=utf-8,姓名,年龄\nMofei,18;";
  link.click();
}
