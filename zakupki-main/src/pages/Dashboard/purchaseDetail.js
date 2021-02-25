import React from "react"
import PropTypes from "prop-types"
import { map, get } from "lodash"
import {Card, CardBody, Col, Container, Media, Row} from "reactstrap"

const PurchaseDetail = ({ purchase }) => {
  return (
      <Card>
        <CardBody>


          <Media>

            <Media className="overflow-hidden" body>
              <h5 className="text-truncate font-size-15">{purchase.field_1231}</h5>
              <p className="text-muted">{purchase.field_1462}</p>
            </Media>
          </Media>


          <Row className="task-dates">
            <Col sm="6" xs="6">
              <div className="mt-4">
                <h5 className="font-size-14">
                  <i className="bx bx-calendar mr-1 text-primary" /> Start Date
                </h5>
                <p className="text-muted mb-0">{(new Date(purchase.field_1223)).toString()}</p>
                <div className="form-group row">
                  <label
                      htmlFor="example-text-input"
                      className="col-md-2 col-form-label"
                  >
                    Name
                  </label>
                  <div className="col-md-10">
                    <h3>{purchase.field_1231}</h3>
                  </div>
                </div>

              </div>
            </Col>

          </Row>
        </CardBody>
      </Card>
  )
}

PurchaseDetail.propTypes = {
  purchase: PropTypes.object,
}

export default PurchaseDetail