

import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import ProductList from "src/components/products/ProductList";
import { Product } from "src/interfaces/Product";


interface Props {
  products: Product[];
}

export default function indexPage({ products }: Props) {
  {


  return <> <Navbar/> {products.length === 0 ?<h1>No hay productos</h1> : <ProductList products={products} /> }
  <Footer/>
  </>;
  }
}


export const getServerSideProps = async () => {
  const res = await fetch(`${process.env.API_URL}/api/products`);
  const products = await res.json();

  return {
    props: {
      products: products,
    },
  };
};
