import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import { map } from "lodash"
import {
  Badge,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  Card,
  CardBody,
  CardColumns,
  CardDeck,
  CardFooter,
  CardHeader,
  CardImg,
  CardImgOverlay,
  CardSubtitle,
  CardText,
  CardTitle,  Table,
  UncontrolledDropdown,
  UncontrolledTooltip,
} from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//Import Image
import images from "assets/images"
import companies from "assets/images/companies"

import {getPurchases} from "../../store/purchases/actions"
import purchases from "../../store/purchases/reducer"

class Dashboard extends Component {
  componentDidMount() {
    const { onGetPurchases } = this.props
    onGetPurchases()
  }
  toDateTime(secs) {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    var month = '' + (t.getMonth() + 1);
    var day = '' + t.getDate();
    var year = t.getFullYear();
    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('/');

  }



  render() {
    const { purchases } = this.props


    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid={true}>
            <Breadcrumbs title="Главная" breadcrumbItem="Закупки" />

            <Row>
              {map(purchases, (purchase, index) => (


                <Col md={12}  key={index}>
                  <Link to={`/details/${purchase.ID}`} className="card">
                    <CardBody>
                      <CardTitle>                    {purchase.ID + ". "}
                        {purchase.field_1231}</CardTitle>
                      <CardText className="text-muted">
                        {purchase.field_1462}
                      </CardText>
                      <CardText>
                        <small className="text-muted">
                          Категория закупки: {purchase.field_3022}
                          <br></br>
                          Конец сборов: {this.toDateTime(purchase.field_1223).toString()}

                        </small>
                      </CardText>
                    </CardBody>
                  </Link>              </Col>
              ))}
            </Row>
          </Container>
        </div>
      </React.Fragment>
    )
  }
}

Dashboard.propTypes = {
  purchases: PropTypes.array,
  onGetPurchases: PropTypes.func,
}

const mapStateToProps = ({ purchases }) => ({
  purchases: purchases.purchases.data,
})

const mapDispatchToProps = dispatch => ({
  onGetPurchases: () => dispatch(getPurchases()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Dashboard))
