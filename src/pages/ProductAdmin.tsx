import { Link } from "react-router-dom";
import { TProduct } from "../interfaces/TProducts";

type Props = {
  products: TProduct[];
  onDel: (id: number | undefined) => void;
};

const ProductAdmin = ({ products, onDel }: Props) => {
  const handleDelete = (id: number | undefined) => {
    onDel(id);
  };
  return (
    <div>
      <h1>Hello, admin</h1>
      <Link to="products/add" className="btn btn-primary">
        Add new product
      </Link>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Img</th>
            <th>Price</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((i) => (
            <tr key={i.id}>
              <td>{i.id}</td>
              <td>{i.title}</td>
              <td>
                <img src={i.thumbnail} width={100} alt="" />
              </td>
              <td>{i.price}</td>
              <td>{i.description}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(Number(i.id))}
                >
                  Delete
                </button>
                <Link to={`products/edit/${i.id}`} className="btn btn-primary">
                  Update
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductAdmin;
