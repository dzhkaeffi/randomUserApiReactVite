import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

const fetchRandomData = (page_number: number) => {
  return axios
    .get(`https://randomuser.me/api/?page=${page_number}`)
    .then(({ data }) => {
      // handle success
      console.log(data);
      return data;
    })
    .catch((err) => {
      console.error(err);
    });
};
interface UserName {
  first: string;
  last: string;
  title: string;
}
interface UserPicture {
  thumbnail: string;
}
interface UserInfo {
  name: UserName;
  picture: UserPicture;
}
const getFullUserName = (userInfo: UserInfo) => {
  const {
    name: { first, last },
  } = userInfo;
  return `${first} ${last}`;
};
function App() {
  const [randomUserDataJSON, setRandomUserDataJSON] = useState("");
  const [userInfos, setUserInfos] = useState<any>([]);
  const [nextPageNumber, setNextPageNumber] = useState(1);

  const fetchNextUser = () => {
    fetchRandomData(nextPageNumber).then((randomData) => {
      // setRandomUserDataJSON(JSON.stringify(randomData, null, 2) || "");
      const newUserInfos = [...userInfos, ...randomData.results];
      setUserInfos(newUserInfos);
    });
    setNextPageNumber(nextPageNumber + 1);
  };
  useEffect(() => {
    fetchNextUser();
  }, []);

  return (
    <div className="App">
      <button
        onClick={() => {
          fetchNextUser();
        }}
      >
        Fetch Next User
      </button>
      {userInfos.map((userInfo: any, idx: number) => (
        <div key={idx}>
          <p>{getFullUserName(userInfo)}</p>
          <img src={userInfo.picture.thumbnail}></img>
        </div>
      ))}
      {/* <pre>{randomUserDataJSON}</pre> */}
    </div>
  );
}

export default App;
