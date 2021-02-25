import React, { Component } from "react"
import PropTypes from "prop-types"
import { Link, withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { isEmpty, size } from "lodash"
import {
    Button,
    Card,
    CardBody,
    CardSubtitle,
    CardTitle,
    Col,
    Container,
    Form,
    Row,
} from "reactstrap"
import Dropzone from "react-dropzone"


//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

import { getPurchaseDetail } from "store/purchases/actions"
import PurchaseDetail from "./purchaseDetail"
import paginationFactory, { PaginationListStandalone, PaginationProvider } from "react-bootstrap-table2-paginator"
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import AcceptedColumns from "../Offers/Accepted/AcceptedColumns"
import BootstrapTable from "react-bootstrap-table-next"
import { getOffersByPurchase, postUploadFile, uploadFile } from "../../store/offers/actions"
import AddOfferModal from "./AddOfferModal"
import DetailsColumns from "./DetailsColumns"
class Details extends Component {
    constructor(props) {
        super(props)
        this.handleAcceptedFiles = this.handleAcceptedFiles.bind(this)
        this.addNewOffer = this.addNewOffer.bind(this)

        this.state = {
            modal: false,
            selectedFiles: [],
            cost: 0

        }
    }
    componentDidMount() {

        const {
            match: { params },
            onGetPurchaseDetail,
        } = this.props
        onGetPurchaseDetail(params.id)

    }
   // eslint-disable-next-line no-unused-vars
    componentDidUpdate(prevProps, prevState, snapshot) {
        const { offersList } = this.props
        if (!isEmpty(offersList) && size(prevProps.offersList) !== size(offersList)) {
            this.setState({ offersList })
        }
    }

    //eslint-disable-next-line no-unused-vars
    handleTableChange = (type, { page, searchText }) => {
        const { offersList } = this.props
        this.setState({
            offersList: offersList.filter(order =>
              Object.keys(order).some(
                key =>
                  typeof order[key] === "string" &&
                  order[key].toLowerCase().includes(searchText.toLowerCase())
              )
            ),
        })
    }
    handleCostChange = (e) => {
        this.setState({ cost: e.target.value });
    };

    toggleModal = () => {
        this.setState(prevState => ({
            modal: !prevState.modal,
        }))
    }
    handleAcceptedFiles = files => {
        files.map(file =>
          Object.assign(file, {
              preview: URL.createObjectURL(file),
              formattedSize: this.formatBytes(file.size),
          })
        )

        this.setState({ selectedFiles: files })
    }

    formatBytes = (bytes, decimals = 2) => {
        if (bytes === 0) return "0 Bytes"
        const k = 1024
        const dm = decimals < 0 ? 0 : decimals
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
    }
     addNewOffer(){
        console.log('in add new offer')
       console.log(this.state.selectedFiles);
       console.log(this.state.cost);
       this.props.uploadFile(this.state.selectedFiles);
     }

    render() {
        const { purchaseDetail, offersList } = this.props
        const pageOptions = {
            sizePerPage: 5,
            totalSize: size(offersList), // replace later with size(offersList),
            custom: true,
        }
        const { SearchBar } = Search

        console.log(offersList);
        return (
          <React.Fragment>

              <div className="page-content">

                  <AddOfferModal
                    isOpen={this.state.modal}
                    toggle={this.toggleModal}
                    handleAcceptedFiles={this.handleAcceptedFiles}
                    selectedFiles={this.state.selectedFiles}
                    cost={this.state.cost}
                    handleCostChange={this.handleCostChange}
                    addNewOffer={this.addNewOffer}
                  />                <div className="page-content">

              <Container fluid>
                      {/* Render Breadcrumbs */}
                      <Breadcrumbs title="Purchases" breadcrumbItem="Purchase Overview" />

                      {!isEmpty(purchaseDetail) && (
                        <>
                            <Row>
                                <Col lg="8">
                                    <PurchaseDetail purchase={purchaseDetail} />
                                </Col>


                            </Row>

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
                                                    data={offersList || []}
                                                    columns={DetailsColumns(this.toggleModal)}
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

                                                                        <Button
                                                                          type="button"
                                                                          color="success"
                                                                          className="btn-rounded waves-effect waves-light mb-2 mr-2"
                                                                          onClick={this.toggleModal}
                                                                        >
                                                                            <i className="mdi mdi-plus mr-1" />
                                                                            Добавить предложение

                                                                        </Button>

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
                            </Row>                        </>
                      )}
                  </Container>
              </div>
              </div>
          </React.Fragment>
        )
    }
}

Details.propTypes = {
    purchaseDetail: PropTypes.any,
    offersList: PropTypes.any,
    selectedFiles: PropTypes.array,
    match: PropTypes.object,
    error:  PropTypes.any,
    uploadFile:  PropTypes.func,
    onGetPurchaseDetail: PropTypes.func,
}

const mapStateToProps = state => ({
    purchaseDetail: state.purchases.purchaseDetail.purchase,
    offersList: state.purchases.purchaseDetail.offers,
})

const mapDispatchToProps = dispatch => ({
    onGetPurchaseDetail: id => dispatch(getPurchaseDetail(id)),
    uploadFile: file => dispatch(uploadFile(file))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Details))
