import React from "react"
import PropTypes from "prop-types"
import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Table,
} from "reactstrap"

const AcceptedModal = props => {
    const { isOpen, toggle } = props
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
                    <p className="mb-2">
                        Product id: <span className="text-primary">#SK2540</span>
                    </p>
                    <p className="mb-4">
                        Name: <span className="text-primary">Neal Matthews</span>
                    </p>

                    <div className="table-responsive">
                        <Table className="table table-centered table-nowrap">
                            <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Cotegory</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th scope="row">

                                </th>
                                <td>
                                    <div>
                                        <h5 className="text-truncate font-size-14">

                                        </h5>
                                        <p className="text-muted mb-0"></p>
                                    </div>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <th scope="row">

                                </th>
                                <td>
                                    <div>
                                        <h5 className="text-truncate font-size-14">

                                        </h5>
                                        <p className="text-muted mb-0"></p>
                                    </div>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <h6 className="m-0 text-right"></h6>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <h6 className="m-0 text-right"></h6>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <h6 className="m-0 text-right"></h6>
                                </td>
                                <td></td>
                            </tr>
                            </tbody>
                        </Table>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button type="button" color="secondary" onClick={toggle}>
                        Close
                    </Button>
                </ModalFooter>
            </div>
        </Modal>
    )
}

AcceptedModal.propTypes = {
    toggle: PropTypes.func,
    isOpen: PropTypes.bool,
}

export default AcceptedModal
