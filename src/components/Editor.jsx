import { useState } from "react";
import Button from "./Button";
import "./Editor.css";
import EmotionItem from "./EmotionItem";
import { useNavigate } from "react-router-dom";

// 이미지 상태
const emotionList = [
  {
    emotionId: 1,
    emotionName: "완전 좋음",
  },
  {
    emotionId: 2,
    emotionName: "좋음",
  },
  {
    emotionId: 3,
    emotionName: "그럭저럭",
  },
  {
    emotionId: 4,
    emotionName: "나쁨",
  },
  {
    emotionId: 5,
    emotionName: "끔찍함",
  },
];

// 문자열로 변환된 날짜 (달력)
const getStringedDate = (targetDate) => {
  // 날짜 -> YYYY-MM-DD
  let year = targetDate.getFullYear();
  let month = targetDate.getMonth() + 1;
  let date = targetDate.getDate();

  if (month < 10) {
    month = `0${month}`;
  }
  if (date < 10) {
    date = `0${date}`;
  }

  return `${year}-${month}-${date}`;
};

const Editor = ({ onSubmit }) => {
  // 관련된 값을 묶어서 한 번에 관리 (날짜, 이미지상태, 내용)
  const [input, setInput] = useState({
    createdDate: new Date(),
    emotionId: 3,
    content: "",
  });
  const nav = useNavigate();

  // 사용자가 달력 선택한 날짜의 값
  const onChangeInput = (e) => {
    // console.log(e.target.name); // 어떤 요소에 입력이 들어온건지
    // console.log(e.target.value); // 입력된 값이 무엇인지?

    let name = e.target.name; // 여기서 'createdDate'라는 이름을 받아온다
    let value = e.target.value; // 선택된 날짜 값을 'Date' 객체로 변환한다

    if (name === "createdDate") {
      value = new Date(value);
    }

    // 기존 상태를 유지하면서(...input) name에 해당하는 값을 value로 업데이트
    setInput({
      ...input, // 기존의 input 상태를 그대로 가져오고
      [name]: value, // 선택된 날짜를 'createdDate'로 설정
    });
  };

  const onClickSubmitButtonClick = () => {
    onSubmit(input);
  };

  return (
    <div className="Editor">
      <section className="date_section">
        <h4>오늘의 날짜</h4>
        <input
          name="createdDate"
          onChange={onChangeInput}
          value={getStringedDate(input.createdDate)}
          type="date"
        />
      </section>
      <section className="emotion_section">
        <h4>오늘의 감정</h4>
        <div className="emotion_list_wrapper">
          {emotionList.map((item) => (
            <EmotionItem
              onClick={() =>
                onChangeInput({
                  // 버튼을 클릭했을 때 단순히 "클릭한 동작"만 처리하는 것이 아니라,
                  // "버튼을 클릭해서 그 버튼에 해당하는 감정 이미지의 데이터를 보내야 하기 때문" 에 target을 사용

                  target: {
                    // 감정 ID"를 업데이트하려는 거라고 알려주는것
                    name: "emotionId",
                    // 실제로 감정 ID 값을 넣은것
                    value: item.emotionId,
                  },
                })
              }
              key={item.emotionId}
              {...item}
              isSelected={item.emotionId === input.emotionId}
            />
          ))}
        </div>
      </section>
      <section className="content_section">
        <h4>오늘의 일기</h4>
        <textarea
          name="content"
          value={input.content}
          onChange={onChangeInput}
          placeholder="오늘은 어땠나요?"
        />
      </section>
      <section className="button_section">
        <Button onClick={() => nav(-1)} text={"취소하기"} />
        <Button
          onClick={onClickSubmitButtonClick}
          text={"작성완료"}
          type={"POSITIVE"}
        />
      </section>
    </div>
  );
};

export default Editor;
