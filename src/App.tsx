import { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import LayoutWebsite from './components/Layouts/LayoutWebsite'
import ProductPage from './pages/ProductPage'
import ProductDetail from './pages/ProductDetail'
import LayoutAdmin from './components/Layouts/LayoutAdmin'
import ProductAdmin from './pages/ProductAdmin'
import ProductAdd from './pages/ProductAdd'
import ProductEdit from './pages/ProductEdit'
import { TProduct } from './interfaces/TProducts'
import { createProduct, getProducts, removeProduct, updateProduct } from './services/product'
import "./App.scss";
import Register from './pages/Register'
import Login from './pages/Login'
import Notfound from './pages/Notfound'

function App() {
 const navigate = useNavigate();
 const [products, setProducts] = useState<TProduct[]>([]);
 useEffect(()=>{
   (async()=>{
    const data = await getProducts();
    setProducts(data);
   })();
 },[]);

 const onRemove = async (id:number | undefined) =>{
  try {
    const confirm = window.confirm("Are you delete?");
    if(confirm){
      await removeProduct(`${id}`);
      setProducts(products.filter((item)=> item.id !== id));
    }
  } catch (error) {
    
  }
 };
 const onhandleAdd = async (product:TProduct) =>{
  try {
     const data = await createProduct(product);
     setProducts([...products,data]);
     navigate('admin');
  } catch (error) {
    
  }
 };
 const onhandleEdit = async ( product: TProduct) =>{
  try {
    const data = await updateProduct(product);
    setProducts(products.map((i) => (i.id === data.id ? data : i)));
    navigate("admin");
  } catch (error) {
    
  }
 }

  return (
    <>
    <Routes>
      <Route path='/' element={<LayoutWebsite/>}>
        <Route index element={<ProductPage products={products}/>}/>
        <Route path='/products/:id' element={<ProductDetail/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='*' element={<Notfound/>}/>
      </Route>

      <Route path='admin' element={<LayoutAdmin/>}>
        <Route index element={<ProductAdmin products={products} onDel={onRemove} />}/>
        <Route path='products/add' element={<ProductAdd onAdd={onhandleAdd}/>}/>
        <Route path='products/edit/:id' element={<ProductEdit onEdit={onhandleEdit}/>}/>
      </Route>
    </Routes>
    </>
  )
}

export default App
