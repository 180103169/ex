import React from "react"
import PropTypes from "prop-types"
import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Table,
    Card,
    CardBody,
    CardSubtitle,
    CardTitle,
    Col,
    Container,
    Form,
    FormGroup,
    Input,
    Label,
    Row,
} from "reactstrap"
import { Link } from "react-router-dom"
import Select from "react-select"
import Dropzone from "react-dropzone"

const AddOfferModal = props => {
    const { isOpen, toggle, selectedFiles, handleAcceptedFiles, addNewOffer, cost, handleCostChange } = props
    const options = [
        { value: "AK", label: "Alaska" },
        { value: "HI", label: "Hawaii" },
        { value: "CA", label: "California" },
        { value: "NV", label: "Nevada" },
        { value: "OR", label: "Oregon" },
        { value: "WA", label: "Washington" },
    ]
    return (
        <Modal
            isOpen={isOpen}
            role="dialog"
            autoFocus={true}
            centered={true}
            className="exampleModal"
            tabIndex="-1"
            toggle={toggle}
        >
            <div className="modal-content">
                <ModalHeader toggle={toggle}>Добавить предложение</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col xs="12">
                            <Card>
                                <CardBody>
                                    <CardSubtitle className="mb-3">
                                        Заполните поля ниже
                                    </CardSubtitle>

                                    <Form >
                                        <Row>
                                            <Col sm="6">
                                                <FormGroup>
                                                    <Label htmlFor="price">Цена за единицу без ндс</Label>
                                                    <Input
                                                      id="price"
                                                      name="price"
                                                      type="number"
                                                      className="form-control"
                                                      value={cost}
                                                      onChange={handleCostChange}
                                                    />
                                                </FormGroup>
                                            </Col>

                                            <Col sm="6">
                                                <FormGroup>
                                                    <Label className="control-label">Поставщик</Label>
                                                    <select className="form-control select2">
                                                        <option>Select</option>
                                                        <option value="AK">Alaska</option>
                                                        <option value="HI">Hawaii</option>
                                                    </select>
                                                </FormGroup>

                                            </Col>
                                        </Row>


                                        <Row>
                                            <Col className="col-12">
                                                <Card>
                                                    <CardBody>
                                                        <CardTitle>Dropzone</CardTitle>
                                                        <CardSubtitle className="mb-3">
                                                            {" "}
                                                            DropzoneJS is an open source library that provides
                                                            drag’n’drop file uploads with image previews.
                                                        </CardSubtitle>
                                                            <Dropzone
                                                              onDrop={acceptedFiles =>
                                                                handleAcceptedFiles(acceptedFiles)
                                                              }
                                                            >
                                                                {({ getRootProps, getInputProps }) => (
                                                                  <div className="dropzone">
                                                                      <div
                                                                        className="dz-message needsclick mt-2"
                                                                        {...getRootProps()}
                                                                      >
                                                                          <input {...getInputProps()} />
                                                                          <div className="mb-3">
                                                                              <i className="display-4 text-muted bx bxs-cloud-upload"/>
                                                                          </div>
                                                                          <h4>Drop files here or click to upload.</h4>
                                                                      </div>
                                                                  </div>
                                                                )}
                                                            </Dropzone>
                                                            <div
                                                              className="dropzone-previews mt-3"
                                                              id="file-previews"
                                                            >
                                                                {selectedFiles.map((f, i) => {
                                                                    return (
                                                                      <Card
                                                                        className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                                                        key={i + "-file"}
                                                                      >
                                                                          <div className="p-2">
                                                                              <Row className="align-items-center">
                                                                                  <Col className="col-auto">
                                                                                      <img
                                                                                        data-dz-thumbnail=""
                                                                                        height="80"
                                                                                        className="avatar-sm rounded bg-light"
                                                                                        alt={f.name}
                                                                                        src={f.preview}
                                                                                      />
                                                                                  </Col>
                                                                                  <Col>
                                                                                      <Link
                                                                                        to="#"
                                                                                        className="text-muted font-weight-bold"
                                                                                      >
                                                                                          {f.name}
                                                                                      </Link>
                                                                                      <p className="mb-0">
                                                                                          <strong>{f.formattedSize}</strong>
                                                                                      </p>
                                                                                  </Col>
                                                                              </Row>
                                                                          </div>
                                                                      </Card>
                                                                    )
                                                                })}
                                                            </div>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                        </Row>

                                        <Button
                                          color="primary"
                                          className="mr-1 waves-effect waves-light"
                                          onClick={addNewOffer}

                                        >
                                            Save Changes
                                        </Button>
                                        <Button
                                          color="secondary"
                                          className="waves-effect"
                                          onClick={toggle}
                                        >
                                            Cancel
                                        </Button>
                                    </Form>
                                </CardBody>
                            </Card>


                        </Col>
                    </Row>

                </ModalBody>
                <ModalFooter>

                </ModalFooter>
            </div>
        </Modal>
    )
}

AddOfferModal.propTypes = {
    toggle: PropTypes.func,
    handleAcceptedFiles: PropTypes.func,
    addNewOffer: PropTypes.func,
    isOpen: PropTypes.bool,
    selectedFiles: PropTypes.array,
    cost: PropTypes.number,
    handleCostChange: PropTypes.func
}

export default AddOfferModal
