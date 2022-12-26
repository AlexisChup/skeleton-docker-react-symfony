import React, { Component } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AXIOS } from "../../app/axios-http";
import { FaTrash } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import "./Product.css";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
      <Container>
        <Row className="justify-center align-content-center">
          <Col>
            <h2>Test Backend</h2>
          </Col>
        </Row>
        <Row>
          <Col sm>
            <h2>Create a product</h2>
            <Form.Group className="p-3 shadow rounded">
              <Row>
                <Col className="p-0 mr-1">
                  <Form.Label htmlFor="inputName">Name</Form.Label>
                  <Form.Control
                    onChange={(e) =>
                      this.handleFormProduct("name", e.target.value)
                    }
                    value={this.state.productEditing.name}
                    type="text"
                    className="form-control"
                    id="inputName"
                    placeholder="Name"
                  />
                </Col>
                <Col className="p-0 ml-1">
                  <Form.Label htmlFor="inputPrice">Price</Form.Label>
                  <Form.Control
                    onChange={(e) =>
                      this.handleFormProduct("price", e.target.value)
                    }
                    value={this.state.productEditing.price}
                    type="text"
                    className="form-control"
                    id="inputPrice"
                    placeholder="Price"
                  />
                </Col>
              </Row>
              <Row>
                <Form.Label htmlFor="inputDescription">Description</Form.Label>
                <Form.Control
                  onChange={(e) =>
                    this.handleFormProduct("description", e.target.value)
                  }
                  value={this.state.productEditing.description}
                  as="textarea"
                  className="form-control"
                  id="inputDescription"
                  placeholder="Description"
                />
              </Row>
              <Row>
                {this.state.isRequesting ? (
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  <div className="mt-2">
                    <Button
                      type="submit"
                      onClick={(e) => this.handlePostProduct(e)}
                      size="sm"
                    >
                      Submit
                    </Button>
                  </div>
                )}
              </Row>
            </Form.Group>
          </Col>
          <Col>
            <h2>Product's list</h2>
            <div style={{ overflowY: "scroll", maxHeight: "30vh" }}>
              <table className="table table-striped table-sm hover">
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
                        <Button
                          onClick={(e) => this.handleDeleteProduct(e, prod.id)}
                          size="sm"
                          variant="danger"
                        >
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
