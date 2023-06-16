import FooterAdmin from "@/components/footer/FooterAdmin";
import NavbarAdmin from "@/components/navbar/NavbarAdmin";
import TableProducts from "@/components/tableAdmin/TableProducts";
import { Product } from "@/interfaces/Product";

interface Props {
  products: Product[];
}

export default function Dashboard({ products }: Props) {
  
 
  {


    return <> <NavbarAdmin/> {products.length === 0 ? <h1>No hay productos</h1> : <TableProducts products={products} /> }
    <FooterAdmin/>
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