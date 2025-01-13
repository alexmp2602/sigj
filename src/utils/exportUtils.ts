import ExcelJS from "exceljs";
import { PDFDocument, rgb } from "pdf-lib";

// Función para exportar a Excel
export const exportToExcel = async (data: Array<{ numero: string; estado: string; partes: string }>) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Expedientes");

  worksheet.columns = [
    { header: "Número", key: "numero", width: 15 },
    { header: "Estado", key: "estado", width: 15 },
    { header: "Partes", key: "partes", width: 30 },
  ];

  data.forEach((exp) => worksheet.addRow(exp));

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "reporte-expedientes.xlsx";
  link.click();
};

// Función para exportar a PDF
export const exportToPDF = async (data: Array<{ numero: string; estado: string; partes: string }>) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 400]);

  page.drawText("Reporte de Expedientes", {
    x: 50,
    y: 350,
    size: 18,
    color: rgb(0, 0.53, 0.71),
  });

  let y = 320;
  data.forEach((exp, index) => {
    page.drawText(
      `${index + 1}. Número: ${exp.numero} | Estado: ${exp.estado} | Partes: ${exp.partes}`,
      { x: 50, y, size: 12 }
    );
    y -= 20;
  });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "reporte-expedientes.pdf";
  link.click();
};
