import { PDFDocument, rgb } from 'pdf-lib';

export async function createDocument(expediente: {
  id: string;
  numero: string;
  estado: string;
  partes: string;
  ultimaModificacion: string;
}) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 400]);
  const { height } = page.getSize();

  page.drawText(`Expediente: ${expediente.numero}`, {
    x: 50,
    y: height - 50,
    size: 20,
    color: rgb(0, 0, 0),
  });

  page.drawText(`Estado: ${expediente.estado}`, {
    x: 50,
    y: height - 80,
    size: 15,
    color: rgb(0, 0, 0),
  });

  page.drawText(`Partes: ${expediente.partes}`, {
    x: 50,
    y: height - 110,
    size: 15,
    color: rgb(0, 0, 0),
  });

  page.drawText(`Última Modificación: ${expediente.ultimaModificacion}`, {
    x: 50,
    y: height - 140,
    size: 15,
    color: rgb(0, 0, 0),
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}