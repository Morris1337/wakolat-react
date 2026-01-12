// src/utils/printDoc.js
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import API from './api';
import natoSanReg from '../fonts/NotoSans-Regular.ttf'
import natoSanBold from '../fonts/NotoSans-Bold.ttf'

const FONT_REG_URL  = natoSanReg;
const FONT_BOLD_URL = natoSanBold;

let __pdfFontsReady = null;

// 1) Вверху файла вместо старого ensurePdfFonts:
let __fontCache = null;

const bufToB64 = (buf) => new Promise((resolve) => {
  const fr = new FileReader();
  fr.onload = () => resolve(fr.result.split(',')[1]);
  fr.readAsDataURL(new Blob([buf], { type: 'font/ttf' }));
});

async function loadFontsB64() {
  if (__fontCache) return __fontCache;
  const [regBuf, boldBuf] = await Promise.all([
    fetch(FONT_REG_URL).then(r => r.arrayBuffer()),
    fetch(FONT_BOLD_URL).then(r => r.arrayBuffer()),
  ]);
  const [regB64, boldB64] = await Promise.all([bufToB64(regBuf), bufToB64(boldBuf)]);
  __fontCache = { regB64, boldB64 };
  return __fontCache;
}

async function registerPdfFonts(doc) {
  const { regB64, boldB64 } = await loadFontsB64();
  doc.addFileToVFS('NotoSans-Regular.ttf', regB64);
  doc.addFileToVFS('NotoSans-Bold.ttf',    boldB64);
  doc.addFont('NotoSans-Regular.ttf', 'NotoSans', 'normal');
  doc.addFont('NotoSans-Bold.ttf',    'NotoSans', 'bold');
}

async function ensurePdfFonts() {
  if (__pdfFontsReady) return __pdfFontsReady;

  // безопасная конвертация ArrayBuffer -> base64 без огромных аргументов
  const bufToB64 = (buf) => new Promise((resolve) => {
    const fr = new FileReader();
    fr.onload = () => resolve(fr.result.split(',')[1]); // убрать "data:*;base64,"
    fr.readAsDataURL(new Blob([buf], { type: 'font/ttf' }));
  });

  __pdfFontsReady = (async () => {
    const [regBuf, boldBuf] = await Promise.all([
      fetch(FONT_REG_URL).then(r => r.arrayBuffer()),
      fetch(FONT_BOLD_URL).then(r => r.arrayBuffer()),
    ]);
    const [regB64, boldB64] = await Promise.all([bufToB64(regBuf), bufToB64(boldBuf)]);
    jsPDF.API.addFileToVFS('NotoSans-Regular.ttf', regB64);
    jsPDF.API.addFileToVFS('NotoSans-Bold.ttf',    boldB64);
    jsPDF.API.addFont('NotoSans-Regular.ttf', 'NotoSans', 'normal');
    jsPDF.API.addFont('NotoSans-Bold.ttf',    'NotoSans', 'bold');
  })();

  return __pdfFontsReady;
}


/**
 * Печать документов магазина
 * @param {'receipt'|'invoice'} type
 * @param {Object} payload
 * @param {Array<{name:string, color?:string, size?:string, qty:number, price:number}>} payload.cart
 * @param {number|string} payload.total
 * @param {number|string} payload.saleId
 * @param {('cash'|'card'|null)} [payload.payment]  // опционально
 */
export default async function printDoc(type, { cart, total, saleId, payment = null }) {
  if (type === 'receipt') {
    // ---------- НАСТРОЙКИ ----------
    const paperWidth = 80;            // 58 / 72 / 80 (мм)
    const margin = 3;                 // поля слева/справа
    const lineH = 4.6;                // межстрочный интервал
    const fontName = 'courier';       // термочеки любят моно-шрифт

    // Реквизиты нашей компании
    let our = {};
    try {
      const r = await API.get('/fcshop/company-details', { params: { type: 'our' } });
      our = r.data?.[0] || {};
    } catch { /* ignore */ }

    const now = new Date();
    const fmtTime = now.toLocaleTimeString('lv-LV', { hour: '2-digit', minute: '2-digit' });
    const fmtDate = now.toLocaleDateString('lv-LV');

    // Полезная ширина текста
    const W = paperWidth - margin * 2;

    // Только измерение переносов (1-й проход)
    const measureDoc = new jsPDF({ unit: 'mm', format: [paperWidth, 200] });
    const wrapMeasure = (doc, t, size = 9) => {
      doc.setFont(fontName, 'normal');
      doc.setFontSize(size);
      return doc.splitTextToSize(String(t || ''), W);
    };

    let y = 6;

    // Шапка — примерно оцениваем высоту
    y += lineH + 1; // title
    if (our.address) {
      const lines = String(our.address).split(/\n/);
      y += lines.length * lineH;
    }
    const regLine = [
      our.reg_number ? `Reģ. Nr.: ${our.reg_number}` : null,
      our.vat_number ? `PVN Nr.: ${our.vat_number}` : null
    ].filter(Boolean).join('   ');
    if (regLine) y += lineH;
    y += 1.5 + 1; // hr

    // Kvīts/Datums/Laiks
    y += lineH * 3;
    y += 1.5 + 1; // hr

    // Заголовки позиций
    y += lineH * 2;

    // Позиции
    cart.forEach(item => {
      const name = [item.name, [item.color, item.size].filter(Boolean).join('/')]
        .filter(Boolean).join(' — ');
      const nameLines = wrapMeasure(measureDoc, name, 9);
      y += nameLines.length * lineH;

      const qty   = String(item.qty).padStart(2, ' ');
      const price = Number(item.price).toFixed(2);
      const sum   = (Number(item.qty) * Number(item.price)).toFixed(2);
      const rightLine = `${qty} gab   ${price}   ${sum} €`;
      const lineWidth = measureDoc.getTextWidth(rightLine);

      y += (lineWidth <= W) ? (lineH + 1) : (lineH * 2 + 1);
    });

    y += 1.5 + 1;        // hr
    y += (lineH + 1) * 1;// KOPA
    y += lineH * 2;      // PVN / Bez PVN
    if (payment) y += lineH; // строка способа оплаты
    y += 1.5 + 1;        // hr
    y += lineH * 2;      // спасибо

    const neededHeight = Math.max(90, Math.ceil(y + 6));

    // ---------- 2-й ПРОХОД: отрисовка ----------
    const doc = new jsPDF({ unit: 'mm', format: [paperWidth, neededHeight] });

    const hr = (pad = 0) => {
      doc.setLineWidth(0.2);
      doc.setDrawColor(160);
      y += pad;
      doc.line(margin, y, paperWidth - margin, y);
      y += 1.5;
    };
    const text = (t, x, align = 'left', size = 9, bold = false) => {
      doc.setFont(fontName, bold ? 'bold' : 'normal');
      doc.setFontSize(size);
      doc.text(String(t), x, y, { align });
    };
    const wrap = (t, size = 9) => {
      doc.setFont(fontName, 'normal');
      doc.setFontSize(size);
      return doc.splitTextToSize(String(t || ''), W);
    };

    y = 6;

    // Шапка
    text(our.name || 'SIA Fun Catchers Shop', paperWidth / 2, 'center', 12, true);
    y += lineH + 1;

    if (our.address) {
      String(our.address).split(/\n/).forEach(l => { text(l, margin); y += lineH; });
    }
    const reg = [
      our.reg_number ? `Reģ. Nr.: ${our.reg_number}` : null,
      our.vat_number ? `PVN Nr.: ${our.vat_number}` : null
    ].filter(Boolean).join('   ');
    if (reg) { text(reg, margin); y += lineH; }

    hr(1);

    text(`Kvīts Nr.: ${saleId}`, margin, 'left', 9, true); y += lineH;
    text(`Datums: ${fmtDate}`, margin); y += lineH;
    text(`Laiks:  ${fmtTime}`, margin); y += lineH;

    hr(1);

    text('Prece', margin, 'left', 9, true); y += lineH;
    text('Skaits  Cena   Summa', paperWidth - margin, 'right', 8); y += 1;

    cart.forEach(item => {
      const name = [item.name, [item.color, item.size].filter(Boolean).join('/')]
        .filter(Boolean).join(' — ');
      wrap(name, 9).forEach(ln => { text(ln, margin); y += lineH; });

      const qty   = String(item.qty).padStart(2, ' ');
      const price = Number(item.price).toFixed(2);
      const sum   = (Number(item.qty) * Number(item.price)).toFixed(2);
      const rightLine = `${qty} gab   ${price}   ${sum} €`;
      const lineWidth = doc.getTextWidth(rightLine);

      if (lineWidth <= W) {
        text(rightLine, paperWidth - margin, 'right', 9);
        y += lineH + 1;
      } else {
        text(`${qty} gab   ${price}`, paperWidth - margin, 'right', 9);
        y += lineH;
        text(`${sum} €`, paperWidth - margin, 'right', 9);
        y += 1;
      }
    });

    hr(1);

    const totalNum = Number(total);
    const net = +(totalNum / 1.21).toFixed(2);     // цены с НДС → считаем без НДС
    const vat = +(totalNum - net).toFixed(2);

    text('KOPĀ:', margin, 'left', 11, true);
    text(`${totalNum.toFixed(2)} €`, paperWidth - margin, 'right', 11, true);
    y += lineH + 1;

    text('PVN 21%:', margin);  text(`${vat.toFixed(2)} €`, paperWidth - margin, 'right'); y += lineH;
    text('Bez PVN:', margin);  text(`${net.toFixed(2)} €`, paperWidth - margin, 'right'); y += lineH;

    if (payment) {
      const payTxt = payment === 'card' ? 'Samaksāts: Bankas karte' :
                     payment === 'cash' ? 'Samaksāts: Skaidra nauda' : '';
      if (payTxt) { text(payTxt, margin); y += lineH; }
    }

    hr(1);

    text('Paldies par pirkumu!', paperWidth / 2, 'center'); y += lineH;

    doc.save(`kvits-${saleId}.pdf`);
    return;
  }

if (type === 'invoice') {
  // await ensurePdfFonts();

  // Load sale, items, and our company data
  const { data } = await API.get(`/fcshop/sales/${saleId}`);
  const sale  = data.sale;
  const items = data.items || [];
  const our   = data.our || {};

  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  await registerPdfFonts(doc);
  const L = 14, R = 200 - 14;
  let y = 16;

  // ===== Header =====
  doc.setFont('NotoSans', 'bold'); doc.setFontSize(16);
  doc.text('INVOICE', L, y); y += 8;

  doc.setFont('NotoSans', 'normal'); doc.setFontSize(10);
  doc.text(`No.: ${sale.invoice_no || saleId}`, L, y);
  doc.text(
    `Date: ${new Date(sale.sale_date || Date.now()).toLocaleDateString('en-GB')}`,
    R, y, { align: 'right' }
  );
  y += 8;

  // ===== Supplier (left) =====
  doc.setFont('NotoSans', 'bold'); doc.text('Supplier:', L, y); y += 5;
  doc.setFont('NotoSans', 'normal');
  if (our.name)       { doc.text(our.name, L, y); y += 5; }
  if (our.reg_number) { doc.text(`Reg. No.: ${our.reg_number}`, L, y); y += 5; }
  if (our.vat_number) { doc.text(`VAT No.: ${our.vat_number}`, L, y); y += 5; }
  if (our.address)    { doc.text(String(our.address), L, y, { maxWidth: 90 }); }

  // ===== Customer (right) =====
  y = 29;
  doc.setFont('NotoSans', 'bold'); doc.text('Customer:', R, y, { align: 'right' }); y += 5;
  doc.setFont('NotoSans', 'normal');
  if (sale.client_name)        { doc.text(sale.client_name, R, y, { align: 'right' }); y += 5; }
  if (sale.client_reg_number)  { doc.text(`Reg. No.: ${sale.client_reg_number}`, R, y, { align: 'right' }); y += 5; }
  if (sale.client_vat_number)  { doc.text(`VAT No.: ${sale.client_vat_number}`, R, y, { align: 'right' }); y += 5; }
  if (sale.client_address)     { doc.text(String(sale.client_address), R, y, { align: 'right', maxWidth: 90 }); }

  // ===== Items table =====
  const body = items.map(it => ([
    it.name,
    [it.color, it.size].filter(Boolean).join('/'),
    String(it.qty),
    Number(it.price).toFixed(2),
    Number(it.line_total ?? it.qty * it.price).toFixed(2),
  ]));

  doc.autoTable({
    startY: 70,
    head: [['Item', 'Color/Size', 'Qty', 'Price (EUR)', 'Amount (EUR)']],
    body,
    styles: { font: 'NotoSans', fontSize: 9, cellPadding: 2 },
    headStyles: { font: 'NotoSans', halign: 'left', fontStyle: 'bold' },
    columnStyles: { 2: { halign: 'right' }, 3: { halign: 'right' }, 4: { halign: 'right' } },
  });

  // ===== Totals =====
  const tableEnd = doc.lastAutoTable.finalY + 8;
  const totalNum = Number(sale.total ?? 0);
  const vatRate  = Number(sale.vat_rate ?? 21);
  const vat      = Number(sale.vat_amount ?? (totalNum - totalNum / (1 + vatRate / 100)));
  const net      = Number(sale.subtotal ?? (totalNum - vat));

  doc.setFont('NotoSans', 'bold'); doc.setFontSize(11);
  doc.text(`TOTAL: ${totalNum.toFixed(2)} €`, R, tableEnd, { align: 'right' });
  doc.setFont('NotoSans', 'normal'); doc.setFontSize(10);
  doc.text(`VAT ${vatRate.toFixed(0)}%: ${vat.toFixed(2)} €`, R, tableEnd + 6, { align: 'right' });
  doc.text(`Subtotal (excl. VAT): ${net.toFixed(2)} €`, R, tableEnd + 12, { align: 'right' });

  // ===== Signatures =====
  let signY = tableEnd + 30;
  doc.text('Issued by:', L, signY);
  doc.line(L + 23, signY - 1.5, L + 80, signY - 1.5);
  doc.text('Received by:', R - 80, signY);
  doc.line(R - 55, signY - 1.5, R, signY - 1.5);

  // ===== Footer note =====
  signY += 20;
  doc.setFontSize(9);
  doc.text(
    'This document was prepared electronically and is valid without a signature under Article 11 of the Accounting Law.',
    L, signY
  );

  doc.save(`invoice-${sale.invoice_no || saleId}.pdf`);
  return;
}
}
