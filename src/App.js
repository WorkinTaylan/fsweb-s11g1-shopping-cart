import React, {useEffect,useState } from "react";
import { Route } from "react-router-dom";
import { data } from "./data";
import { ProductContext} from "./components/contexts/ProductContext";
import { CartContext} from "./components/contexts/CartContext";


// Bileşenler
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";


function App() {
  const [products, setProducts] = useState(data);
  const [cart, setCart] = useState([]);


  const s11g1LocalStorageKey = "s11g1";


//LİSTEDE İKİ AYNI ID varsa, birini çıkarıp sayfayı yenileyince diğer aynı olan da çıkmış halde geliyor.
  const storedData = JSON.parse(localStorage.getItem(s11g1LocalStorageKey));
  
 useEffect(() => {
    if (storedData) {
      setCart((storedData));
    }
  }, []);


  const addItem = (item) => {
   setCart([...cart,item])
   localStorage.setItem(s11g1LocalStorageKey, JSON.stringify([...cart,item]))// verilen itemi sepete ekleyin
  };


  const removeItem=(item)=>{
    const newCart=cart.filter((cartItem)=> cartItem.id !==item.id);
    setCart(newCart);
    localStorage.setItem(s11g1LocalStorageKey, JSON.stringify(newCart))
  }

 
  return (
    <div className="App"> 
    <ProductContext.Provider value={{addItem, products,}}>
      <CartContext.Provider value={{cart, removeItem}}>
      <Navigation />

      {/* Routelar */}
    
      <main className="content">
        <Route exact path="/">
          <Products/>
        </Route>

        <Route path="/cart">
          <ShoppingCart />
        </Route>
      </main>
      </CartContext.Provider>
      </ProductContext.Provider>
    </div>
  );
}

export default App;
