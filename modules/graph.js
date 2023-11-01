// graph.js 모듈

// 그래프 그리는 함수
export function drawGraph(data, chartCanvas, chartContext) {
  const barWidth = 30;
  const xOffset = 40;
  const yOffset = 20;
  const maxValue = 100;

  // 캔버스 초기화
  chartContext.clearRect(0, 0, chartCanvas.width, chartCanvas.height);
  chartContext.strokeStyle = "black";
  chartContext.beginPath();
  chartContext.moveTo(xOffset, 0);
  chartContext.lineTo(xOffset, chartCanvas.height - yOffset);
  chartContext.lineTo(chartCanvas.width, chartCanvas.height - yOffset);
  chartContext.stroke();
  chartContext.fillStyle = "black";
  chartContext.fillText("100", xOffset - 30, 25);
  chartContext.fillText("0", xOffset - 20, 275);

  // 데이터를 기반으로 그래프 그리기
  data.forEach((item, index) => {
    const x = index * (barWidth + xOffset) + xOffset + 35;
    const height = (item.value / maxValue) * (chartCanvas.height - yOffset * 2);
    const y = chartCanvas.height - height - yOffset;

    chartContext.fillStyle = "#007bff";
    chartContext.fillRect(x, y, barWidth, height);

    chartContext.fillStyle = "black";
    chartContext.fillText(
      item.id,
      x + barWidth / 2 - 5,
      chartCanvas.height - 5
    );
  });
}
