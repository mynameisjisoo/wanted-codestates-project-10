# 휴먼스케이프

## 배포링크

https://humanscape-jisoolee.netlify.app/

## 실행 방법

① 레포지토리를 클론합니다.

```
git clone https://github.com/mynameisjisoo/wanted-codestates-project-10.git
```

② 프로젝트의 패키지를 설치합니다.

```
npm install
```

③ scripts 명령어로 프로젝트를 실행합니다.

```
npm start
```

## 기술 스택

![HTML5](https://img.shields.io/badge/html-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Netlify](https://img.shields.io/badge/netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=black)

## 구현 사항

### 1. 키보드 조작으로 추천 검색어 이동

   <img src="https://user-images.githubusercontent.com/84840032/159932756-b174de88-491a-4eb5-9392-a3c6fb337a31.gif">

- 키보드 방향키 조작으로 추천 검색어로 이동 가능하고, 엔터키를 누르면 한국임상정보 사이트로 연결됩니다.

### 2. 검색 상태 안내

- 추천 검색어 없음

  <img width="450" alt="image" src="https://user-images.githubusercontent.com/84840032/160036595-284de2ac-9f2c-4693-9532-748717fb73c6.png">

- 검색 중

  <img width="450" alt="image" src="https://user-images.githubusercontent.com/84840032/159950550-4dbe11af-aa16-41ff-9bbc-25d59d306142.png">

- 에러 발생

  <img width="450" alt="occurerror" src="https://user-images.githubusercontent.com/84840032/159949282-4c7ed007-279b-435d-a85f-cc30df79e821.png">

### 3. 검색창이 아닌 곳을 클릭하면 추천 목록 숨김 처리

<img src ="https://user-images.githubusercontent.com/84840032/160035714-9603ac30-d524-45cd-809c-ac61dacbfded.gif">

### 4. API 호출 최적화

<img src="https://user-images.githubusercontent.com/84840032/159934326-aaf7e94a-2150-4ee1-90c5-064766d167cf.gif">

- `onChange`의 특성 상 `input`에 글자가 입력될 때마다 콜백함수가 실행되어 과도한 API 요청이 일어나기 때문에 </br>
  `setTimeout`과 `clearTimeout`을 이용하여 키보드 입력이 발생하면 1000ms 후 마지막 입력에 대해서만 API 요청 함수를 실행하도록 디바운싱을 구현했습니다.

  ```
  let timer;
  const onInputFilled = (e) => {
  const keyword = e.target.value;
  if (timer) {
      clearTimeout(timer);
  }
  timer = setTimeout(function () {
      if (keyword === '' || keyword === ' ') return;
      dispatch(fetchResults(keyword));
  }, 1000);
  };
  ```

<img src="https://user-images.githubusercontent.com/84840032/159948042-83b3e184-f63d-4eda-be38-dc2ab2bc4c2c.gif">

- API 호출하여 응답받은 데이터를 로컬 스토리지에 저장하여 이전에 입력했던 검색어를 다시 입력하는 경우, </br>
  로컬 스토리지에 저장 된 데이터를 읽어와서 불필요한 중복 호출이 일어나지 않게 했습니다.

  ```
  async (keyword) => {
  if (!getDatatInLocal(keyword)) {
      const response = await axios.get(
      `https://api.clinicaltrialskorea.com/api/v1/search-conditions/?name=${keyword}`,
      );
      const fetchedData = response.data.slice(0, 10);
      setDataInLocal(keyword, fetchedData);
      return fetchedData;
  } else {
      return getDatatInLocal(keyword);
  }
  },
  ```

- 로컬 스토리지에 데이터를 저장하는 시점의 1시간 이후로 만료 시간을 지정했고, 로컬 스토리지에서 데이터를 읽어올 때는 만료 시간 유효성 검사를 해서 만료 시간이 지난 경우 API 호출로 새로운 데이터를 응답받도록 했습니다.

  ```
  const setDataInLocal = (keyword, data) => {
  const obj = {
      value: data,
      expire: Date.now() + 3600000,
  };
  const objString = JSON.stringify(obj);
  window.localStorage.setItem(keyword, objString);
  };

  const getDatatInLocal = (keyword) => {
  const obj = JSON.parse(localStorage.getItem(keyword));
  if (!obj) return null;
  if (Date.now() > obj.expire) {
      window.localStorage.removeItem(keyword);
      return null;
  }
  return obj.value;
  };
  ```

## 어려웠던 점

### API 캐싱

- 처음에는 API 요청을 서버에서 캐싱하는 방법으로 접근하여 `request header`의 `cache-control` 을 설정하려고 했으나 CORS 이슈가 발생했고
  검색을 통해 클라이언트 단에서는 할 수 없고 응답하는 서버에서 코드를 변경해야 함을 알게되었습니다. </br>
- 해결방법 : 요청 결과를 로컬 스토리지에 저장한 후 동일한 요청에 대해서 로컬 스토리지의 데이터를 읽어오도록 로컬 캐싱을 구현했습니다.

### 검색창에 포커스가 있을 때만 추천 검색어를 보여주는 기능

- 검색창이 아닌 곳을 클릭할 때 추천 검색어 목록을 숨기기 위해서 `onFocus`에는 목록을 보이게하고 `onBlur`에는 목록이 안보이게 구현했는데, 추천 검색어를 클릭하면 input의 focus가 사라지므로 `onBlur` 이벤트가 발생하여 목록이 안보이는 버그가 발생했습니다.
- 해결방법 : `onFocus`와 `onBlur` 대신 `window`에 `click` 이벤트를 등록한 후 `event.target`이 `search` 컴포넌트에 속하지 않으면 목록이 보이지 않게 구현했습니다.

  ```
    const handleFocus = (e) => {
      if (!searchRef.current.contains(e.target)) {
        setOpen(false);
      } else {
        inputRef.current.value && setOpen(true);
      }
    };

    useEffect(() => {
      window.addEventListener('click', handleFocus);
    }, []);
  ```
