import { useState, useContext } from "react";
import { DiaryStateContext } from "../App";
import Header from "../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";

// 날짜별로 (클릭시) 리스트가 나오게 필터링
// 시작시간과 끝시간 사이 계산
const getMonthData = (pivotDate, data) => {
  // 시작되는 시간
  const beginTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth(),
    1,
    0,
    0,
    0
  ).getTime();

  // 마지막 시간
  const endTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth() + 1,
    0,
    23,
    59,
    59
  ).getTime();

  return data.filter(
    // 시작시간이 현재날짜보다 작거나 마지막 시간이 현재날짜보다 높다면 이번달 안에 작성된 일기라는게 보장된다.
    (item) => beginTime <= item.createDate && item.createDate <= endTime
  );
};

const Home = () => {
  const data = useContext(DiaryStateContext);
  const [pivotDate, setPivotDate] = useState(new Date());

  const monthlyData = getMonthData(pivotDate, data);

  const onIncreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };

  const onDecreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };

  return (
    <div>
      <Header
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
        leftChild={<Button onClick={onDecreaseMonth} text={"<"} />}
        rightChild={<Button onClick={onIncreaseMonth} text={">"} />}
      />
      {/* 위에 날짜별로 필터링 된 리스트를  DiaryList에 props로 전달 */}
      <DiaryList data={monthlyData} />
    </div>
  );
};

export default Home;
