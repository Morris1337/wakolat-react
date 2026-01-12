import React, { useState, useEffect, useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import API from '../../../utils/api';
import DropdownCheckbox from './DropdownCheckbox';
import { useNavigate } from 'react-router-dom';
import './ShopPanel.scss';


export default function ShopPanel() {
  const [form, setForm] = useState({
    name: '',
    price: '',
    cost_price: '',
    vat_rate: 21,
    markup_pct: 0,
    min_price: '',
    article: '',
    barcode: '',
    category: '',
    subcategories: [],
    colors: [],
    available_sizes: [],
    images: [],
    description: ''
  });


   const sizeOptions  = ['none', 'Child', 'Youth', 'Adult', 'Youth S', 'Youth M', 'Youth L', 'XS', 'S', 'S/M', 'M', 'M/L', 'L','L/XL', 'XL', 'XXL', 'XXXL',
    '4oz','6oz','8oz','10oz','12oz','14oz','16oz','250cm', '300cm', '350cm', '450cm',
  ];  
  const colorOptions = ['None', 'Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'BLACK', 'PINK', 'transparent', 
    'purple', 'orange',
    'BLK/BLU', 'BLU/BLK', 'RED/GOLD', 'BLK/RED', 'RED/BLK', 'BLK/GRN', 'BLK/WHT', 'WHT/BLK', 'WHT/TEAL', 'BLK/GRY', 'TEAL', 'Red/Blue',
  ];
    const categories = {
    'Экипировка': ['gloves', 'Leg Guardion', 'Headguard', 'ELBOW GUARD', 'FACE GUARD', 'Wraps', 'Bandaz', 'Mouth Guards',
       'Body Protector & Chestguards',
    ],
    'Одежда': ['Fitness', 'Kikboxing', 'Merchandise'],
    'Спортпит': [],
    'Инвентарь': [] 
  };

  const [imageFiles, setImageFiles] = useState([null]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [stockForm, setStockForm] = useState([]);
  const [articleQuery, setArticleQuery] = useState('');

   const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get('/fcshop/products-with-stock');
      setProducts(res.data);
    } catch (err) {
      console.error('Ошибка загрузки товаров:', err);
    }
  };

  const parseNum = (v, def = 0) => {
  if (v === '' || v == null) return def;
  const n = Number(String(v).replace(',', '.'));
  return Number.isFinite(n) ? n : def;
};

const calcFinal = (cost, vat, markup) => {
  const c = parseNum(cost, 0), v = parseNum(vat, 21), m = parseNum(markup, 0);
  return +(c * (1 + m/100) * (1 + v/100)).toFixed(2);
};

const calcMarkupFromFinal = (cost, vat, finalPrice) => {
  const c = parseNum(cost, 0), v = parseNum(vat, 21), F = parseNum(finalPrice, 0);
  if (c <= 0) return 0; // без закупки наценку корректно не посчитать
  const m = (F / (c * (1 + v/100)) - 1) * 100;
  return +m.toFixed(2);
};




  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setForm(prev => ({
      ...prev,
      category,
      subcategories: [],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', form.name);
    // formData.append('price', form.price);
    formData.append('price', calcFinal(form.cost_price, form.vat_rate, form.markup_pct));
    formData.append('cost_price', form.cost_price);
    formData.append('vat_rate', form.vat_rate);
    formData.append('markup_pct', form.markup_pct);
    formData.append('min_price', form.min_price);
    formData.append('article', form.article);
    formData.append('barcode', form.barcode);
    formData.append('category', form.category);
    formData.append('description', form.description || '');
    form.subcategories.forEach(sub => formData.append('subcategories', sub));
    form.colors.forEach(color => formData.append('colors', color));
    form.available_sizes.forEach(size => formData.append('available_sizes', size));
    Array.from(form.images).forEach(img => formData.append('images', img));
    imageFiles.filter(Boolean).forEach(file => formData.append('images', file));

    try {
      await API.post('/fcshop/create-product', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Товар создан!');
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert('Ошибка при создании товара');
    }
  };

  const handleImageChange = (index, file) => {
    const newImages = [...imageFiles];
    newImages[index] = file;
    if (index === imageFiles.length - 1 && file) {
      newImages.push(null);
    }
    setImageFiles(newImages);
  };

  const handleSelectProduct = (productId) => {
    const product = products.find(p => p.id === parseInt(productId));
    setSelectedProduct(product);
    setSelectedColor('');
    setStockForm([]);

    const cp = product?.cost_price ?? '';
    const vr = product?.vat_rate ?? 21;
    const mp = product?.markup_pct ?? 0;
    const mnp = product?.min_price ?? '';

    setPricing({
      cost_price: cp,
      vat_rate: vr,
      markup_pct: mp,
      computed: calcFinal(cp, vr, mp) || Number(product?.price || 0),
      min_price: mnp,
    });
  };


  const handleColorStockSelect = (color) => {
    setSelectedColor(color);
    const stockItems = (selectedProduct.stock || []).filter(s => s.color === color);
    const sizes =
      (selectedProduct.available_sizes && selectedProduct.available_sizes.length > 0)
        ? selectedProduct.available_sizes
        : ['']; // безразмерный товар

    const stockMap = new Map(stockItems.map(s => [s.size, s]));

    // было: price: stockMap.get(size)?.price || selectedProduct.price || 0
    const toNumber = (v) => {
      if (v === null || v === undefined || v === '') return null;
      if (typeof v === 'number') return v;
      return Number(String(v).replace(',', '.'));
    };

    const basePrice = toNumber(selectedProduct?.price) ?? 0;

    const formArray = sizes.map(size => ({
         size,
        quantity: Number(stockMap.get(size)?.quantity ?? 0)
        }));
      // const s = stockMap.get(size);
      // const stockPrice = toNumber(s?.price);
    //   return {
    //     size,
    //     quantity: Number(s?.quantity ?? 0),
    //     // если в stock цена пустая или 0 → используем базовую
    //     price: (stockPrice && stockPrice > 0) ? stockPrice : basePrice
    //   };
    // });

    setStockForm(formArray);

  };

  const handleStockChange = (idx, field, value) => {
    const toNumOrNull = (v) => {
      if (v === '' || v == null) return null;
      const n = Number(v);
      return Number.isFinite(n) ? n : null;
    };

    const updated = [...stockForm];
    if (field === 'quantity') {
      updated[idx][field] = toNumOrNull(value) ?? 0; // пусто -> 0
    // } else if (field === 'price') {
    //   updated[idx][field] = toNumOrNull(value);     // пусто -> null (пусть бэк возьмёт products.price)
    }
    setStockForm(updated);
  };


  const handleUpdateStock = async () => {
    try {
      await API.put('/fcshop/update-stock', {
        product_id: selectedProduct.id,
        color: selectedColor,
        stock: stockForm
      });
      alert('Остатки обновлены!');
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert('Ошибка обновления');
    }
  };

    const isNutrition = form.category === 'Спортпит';
    const [flavorInput, setFlavorInput] = useState('');
    const [pricing, setPricing] = useState({
  cost_price: '', vat_rate: 21, markup_pct: 0, computed: 0
});


    const addFlavor = () => {
      const v = flavorInput.trim();
      if (!v) return;
      setForm(prev => ({ ...prev, colors: [...new Set([...(prev.colors || []), v])] }));
      setFlavorInput('');
    };

    const removeFlavor = (idx) => {
      setForm(prev => ({
        ...prev,
        colors: prev.colors.filter((_, i) => i !== idx)
      }));
    };

  const filteredProducts = useMemo(() => {
    const q = articleQuery.trim().toLowerCase();
    if (!q) return products;
    return products.filter(p =>
      String(p.article || '').toLowerCase().includes(q) ||
      String(p.name || '').toLowerCase().includes(q)
    );
  }, [products, articleQuery]);

  

  return (
    <div className="shop-panel-container">
      <button className="fc-pos-btn" onClick={() => navigate('/account/shopPanel/pos')}>
          🧾 Продажи (POS)
      </button>
      <h2>🛠 Админ-панель магазина</h2>
      <form onSubmit={handleSubmit} className='shop-panel-form'>
        <input name="name" placeholder="Название" onChange={handleChange} />
        {/* <input name="price" placeholder="Цена" step="0.01" type="number" onChange={handleChange} /> */}
        <div className="pricing-create">
          <label>Закупочная (€)</label>
          <input name="cost_price" type="number" step="0.01"
                value={form.cost_price} onChange={handleChange} />

          <label>НДС (%)</label>
          <input name="vat_rate" type="number" step="0.01"
                value={form.vat_rate} onChange={handleChange} />

          <label>Наценка (%)</label>
          <input name="markup_pct" type="number" step="0.01"
                value={form.markup_pct} onChange={handleChange} />
          <label>Минимальная цена (€)</label>
            <input
              name="min_price"
              type="number"
              step="0.01"
              value={form.min_price || ''}
              onChange={handleChange}
            />
            <small style={{opacity:.75}}>
              Наценка при минимальной: <b>
                {calcMarkupFromFinal(form.cost_price, form.vat_rate, form.min_price).toFixed(2)} %
              </b>
            </small>



          <label>Итоговая цена (€)</label>
          <input
            type="number" step="0.01"
            value={calcFinal(form.cost_price, form.vat_rate, form.markup_pct)}
            onChange={(e) => {
              const desired = e.target.value;
              const newMarkup = calcMarkupFromFinal(form.cost_price, form.vat_rate, desired);
              setForm(prev => ({ ...prev, markup_pct: newMarkup }));
            }}
 />
        </div>

        <input name="article" placeholder="Артикул" onChange={handleChange} />
        <input name="barcode" placeholder="Штрихкод" onChange={handleChange} />

        {imageFiles.map((file, index) => (
          <div key={index}>
            <input type="file" onChange={e => handleImageChange(index, e.target.files[0])} />
            {file && <span>{file.name}</span>}
          </div>
        ))}

        <label>Категория:</label>
        <select value={form.category} onChange={handleCategoryChange}>
          <option value="">-- Выберите категорию --</option>
          {Object.keys(categories).map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {categories[form.category]?.length > 0 && (
          <DropdownCheckbox
            label="Подкатегории"
            options={categories[form.category]}
            selected={form.subcategories}
            onChange={(val) => setForm(prev => ({ ...prev, subcategories: val }))}
          />
        )}

        <label>Описание:</label>
          <div className="editor-wrap">
            <ReactQuill
              theme="snow"
              value={form.description}
              onChange={(html) => setForm(prev => ({ ...prev, description: html }))} // сохраняем HTML
              modules={{
                toolbar: [
                  [{ font: [] }],                     // выбор шрифта
                  [{ size: ['small', false, 'large', 'huge'] }],  // размеры
                  ['bold', 'italic', 'underline', 'strike'],
                  [{ color: [] }, { background: [] }],
                  [{ script: 'sub' }, { script: 'super' }],
                  [{ header: 1 }, { header: 2 }],
                  [{ align: [] }],
                  [{ list: 'ordered' }, { list: 'bullet' }],
                  ['blockquote', 'code-block'],
                  ['clean']                           // очистить форматирование
                ]
              }}
              formats={[
                'font','size','bold','italic','underline','strike',
                'color','background','script','header','align',
                'list','bullet','blockquote','code-block'
              ]}
              placeholder="Оформите описание: заголовки, списки, выделение..."
            />
          </div>


        {!isNutrition && (
          <DropdownCheckbox
            label='Цвета'
            options={colorOptions}
            selected={form.colors}
            onChange={(val) => setForm(prev => ({ ...prev, colors: val }))}
          />
        )}
        {isNutrition && (
          <div className="flavors-free-input">
            <label>Добавить вкус:</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                placeholder="Впишите вкус и нажмите + или Enter"
                value={flavorInput}
                onChange={e => setFlavorInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addFlavor();
                  }
                }}
              />
              <button type="button" onClick={addFlavor}>+</button>
            </div>

            {Array.isArray(form.colors) && form.colors.length > 0 && (
              <div style={{ marginTop: 8, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {form.colors.map((c, idx) => (
                  <span key={idx} style={{
                    background: '#eee',
                    borderRadius: 12,
                    padding: '4px 10px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6
                  }}>
                    {c}
                    <button
                      type="button"
                      onClick={() => removeFlavor(idx)}
                      style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
                      title="Удалить"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
        <DropdownCheckbox
          label="Размеры"
          options={sizeOptions}
          selected={form.available_sizes}
          onChange={(val) => setForm(prev => ({ ...prev, available_sizes: val }))}
        />

        <button type="submit">Создать</button>
      </form>

      <hr />
      <h3>Редактировать товар</h3>
      <div style={{display:'flex', gap:8, alignItems:'center', marginBottom:8}}>
  <input
    placeholder="Поиск по артикулу…"
    value={articleQuery}
    onChange={e => setArticleQuery(e.target.value)}
    onKeyDown={e => {
      if (e.key === 'Enter' && filteredProducts.length === 1) {
        handleSelectProduct(String(filteredProducts[0].id));
      }
    }}
    style={{maxWidth:260}}
  />
  {!!articleQuery && (
    <button type="button" onClick={() => setArticleQuery('')}>✕</button>
  )}
  <small style={{opacity:.7}}>
    Найдено: {filteredProducts.length}/{products.length}
  </small>
</div>

<select onChange={e => handleSelectProduct(e.target.value)}>
  <option value="">-- Выберите товар --</option>
  {filteredProducts.map(p => (
    <option key={p.id} value={p.id}>
      {p.article ? `[${p.article}] ` : ''}{p.name}
    </option>
  ))}
</select>

      {selectedProduct && (
        <>
          <label>Выберите цвет для редактирования:</label>
          <select value={selectedColor} onChange={e => handleColorStockSelect(e.target.value)}>
            <option value="">-- Выберите цвет --</option>
            {(selectedProduct.colors || colorOptions).map((c, idx) => (
              <option key={idx} value={c}>{c}</option>
            ))}
          </select>
        </>
      )}
{selectedProduct && (
  <div className="pricing-edit" style={{marginTop:12, padding:10, border:'1px solid #ccc', borderRadius:8}}>
    <h4>Цена товара</h4>
    <div style={{display:'grid', gridTemplateColumns:'160px 1fr 160px 1fr', gap:8}}>
      <label>Закупочная (€)</label>
      <input type="number" step="0.01"
        value={pricing.cost_price}
        onChange={e=>{
          const v=e.target.value; setPricing(p=>({...p, cost_price:v, computed:calcFinal(v,p.vat_rate,p.markup_pct)}));
        }}
      />
      <label>НДС (%)</label>
      <input type="number" step="0.01"
        value={pricing.vat_rate}
        onChange={e=>{
          const v=e.target.value; setPricing(p=>({...p, vat_rate:v, computed:calcFinal(p.cost_price,v,p.markup_pct)}));
        }}
      />
      <label>Наценка (%)</label>
      <input type="number" step="0.01"
        value={pricing.markup_pct}
        onChange={e=>{
          const v=e.target.value; setPricing(p=>({...p, markup_pct:v, computed:calcFinal(p.cost_price,p.vat_rate,v)}));
        }}
      />
    </div>
    <div style={{display:'grid', gridTemplateColumns:'160px 1fr', gap:8, marginTop:8}}>
      <label>Минимальная цена (€)</label>
      <div style={{display:'flex', gap:8, alignItems:'center'}}>
        <input
          type="number" step="0.01"
          value={pricing.min_price ?? ''}
          onChange={e => setPricing(p => ({ ...p, min_price: e.target.value }))}
        />
        <small style={{opacity:.75}}>
          Наценка при мин.: <b>
            {calcMarkupFromFinal(pricing.cost_price, pricing.vat_rate, pricing.min_price).toFixed(2)} %
          </b>
        </small>
      </div>
    </div>


   <div style={{ display:'grid', gridTemplateColumns:'160px 1fr', gap:8, marginTop:8 }}>
   <label>Итоговая цена (€)</label>
   <input
     type="number" step="0.01"
     value={Number(pricing.computed).toFixed(2)}
     onChange={(e) => {
       const desired = e.target.value;
       const newMarkup = calcMarkupFromFinal(pricing.cost_price, pricing.vat_rate, desired);
       setPricing(p => ({
         ...p,
         markup_pct: newMarkup,
         computed: parseNum(desired, 0),
       }));
     }}
   />
 </div>

    <div style={{display:'flex', gap:8, marginTop:8}}>
      <button type="button" onClick={async ()=>{
        // сохранить в products и (если надо) обновить пустые/нулевые цены в stock
        await API.put(`/fcshop/products/${selectedProduct.id}/pricing`, {
          cost_price: pricing.cost_price,
          vat_rate: pricing.vat_rate,
          markup_pct: pricing.markup_pct,
          min_price: pricing.min_price
          // apply_to_stock: true
        });
        alert('Базовая цена обновлена');
        fetchProducts();
      }}>💾 Сохранить базовую и обновить пустые цены</button>

      {!!selectedColor && (
        <button type="button" onClick={()=>{
          // применить новую цену к строкам текущего цвета в форме (не трогая количества)
          setStockForm(rows => rows.map(r => ({ ...r, price: Number(pricing.computed) })));
        }}>
          ⇢ Применить цену ко всем размерам цвета
        </button>
      )}
    </div>
  </div>
)}
      {selectedColor && (
        <div>
          <h4>Остатки ({selectedColor})</h4>
          {stockForm.map((entry, idx) => (
            <div key={idx}>
              <strong>{entry.size}</strong>:
              <input
                type="number"
                value={entry.quantity}
                onChange={e => handleStockChange(idx, 'quantity', parseInt(e.target.value))}
              />
              {/* <input
                type="number"
                value={entry.price}
                onChange={e => handleStockChange(idx, 'price', parseFloat(e.target.value))}
              /> € */}
            </div>
          ))}
          <button onClick={handleUpdateStock}>💾 Сохранить изменения</button>
        </div>
      )}
    </div>
  );
}
