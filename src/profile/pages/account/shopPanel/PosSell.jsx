// PosSell.jsx
import React, { useState, useRef } from 'react';
import API from '../../../utils/api';
import './ShopPanel.scss';
import doPrint from '../../../utils/printDoc';
// если захочешь камеру: npm i html5-qrcode
// import { Html5Qrcode } from 'html5-qrcode';

export default function PosSell() {
  const [code, setCode] = useState('');         // сюда вводим штрихкод ИЛИ артикул
  const [product, setProduct] = useState(null); // найденный товар
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [qty, setQty] = useState(1);
  const [cart, setCart] = useState([]);         // [{id,name,color,size,qty,price,subtotal}]
  const [loading, setLoading] = useState(false);
  const videoRef = useRef(null);

  // Вытягиваем товар (только при наличии остатков > 0)
  const lookup = async (raw) => {
    const trimmed = (raw || code || '').toString().trim();
    if (!trimmed) return;
    setLoading(true);
    try {
      const res = await API.get('/fcshop/find-by-code', { params: { code: trimmed } });
      // вернётся product c stock, ОТФИЛЬТРОВАННЫМ по quantity > 0
      const p = res.data;
      setProduct(p || null);
      setColor('');
      setSize('');
      setQty(1);
    } catch (e) {
      console.error(e);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  // Список доступных цветов и размеров только из остатков > 0
  const stock = product?.stock || [];
  const colors = Array.from(new Set(stock.map(s => s.color))).filter(Boolean);
  const sizesByColor = color
    ? Array.from(new Set(stock.filter(s => s.color === color).map(s => s.size)))
    : [];

  const currentStockEntry = stock.find(s => s.color === color && s.size === size);
  const unitPrice = currentStockEntry?.price ?? product?.price ?? 0;
  const maxQty = currentStockEntry?.quantity ?? 0;

  const addToCart = () => {
    if (!product || !color || !size) return;
    if (qty < 1) return;
    if (qty > maxQty) {
      alert(`На складе только ${maxQty} шт.`);
      return;
    }
    const item = {
      product_id: product.id,
      name: product.name,
      color,
      size,
      qty,
      price: unitPrice,
      subtotal: unitPrice * qty,
      price: unitPrice,
      discountPct: 0,
      subtotal: unitPrice * qty
    };
    setCart(prev => [...prev, item]);
    // сброс выбора
    setColor('');
    setSize('');
    setQty(1);
  };

  const removeItem = (idx) => {
    setCart(prev => prev.filter((_, i) => i !== idx));
  };

  const grandTotal = cart.reduce((sum, i) => sum + i.subtotal, 0);

  // Опционально: инициализация сканера камеры (включишь при желании)
  // useEffect(() => {
  //   const elId = 'qr-cam';
  //   const start = async () => {
  //     const q = new Html5Qrcode(elId);
  //     try {
  //       await q.start(
  //         { facingMode: 'environment' },
  //         { fps: 10, qrbox: 250 },
  //         (decodedText) => {
  //           lookup(decodedText);
  //           q.stop();
  //         }
  //       );
  //     } catch (e) { console.error(e); }
  //   };
  //   start();
  //   return () => { /* q.stop() при размонтировании, если нужно */ };
  // }, []);

  const submitSale = async (printType = null) => {
  if (cart.length === 0) return;

  try {
    // Создаём продажу
    // const { data } = await API.post('/fcshop/sale', { items: cart });
     const payload = {
       items: cart.map(x => ({
         product_id: x.product_id,
         color: x.color,
         size: x.size,
         qty: x.qty,
         price: x.price,              // базовая (до скидки)
         discount_pct: x.discountPct  // % скидки
       }))
     };
     const { data } = await API.post('/fcshop/sale', payload);
    const { saleId, total } = data; 

    alert(`Продажа оформлена! №${saleId}`);

    // Если нужно печатать
    if (printType) {
      await doPrint(printType, { cart, total, saleId });
    }

    // Сброс
    setCart([]);
    setProduct(null);
    setCode('');
  } catch (e) {
    console.error(e);
    alert('Не удалось оформить продажу (проверь остатки).');
  }
};


 const mapCartForPrint = (cart) =>
  cart.map(i => ({ name: i.name, color: i.color, size: i.size, quantity: i.qty, price: i.price }));

const getOurDetails = async () => {
  try {
    const r = await API.get('/fcshop/company-details', { params: { type: 'our' } });
    return r.data?.[0] || {};
  } catch { return {}; }
};
const getClientDetails = async () => {
  try {
    const r = await API.get('/fcshop/company-details', { params: { type: 'client' } });
    return r.data?.[0] || null;
  } catch { return null; }
};

const handlePrintReceipt = async () => {
  const company = await getOurDetails();
  const items = mapCartForPrint(cart);
//   await printReceipt({ company, items, vatRate: 21 });
};

const handlePrintInvoice = async () => {
  const company = await getOurDetails();
  const client  = await getClientDetails();
  const items = mapCartForPrint(cart);
//   await printReceipt({ company, client, items, vatRate: 21 });
};



  return (
    <div className="pos-container">
      <h2>🧾 Продажи (POS)</h2>

      <div className="pos-lookup">
        <input
          placeholder="Штрихкод или Артикул"
          value={code}
          onChange={e => setCode(e.target.value)}
          onKeyDown={e => (e.key === 'Enter') && lookup()}
        />
        <button onClick={() => lookup()} disabled={loading}>
          {loading ? 'Поиск...' : 'Найти'}
        </button>
        {/* Камера (включишь при желании)
        <div id="qr-cam" ref={videoRef} style={{ width: 280, height: 280 }} /> */}
      </div>

      {product ? (
        <div className="pos-product">
          <div className="pos-title">{product.name}</div>
          <div className="pos-opts">
            <div>
              <label>Цвет:</label>
              <select value={color} onChange={e => { setColor(e.target.value); setSize(''); }}>
                <option value="">—</option>
                {colors.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label>Размер:</label>
              <select value={size} onChange={e => setSize(e.target.value)} disabled={!color}>
                <option value="">—</option>
                {sizesByColor.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label>Кол-во:</label>
              <input
                type="number"
                min={1}
                max={maxQty || 1}
                value={qty}
                onChange={e => setQty(Math.max(1, Math.min(+e.target.value || 1, maxQty || 1)))}
                disabled={!size}
              />
              {maxQty > 0 && <small> В наличии: {maxQty}</small>}
            </div>

            <div className="pos-price">
              Цена за шт.: <b>{unitPrice} €</b>
            </div>

            <button onClick={addToCart} disabled={!currentStockEntry}>
              Добавить в чек
            </button>
          </div>
        </div>
      ) : (
        <div className="pos-hint">Найди товар по штрихкоду или артикулу. Показаны будут только позиции с остатком &gt; 0.</div>
      )}

      {cart.length > 0 && (
        <div className="pos-cart">
          <h3>Чек</h3>
          <ul>
            {cart.map((i, idx) => (
              <li key={idx} className="pos-line">
                <div>
                  <b>{i.name}</b> — {i.color}/{i.size} × {i.qty}
                </div>
                   <div style={{display:'flex', gap:8, alignItems:'center'}}>
                     {i.price} € /шт
                     <label style={{marginLeft:8}}>Скидка %:</label>
                     <input
                       type="number" step="0.01" min="0" style={{width:70}}
                       value={i.discountPct}
                       onChange={e => {
                         const d = Math.max(0, +e.target.value || 0);
                         setCart(prev => prev.map((row, j) => {
                           if (j !== idx) return row;
                           const min = Number(product?.min_price || 0);
                           const effUnit = row.price * (1 - d/100);
                           // не ниже min_price
                           let safeD = d;
                           if (min > 0 && effUnit < min) {
                             safeD = Math.max(0, (1 - min/row.price) * 100);
                           }
                           const unitFinal = row.price * (1 - safeD/100);
                           return {
                             ...row,
                             discountPct: +safeD.toFixed(2),
                             subtotal: unitFinal * row.qty
                           };
                         }));
                       }}
                     />
                     <span>
                       → <b>{(i.price * (1 - i.discountPct/100)).toFixed(2)} €</b> /шт ·
                       <b> {i.subtotal.toFixed(2)} €</b>
                     </span>
                     {Number(product?.min_price || 0) > 0 && (
                       <small style={{opacity:.7}}>
                         (мин.: {Number(product.min_price).toFixed(2)} €)
                       </small>
                     )}
                   </div>
                <button onClick={() => removeItem(idx)}>✖</button>
              </li>
            ))}
          </ul>
          <div className="pos-total">
            Итого: <b>{grandTotal.toFixed(2)} €</b>
          </div>
          <button className="pos-submit" onClick={submitSale}>Оформить продажу</button>
        </div>
      )}
      <div className="print-buttons">
        <button className="pos-submit" onClick={() => submitSale('receipt')}>
            Оформить и печатать чек
        </button>
        <button onClick={() => submitSale('invoice')}>
            Оформить и печатать накладную
        </button>
    </div>


    </div>
  );
}
