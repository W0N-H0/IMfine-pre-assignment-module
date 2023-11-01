import { drawGraph } from "./graph.js";
import { displayDataAsJson } from "./jsonEditor.js";

// 테이블 업데이트 함수
export function updateTable(data, valueList, chartCanvas, chartContext) {
  valueList.innerHTML = "";
  data.forEach((item) => {
    const row = document.createElement("tr");
    row.classList.add("table-body__row");
    row.innerHTML = `
      <td class="table-body__cell table-body__cell--id"><div>${item.id}</div></td>
      <td class="table-body__cell table-body__cell--value"><input type="number" value="${item.value}" min="1" max="100"></td>
      <td class="table-body__cell table-body__cell--delete"><button data-id="${item.id}" class="button button--delete">삭제</button></td>
    `;
    valueList.appendChild(row);
  });

  // 테이블 업데이트 이후 그래프도 업데이트
  drawGraph(data, chartCanvas, chartContext);
}

// 테이블에서 데이터를 업데이트 하는 함수(2. 값편집)
export function updateDataFromTable(
  data,
  valueList,
  chartCanvas,
  chartContext,
  advancedEditSection
) {
  const inputElements = valueList.querySelectorAll("input");
  const newData = data.map((item) => ({ ...item }));

  // 테이블에서 입력된 데이터를 가져와서 업데이트
  let isValueValid = true;
  inputElements.forEach((input) => {
    const id = parseInt(
      input
        .closest(".table-body__row")
        .querySelector(".table-body__cell:first-child div").textContent,
      10
    );
    const value = parseFloat(input.value);

    if (isNaN(value) || value < 0 || value > 100) {
      alert("유효한 VALUE를 입력하세요. (0 ~ 100)");
      isValueValid = false;
      return; // 유효하지 않은 경우에는 함수 종료
    }

    const index = newData.findIndex((item) => item.id === id);
    if (index !== -1) {
      newData[index].value = value;
    }
  });

  if (isValueValid) {
    // isValueValid가 true일 때만 확인 대화 상자를 표시
    newData.sort((a, b) => a.id - b.id);
    const isConfirmed = confirm(
      "편집한 값이 일괄적으로 수정됩니다. 수정하시겠습니까?"
    );
    if (isConfirmed) {
      data = newData;
      updateTable(data, valueList, chartCanvas, chartContext);
      drawGraph(data, chartCanvas, chartContext);
      displayDataAsJson(data, advancedEditSection);
    }
  }
}

// 테이블에 데이터 추가 함수
export function addData(
  data,
  newIdInput,
  newValueInput,
  valueList,
  chartCanvas,
  chartContext,
  advancedEditSection
) {
  const newId = parseInt(newIdInput.value, 10);
  const newValue = parseFloat(newValueInput.value);

  if (data.some((item) => item.id === newId)) {
    alert("동일한 ID 값이 이미 존재합니다.");
    return;
  }

  if (
    isNaN(newId) ||
    isNaN(newValue) ||
    newId < 0 ||
    newId > 100 ||
    newValue < 0 ||
    newValue > 100
  ) {
    alert("유효한 ID와 VALUE를 올바르게 입력하세요.");
    return;
  }

  data.push({ id: newId, value: newValue });
  data.sort((a, b) => a.id - b.id);
  newIdInput.value = "";
  newValueInput.value = "";
  updateTable(data, valueList, chartCanvas, chartContext);
  displayDataAsJson(
    data,
    advancedEditSection,
    valueList,
    chartCanvas,
    chartContext
  );
}
