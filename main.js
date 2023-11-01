// 모듈에서 필요한 함수 import
import { drawGraph } from "./modules/graph.js";
import { updateTable, updateDataFromTable, addData } from "./modules/table.js";
import { displayDataAsJson } from "./modules/jsonEditor.js";

// DOMContentLoaded 이벤트가 발생했을 때 실행할 코드
document.addEventListener("DOMContentLoaded", function () {
  // 필요한 변수 선언
  const chartCanvas = document.querySelector(".graph-section__chart-canvas");
  const chartContext = chartCanvas.getContext("2d");
  const valueList = document.querySelector(".table__body");
  const newIdInput = document.querySelector(".input--id");
  const newValueInput = document.querySelector(".input--value");
  const advancedEditSection = document.querySelector(
    ".advancedEdit-section__content"
  );

  // 초기 데이터를 설정
  let data = [
    { id: 0, value: 100 },
    { id: 1, value: 50 },
  ];

  // 초기화 함수를 정의
  function initialize() {
    // 그래프 그리기
    drawGraph(data, chartCanvas, chartContext);
    // 테이블을 업데이트.
    updateTable(data, valueList, chartCanvas, chartContext);
    // JSON 데이터를 표시
    displayDataAsJson(
      data,
      advancedEditSection,
      valueList,
      chartCanvas,
      chartContext
    );
  }

  // 테이블에서 삭제 버튼을 클릭할 때 실행할 코드
  valueList.addEventListener("click", function (event) {
    if (event.target.classList.contains("button--delete")) {
      const id = parseInt(event.target.getAttribute("data-id"), 10);
      const isConfirmed = confirm("정말 삭제하시겠습니까?");
      if (isConfirmed) {
        // 데이터에서 해당 아이디를 가진 항목을 필터링하여 삭제
        data = data.filter((item) => item.id !== id);
        // 테이블을 업데이트
        updateTable(data, valueList, chartCanvas, chartContext);
        // JSON 데이터를 표시
        displayDataAsJson(
          data,
          advancedEditSection,
          valueList,
          chartCanvas,
          chartContext
        );
      }
    }
  });

  // '2. 값편집 - apply' 버튼을 클릭 시 실행할 코드
  document
    .querySelector(".button--apply")
    .addEventListener("click", function () {
      // 테이블에서 데이터를 가져와서 업데이트
      updateDataFromTable(
        data,
        valueList,
        chartCanvas,
        chartContext,
        advancedEditSection
      );
    });

  // 'add' 버튼을 클릭할 때 실행할 코드를 정의
  document.querySelector(".button--add").addEventListener("click", function () {
    // 입력된 데이터를 추가
    addData(
      data,
      newIdInput,
      newValueInput,
      valueList,
      chartCanvas,
      chartContext,
      advancedEditSection
    );
  });

  // 초기화 함수를 실행하여 초기 상태 설정
  initialize();
});
