// page,js는 필수 이다. (생략 불가)
// 각 경로(/, /about. /content ..) 마다 페이지리를 랜더링 하려면 해당 경로의 page.js 파일이 반드시 필요하다


import Map from "./map/Map";
import App from "./main/App";


// 자식컴포넌트
export default function Home() {
  return (
    // 해당 내용은 부모 컴포넌트의 props =>{childern} 에 삽입된다.
  <>
   <App  />
   <Map />
  

  </>
  );
}
