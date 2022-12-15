import React, { Component } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AXIOS } from "../../app/axios-http";
import { FaTrash } from "react-icons/fa";
import "./Product.css";

export default class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRequesting: false,
      productEditing: {
        name: "",
        price: "",
        description: "",
      },
      products: [],
    };
  }

  componentDidMount() {
    this.handleFetchAll();
  }

  handleFetchAll = () => {
    AXIOS.get("/public/product/all")
      .then((res) => {
        this.setState({ products: res.data });
      })
      .catch((e) => {
        toast.error(
          "Could not post product to db. Error code:" +
            e.response.data.status +
            ". See console log for further details."
        );
      });
  };

  handleFormProduct = (key, value) => {
    this.setState({
      productEditing: { ...this.state.productEditing, [key]: value },
    });
  };

  handlePostProduct = (e) => {
    e.preventDefault();
    this.setState({ isRequesting: true });
    AXIOS.post("/public/product/create", {
      ...this.state.productEditing,
      price: parseInt(this.state.productEditing.price),
    })
      .then((res) => {
        this.handleFetchAll();
        toast.success("Product has been saved to db.");
      })
      .catch((e) => {
        console.log("ERROR POSTING: " + JSON.stringify(e.response.data.detail));
        toast.error(
          "Could not post product to db. Error code:" +
            e.response.data.status +
            ". See console log for further details."
        );
      })
      .finally(() => this.setState({ isRequesting: false }));
  };

  handleDeleteProduct = (e, id) => {
    e.preventDefault();
    AXIOS.delete("/public/product/remove/" + id, this.state.productEditing)
      .then((res) => {
        this.handleFetchAll();
        toast.warning("Product has been deleted.");
      })
      .catch((e) => {
        console.log(
          "ERROR DELETING: " + JSON.stringify(e.response.data.detail)
        );
        toast.error(
          "Could not delete product in db. Error code:" +
            e.response.data.status +
            ". See console log for further details."
        );
      });
  };

  render() {
    return (
      <div className="">
        <div className="row justify-center align-content-center">
          <div className="col">
            <h2>Test Backend</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-sm">
            <h2>Create a product</h2>
            <form className="p-3 shadow rounded">
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputName">Name</label>
                  <input
                    onChange={(e) =>
                      this.handleFormProduct("name", e.target.value)
                    }
                    value={this.state.productEditing.name}
                    type="text"
                    className="form-control"
                    id="inputName"
                    placeholder="Name"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputPrice">Price</label>
                  <input
                    onChange={(e) =>
                      this.handleFormProduct("price", e.target.value)
                    }
                    value={this.state.productEditing.price}
                    type="text"
                    className="form-control"
                    id="inputPrice"
                    placeholder="Price"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="inputDescription">Description</label>
                <textarea
                  onChange={(e) =>
                    this.handleFormProduct("description", e.target.value)
                  }
                  value={this.state.productEditing.description}
                  type="text"
                  className="form-control"
                  id="inputDescription"
                  placeholder="Description"
                />
              </div>
              {this.state.isRequesting ? (
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <button
                  type="submit"
                  className="btn btn-primary btn-sm"
                  onClick={(e) => this.handlePostProduct(e)}
                >
                  Submit
                </button>
              )}
            </form>
          </div>
          <div className="col-sm">
            <h2>Product's list</h2>
            <div className="container">
              <table className="table table-striped table-sm">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Description</th>
                    <th scope="col">Del</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.products.map((prod, index) => (
                    <tr key={index}>
                      <th scope="row">{prod.id}</th>
                      <td>{prod.name}</td>
                      <td>{prod.price}</td>
                      <td>{prod.description}</td>
                      <td>
                        {" "}
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={(e) => this.handleDeleteProduct(e, prod.id)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
