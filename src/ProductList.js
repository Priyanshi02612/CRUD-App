const ProductList = ({ removeProduct, editProductData, newProducts }) => {
  return (
    <div className="container ">
      <table className="table table-striped table-hover  text-center">
        <thead>
          <tr>
            <th>Sr.No.</th>
            <th>Products</th>
            <th>Quntity</th>
            <th colSpan="2">Action</th>
          </tr>
        </thead>
        <tbody>
          {newProducts.map((product, index) => (
            <tr key={index}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.qnty}</td>
              <td
                className="remove text-danger"
                onClick={() => removeProduct(product.id)}
              >
                Remove
              </td>
              <td
                className="edit text-primary"
                onClick={() => editProductData(product.id)}
              >
                Edit
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
