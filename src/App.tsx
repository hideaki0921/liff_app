// import React from "react";
// import logo from "./logo.svg";
// import "./App.css";
// import liff from "@line/liff";

// function App() {
//   const sendMessage = () => {
//     liff
//       .init({ liffId: '1657769377-701En9zZ' as string }) // LIFF IDをセットする
//       .then(() => {
//         if (!liff.isLoggedIn()) {
//           liff.login({}); // ログインしていなければ最初にログインする
//         } else if (liff.isInClient()) {
//           // LIFFので動いているのであれば
//           liff
//             .sendMessages([
//               {
//                 // メッセージを送信する
//                 type: "text",
//                 text: "こんにちは",
//               },
//             ])
//             // .then(function () {
//             //   window.alert("Message sent");
//             // })
//             .catch(function (error) {
//               window.alert("Error sending message: " + error);
//             });
//         }
//       });
//   };

//   const getUserInfo = () => {
//     liff.init({ liffId: '1657769377-701En9zZ' as string }).then(() => {
//       if (!liff.isLoggedIn()) {
//         liff.login({}); // ログインしていなければ最初にログインする
//       } else if (liff.isInClient()) {
//         liff
//           .getProfile() // ユーザ情報を取得する
//           .then((profile) => {
//             const userId: string = profile.userId;
//             const displayName: string = profile.displayName;
//             alert(`Name: ${displayName}, userId: ${userId}`);
//           })
//           .catch(function (error) {
//             window.alert("Error sending message: " + error);
//           });
//       }
//     });
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <button className="button" onClick={sendMessage}>send message</button>
//         <button className="button" onClick={getUserInfo}>show user info</button>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


import React from "react";
import { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import "./App.css";

const videoConstraints = {
  width: 720,
  height: 360,
  facingMode: "user",
};

export const App = () => {
  const [isCaptureEnable, setCaptureEnable] = useState<boolean>(false);
  const webcamRef = useRef<Webcam>(null);
  const [url, setUrl] = useState<string | null>(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setUrl(imageSrc);
    }
  }, [webcamRef]);

  return (
    <>
      <header>
        <h1>カメラアプリ</h1>
      </header>
      {isCaptureEnable || (
        <button onClick={() => setCaptureEnable(true)}>開始</button>
      )}
      {isCaptureEnable && (
        <>
          <div>
            <button onClick={() => setCaptureEnable(false)}>終了</button>
          </div>
          <div>
            <Webcam
              audio={false}
              width={540}
              height={360}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
            />
          </div>
          <button onClick={capture}>キャプチャ</button>
        </>
      )}
      {url && (
        <>
          <div>
            <button
              onClick={() => {
                setUrl(null);
              }}
            >
              削除
            </button>
          </div>
          <div>
            <img src={url} alt="Screenshot" />
          </div>
        </>
      )}
    </>
  );
};

export default App;