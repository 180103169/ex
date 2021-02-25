import { Badge, Button, Input, Label, UncontrolledTooltip } from "reactstrap"
import React from "react"
import { Link } from "react-router-dom"
import { format } from "prettier"

function toDateTime(secs) {
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

function isOwner(id){
  const obj = JSON.parse(localStorage.getItem("authUser"))
  return obj.ID===id;
}
const DetailsColumns = toggleModal => [

    {
        dataField: "ID",
        text: "ID",
        sort: true,
        formatter: (cellContent, row) => (
          <p className="text-body font-weight-bold">
              {row.ID}
          </p>
        ),
    },

    {
        dataField: "КП",
        text: "КП",
        sort: true,
        formatter: (cellContent, row) => (
          <p className="text-body font-weight-bold">
            {row.field_1668.split(",").map((file, key) => (
              <a href={"http://online.tsd.kz/uploads/attachments/" + toDateTime(row.DateAdded) + "/" + file} target="_blank" download className="text-dark font-weight-medium">

                <i  className={file.includes('.pdf') ? "mdi mdi-file-pdf font-size-16 align-middle text-danger mr-2" : "mdi mdi-file-image font-size-16 align-middle text-warning mr-2" }></i> {file}
              </a>
            ))}
          </p>
        ),
    },
    {
        dataField: "Автор",
        text: "Автор ",
        sort: true,
        formatter: (cellContent, row) => (
            <p className="text-body font-weight-bold">
                { row.field_4423 }
            </p>
        ),
    },
    {
        dataField: "Дата создания",
        text: "Дата создания",
        sort: true,
        formatter: (cellContent, row) => (
            <p className="text-body font-weight-bold">
                {toDateTime(row.DateAdded)}
            </p>
        ),
    },
    {
        dataField: "Контрагент",
        text: "Контрагент",
        sort: true,
        formatter: (cellContent, row) => (
            <p className="text-body font-weight-bold">
                {row.field_1668}
            </p>
        ),
    },

  {
    dataField: "Цена за единицу, без ндс",
    text: "Цена за единицу, без ндс",
    sort: true,
    formatter: (cellContent, row) => (
      <p className="text-body font-weight-bold">
        {row.field_3358 + " " + row.field_3362}
      </p>
    ),
  },
    {
        dataField: "Цена за единицу с НДС",
        text: "Цена за единицу с НДС",
        sort: true,
        formatter: (cellContent, row) => (
            <p className="text-body font-weight-bold">
                {row.field_3359 + ""+ row.field_3362}
            </p>
        ),
    },

    {
        dataField: "Сумма предложения",
        text: "Сумма предложения",
        sort: true,
        formatter: (cellContent, row) => (
            <p className="text-body font-weight-bold">
                {row.field_3360 + "" + row.field_3362}
            </p>
        ),
    },

    {
        dataField: "Обоснование",
        text: "Обоснование",
        sort: true,
        formatter: (cellContent, row) => (
            <p className="text-body font-weight-bold">
                {row.field_1462}
            </p>
        ),
    },
    {
        dataField: "Статус",
        isDummyField: true,
        text: "Статус",
        sort: true,
      formatter: (cellContent, row) => (
        <Badge
          className={
            "font-size-12 badge-soft-" + ((row.field_1258 === 1115) ? "danger" : (row.field_1258 === 1114) ? "warning" : "success")
          }
          color={(row.field_1258 === 1115) ? "danger" : (row.field_1258 === 1114) ? "warning" : "success"}
          pill
        >
          {(row.field_1258 === 1115) ? "Скрыто" : (row.field_1258 === 1114) ? "На рассмотрении" : "Победитель"}
        </Badge>
      ),
//1115-skryto, 1114-na rassmotrenii, 1170 -pobeditel'
    },

    {
        dataField: "action",
        isDummyField: true,
        text: "Действия",
        formatter: (cellContent, row) => (
          <>
            {
              (isOwner(row.created_by)) ? (
                <div>
                <Link to="#" className="mr-3 text-primary" >
                  <i className="mdi mdi-pencil font-size-18 mr-3" id="edittooltip" />
                  <UncontrolledTooltip placement="top" target="edittooltip" >
                    Edit
                  </UncontrolledTooltip>
                </Link>
                <Link to="#" className="text-danger">
                  <i className="mdi mdi-close font-size-18 mr-3" id="deletetooltip" />
                  <UncontrolledTooltip placement="top" target="deletetooltip">
                    Delete
                  </UncontrolledTooltip>
                </Link>
                </div>
                  ) : ''
            }

          </>
        ),
    },
]

export default DetailsColumns
