import { css, cx } from "@emotion/css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useRef, useState } from "react";
import { Form, Field } from "react-final-form";
import Dialog from "../../components/stock/dialog";
import List from "../../components/stock/list";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
const style = {
  body: css`
    min-height: 100vh;
    background-color: #a59696;
  `,
  header: css`
    background: #524a4a;
    padding: 0 70px;
    vertical-align: middle;
    height: 70px;
    line-height: 70px;
    #logo {
      color: #a59696;
      font-size: 24px;
      margin: 0;
    }
  `,
  main: css`
    padding: 20px;
    margin: auto;
    margin-top: 50px;
    border-radius: 21px;
    width: 75%;
    background-color: #524a4a;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    .area1 {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .area2 {
      display: flex;
      justify-content: content;
      align-items: center;
      flex-direction: column;
      gap: 20px;
      width: 50%;
      h2 {
        text-align: center;
        color: #fff;
        font-size: 32px;
        margin-bottom: 0;
      }
      .previewBox {
        padding: 20px;
        height: 200px;
        width: 100%;
        background-color: rgba(255, 255, 255, 0.7);
        border-radius: 10px;
        pre {
          margin: 0;
          height: 150px;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 10;
          -webkit-box-orient: vertical;
          display: -webkit-box;
        }
      }
    }
    .area3 {
      display: flex;
      flex-direction: column;
      gap: 10px;
      h2 {
        text-align: center;
        color: #fff;
        font-size: 24px;
        font-weight: 400;
      }
    }
  `,
  outlinedButton: {
    root: css`
      color: #fff;
    `,
    outlined: css`
      border-color: #fff;
    `,
  },
  containedButton: {
    root: css`
      color: #524a4a;
    `,
    contained: css`
      background-color: #fff;
    `,
  },
  textField: {
    root: css`
      background-color: rgba(255, 255, 255, 0.5);
      .MuiFormLabel-root {
        color: #fff;
      }
    `,
  },
  loading: {
    root: css`
      z-index: 1;
    `,
  },
};
export default function Stock({ list }) {
  const upload = useRef(null);
  const [preview, setPreview] = useState(null);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarText, setSnackBarText] = useState("");
  const [loading, setLoading] = useState(false);
  const [testList, setTestList] = useState([]);

  const handleClick = () => {
    upload.current.click();
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const res = await fetch(
      `http://localhost:3000/api/stock/getJson?${new URLSearchParams(data)}`
    );
    let response = await res.json();
    if (response) {
      setSnackBarText("新增一筆測試結果");
      setOpenSnackBar(true);
      response = { ...data,...response};
      setTestList((pre) => [...pre, response]);
    }
    setLoading(false);
  };

  const saveTodayTestData = async () => {
    setLoading(true);
    const res = await fetch(`http://localhost:3000/api/stock/saveTestData`);
    const response = await res.json();
    if (response) {
      setSnackBarText("已建立今日測試資料");
      setOpenSnackBar(true);
    }
    setLoading(false);
  };

  const readFile = (file) => {
    if (/^([a-zA-Z]+-?)+[a-zA-Z0-9]+\/json$/.test(file.type)) {
      let reader = new FileReader();
      reader.readAsText(file);
      reader.onload = function (e) {
        let validation = { format: false, length: false, name: file.name };
        let jsonData = JSON.parse(this.result);
        // 驗證格式
        if (jsonData?.["1101"] && Array.isArray(jsonData?.["1101"])) {
          validation.format = true;
        }

        // 驗證資料長度一致
        let lengthArr = Object.keys(jsonData).map((element) => {
          return jsonData[element].length;
        });
        let length =
          [...new Set(lengthArr)].length === 1
            ? lengthArr[0]
            : [...new Set(lengthArr)];
        if (!Array.isArray(length)) {
          validation.length = true;
        }

        setPreview(validation);
      };
    } else {
      alert("請確保檔案為JSON格式檔案");
    }
  };

  return (
    <div className={style.body}>
      {/* loading */}
      <Backdrop open={loading} classes={style.loading}>
        <CircularProgress color="primary" />
      </Backdrop>
      {/* snack bar */}
      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackBar(false)}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setOpenSnackBar(false)}
          severity="success"
        >
          {snackBarText}
        </MuiAlert>
      </Snackbar>
      {/* main layout */}
      <header className={style.header}>
        <h1 id="logo">BackTest</h1>
      </header>
      <Form
        onSubmit={onSubmit}
        initialValues={{
          limitHandlingFee: 20,
          hightLoss: 0.15,
          handlingFeeRebate: 0.65,
          capital: 300000,
          fileName: "20210701.json",
          hightStockPrice: 100,
        }}
        render={({ handleSubmit }) => (
          <main className={style.main}>
            <div className="area1">
              <Button
                onClick={saveTodayTestData}
                classes={style.outlinedButton}
                variant="outlined"
              >
                取得今日資料
              </Button>
              <Button
                onClick={handleClick}
                classes={style.outlinedButton}
                variant="outlined"
              >
                上傳驗證資料
              </Button>
              <Dialog {...{ list }} />
              <Field name="uploadData">
                {({ input, meta }) => (
                  <input
                    accept=".json"
                    ref={upload}
                    type="file"
                    onChange={(event) => {
                      input.onChange(event.target.files[0]);
                      readFile(event.target.files[0]);
                    }}
                    onClick={(event) => {
                      event.target.value = null;
                    }}
                    className={css`
                      opacity: 0;
                      position: absolute;
                      z-index: -1;
                    `}
                  />
                )}
              </Field>
            </div>
            <div className="area2">
              <h2>回歸測試系統</h2>
              <div className="previewBox">
                <pre>
                  驗證資料：{preview ? preview.name : "空"}
                  {preview && (
                    <p>格式：{preview?.format ? "正確" : "格式錯誤"}</p>
                  )}
                  {preview && (
                    <p>資料長度：{preview?.length ? "一致" : "不一致"}</p>
                  )}
                </pre>
              </div>
              <Field name="capital">
                {({ input, meta }) => (
                  <TextField
                    label="本金"
                    classes={style.textField}
                    size="small"
                    variant="filled"
                    onChange={input.onChange}
                    value={input.value}
                    InputProps={{
                      className: css`
                        color: #505050;
                        &:hover::before {
                          border-color: transparent;
                        }
                        &::after {
                          border-color: #fff;
                        }
                      `,
                    }}
                  />
                )}
              </Field>
              <div className="submit">
                <Button
                  onClick={handleSubmit}
                  classes={style.containedButton}
                  variant="contained"
                >
                  開始測試
                </Button>
              </div>
            </div>
            <div className="area3">
              <h2>設定</h2>
              <Field name="limitHandlingFee">
                {({ input, meta }) => (
                  <TextField
                    label="最低手續費"
                    classes={style.textField}
                    size="small"
                    variant="filled"
                    onChange={input.onChange}
                    value={input.value}
                    InputProps={{
                      className: css`
                        color: #505050;
                        &:hover::before {
                          border-color: transparent;
                        }
                        &::after {
                          border-color: #fff;
                        }
                      `,
                    }}
                  />
                )}
              </Field>
              <Field name="handlingFeeRebate">
                {({ input, meta }) => (
                  <TextField
                    label="手續費折扣"
                    classes={style.textField}
                    size="small"
                    variant="filled"
                    onChange={input.onChange}
                    value={input.value}
                    InputProps={{
                      className: css`
                        color: #505050;
                        &:hover::before {
                          border-color: transparent;
                        }
                        &::after {
                          border-color: #fff;
                        }
                      `,
                    }}
                  />
                )}
              </Field>
              <Field name="hightLoss">
                {({ input, meta }) => (
                  <TextField
                    label="最高虧損(%)"
                    classes={style.textField}
                    size="small"
                    variant="filled"
                    onChange={input.onChange}
                    value={input.value}
                    InputProps={{
                      className: css`
                        color: #505050;
                        &:hover::before {
                          border-color: transparent;
                        }
                        &::after {
                          border-color: #fff;
                        }
                      `,
                    }}
                  />
                )}
              </Field>
              <Field name="hightStockPrice">
                {({ input, meta }) => (
                  <TextField
                    label="買進股價低於"
                    classes={style.textField}
                    size="small"
                    variant="filled"
                    onChange={input.onChange}
                    value={input.value}
                    InputProps={{
                      className: css`
                        color: #505050;
                        &:hover::before {
                          border-color: transparent;
                        }
                        &::after {
                          border-color: #fff;
                        }
                      `,
                    }}
                  />
                )}
              </Field>
            </div>
          </main>
        )}
      />
      <div className="testListBox">
        {testList.map((item) => (
          <List {...{item}}/>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  // 取得已存在資料檔
  const res = await fetch(`http://localhost:3000/api/stock/getTestDataList`);
  const list = await res.json();

  // // 取得回歸測試結果
  // const res2 = await fetch(
  //   `http://localhost:3000/api/stock/getJson?${new URLSearchParams(
  //     context.query
  //   )}`
  // );
  // const test = await res2.json();
  return { props: { list } };
}
