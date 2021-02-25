import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { isEmpty, size } from "lodash"
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory, {
    PaginationProvider,
    PaginationListStandalone,
} from "react-bootstrap-table2-paginator"
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"

import { Button, Card, CardBody, Col, Container, Row } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import { getOfferRejected, getOrders } from "store/actions"
import RejectedColumns from "./RejectedColumns"
import RejectedModal from "./RejectedModal";


class Rejected extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            offers: [],
        }
    }

    componentDidMount() {
        const { offers, onGetRejectedOffers } = this.props
        onGetRejectedOffers()
        this.setState({ offers })
    }

    // eslint-disable-next-line no-unused-vars
    componentDidUpdate(prevProps, prevState, snapshot) {
        const { offers } = this.props
        if (!isEmpty(offers) && size(prevProps.offers) !== size(offers)) {
            this.setState({ offers })
        }
    }

    // eslint-disable-next-line no-unused-vars
    handleTableChange = (type, { page, searchText }) => {
        const { offers } = this.props
        this.setState({
            offers: offers.filter(order =>
                Object.keys(order).some(
                    key =>
                        typeof order[key] === "string" &&
                        order[key].toLowerCase().includes(searchText.toLowerCase())
                )
            ),
        })
    }

    toggleModal = () => {
        this.setState(prevState => ({
            modal: !prevState.modal,
        }))
    }

    render() {
        const { offers } = this.state
        const pageOptions = {
            sizePerPage: 10,
            totalSize: size(offers), // replace later with size(offers),
            custom: true,
        }
        const { SearchBar } = Search

        console.log('before console rejectedoffers')
        console.log(offers);
        return (
            <React.Fragment>
                <RejectedModal
                    isOpen={this.state.modal}
                    toggle={this.toggleModal}
                />
                <div className="page-content">
                    <Container fluid>
                        <Breadcrumbs title="Мои предложения" breadcrumbItem="Отказано" />
                        <Row>
                            <Col xs="12">
                                <Card>
                                    <CardBody>
                                        <PaginationProvider
                                            pagination={paginationFactory(pageOptions)}
                                        >
                                            {({ paginationProps, paginationTableProps }) => (
                                                <ToolkitProvider
                                                    keyField="id"
                                                    data={offers || []}
                                                    columns={RejectedColumns(this.toggleModal)}
                                                    bootstrap4
                                                    search
                                                >
                                                    {toolkitProps => (
                                                        <React.Fragment>
                                                            <Row className="mb-2">
                                                                <Col sm="4">
                                                                    <div className="search-box mr-2 mb-2 d-inline-block">
                                                                        <div className="position-relative">
                                                                            <SearchBar
                                                                                {...toolkitProps.searchProps}
                                                                            />
                                                                            <i className="bx bx-search-alt search-icon" />
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                                <Col sm="8">
                                                                    <div className="text-sm-right">

                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col xl="12">
                                                                    <div className="table-responsive">
                                                                        <BootstrapTable
                                                                            keyField="id"
                                                                            responsive
                                                                            remote
                                                                            bordered={false}
                                                                            striped={false}
                                                                            classes={
                                                                                "table table-centered table-nowrap"
                                                                            }
                                                                            headerWrapperClasses={"thead-light"}
                                                                            {...toolkitProps.baseProps}
                                                                            onTableChange={this.handleTableChange}
                                                                            {...paginationTableProps}
                                                                        />
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                            <Row className="align-items-md-center mt-30">
                                                                <Col className="pagination pagination-rounded justify-content-end mb-2 inner-custom-pagination">
                                                                    <PaginationListStandalone
                                                                        {...paginationProps}
                                                                    />
                                                                </Col>
                                                            </Row>
                                                        </React.Fragment>
                                                    )}
                                                </ToolkitProvider>
                                            )}
                                        </PaginationProvider>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
        )
    }
}

Rejected.propTypes = {
    offers: PropTypes.any,
    onGetRejectedOffers: PropTypes.func,
}

const mapStateToProps = ({ offers }) => ({
    offers: offers.offers.data,
})

const mapDispatchToProps = dispatch => ({
    onGetRejectedOffers: () => dispatch(getOfferRejected()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Rejected))
