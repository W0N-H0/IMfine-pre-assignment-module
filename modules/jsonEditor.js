// jsonEditor.js 모듈
import { updateTable } from "./table.js"; // table 모듈에서 updateTable 함수를 가져옴
import { drawGraph } from "./graph.js"; // graph 모듈에서 drawGraph 함수를 가져옴

// JSON 데이터를 표시하고 편집하는 함수
export function displayDataAsJson(
  data,
  advancedEditSection,
  valueList,
  chartCanvas,
  chartContext
) {
  const div = document.createElement("div");
  div.textContent = JSON.stringify(data, null, 2);
  div.setAttribute("contenteditable", true);
  advancedEditSection.innerHTML = "";
  advancedEditSection.appendChild(div);

  let previousData = [...data];

  const applyButton = document.querySelector(".button--advanced-apply");
  applyButton.addEventListener("click", function () {
    try {
      const jsonText = div.textContent.trim(); // JSON 텍스트에서 앞뒤 공백 제거
      const newData = JSON.parse(jsonText);
      if (Array.isArray(newData)) {
        const idSet = new Set();
        const isValidData = newData.every((item) => {
          if (idSet.has(item.id) || item.value < 0 || item.value > 100) {
            return false;
          }
          idSet.add(item.id);
          return true;
        });

        if (!isValidData) {
          alert(
            "편집에 실패하였습니다.\n1. ID 값은 편집이 불가능합니다.\n2. VALUE 값은 0과 100 사이에서만 편집이 가능합니다."
          );
          data = previousData;
          updateTable(data, valueList, chartCanvas, chartContext);
          drawGraph(data, chartCanvas, chartContext);
          displayDataAsJson(
            data,
            advancedEditSection,
            valueList,
            chartCanvas,
            chartContext
          );
          return;
        }

        previousData = [...data];
        data = newData;
        updateTable(data, valueList, chartCanvas, chartContext);
        drawGraph(data, chartCanvas, chartContext);
        displayDataAsJson(
          data,
          advancedEditSection,
          valueList,
          chartCanvas,
          chartContext
        );
      }
    } catch (error) {
      alert("유효한 JSON 데이터 형식이 아닙니다.");
      data = previousData;
      updateTable(data, valueList, chartCanvas, chartContext);
      drawGraph(data, chartCanvas, chartContext);
      displayDataAsJson(
        data,
        advancedEditSection,
        valueList,
        chartCanvas,
        chartContext
      );
    }
  });
}
