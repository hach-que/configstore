import React, { useState } from "react";
import { RouteComponentProps } from "react-router";
import {
  GetSchemaResponse,
  MetaOperation,
  Key,
  MetaTransaction
} from "../api/meta_pb";
import { PendingTransactionContext, PendingTransaction } from "../App";
import { g, serializeKey, getLastKindOfKey, prettifyKey } from "../core";
import { Link } from "react-router-dom";
import { ConfigstoreMetaServicePromiseClient } from "../api/meta_grpc_web_pb";
import { grpcHost } from "../svcHost";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export interface SaveRouteProps extends RouteComponentProps<{}> {
  schema: GetSchemaResponse;
}

function getTypeForOperation(operation: MetaOperation) {
  if (operation.hasCreaterequest()) {
    return "Create";
  }
  if (operation.hasDeleterequest()) {
    return "Delete";
  }
  if (operation.hasGetrequest()) {
    return "Get";
  }
  if (operation.hasListrequest()) {
    return "List";
  }
  if (operation.hasUpdaterequest()) {
    return "Update";
  }
  return "(Unknown)";
}

function getEntityLinkForOperation(idx: number, operation: MetaOperation) {
  let key: Key | null = null;
  if (operation.hasCreaterequest()) {
    return (
      <Link
        key={`pendingop_${idx}`}
        style={{
          display: "block"
        }}
        to={`/kind/${g(
          operation.getCreaterequest()
        ).getKindname()}/create/pending/${idx}`}
      >
        Pending {g(operation.getCreaterequest()).getKindname()}
      </Link>
    );
  }
  if (operation.hasDeleterequest()) {
    key = g(g(operation.getDeleterequest()).getKey());
  }
  if (operation.hasGetrequest()) {
    return null;
  }
  if (operation.hasListrequest()) {
    return null;
  }
  if (operation.hasUpdaterequest()) {
    key = g(g(g(operation.getUpdaterequest()).getEntity()).getKey());
  }
  if (key !== null) {
    return (
      <Link
        key={serializeKey(key)}
        style={{
          display: "block"
        }}
        to={`/kind/${getLastKindOfKey(key)}/edit/${serializeKey(key)}`}
      >
        {prettifyKey(key)}
      </Link>
    );
  }
  return null;
}

export const SaveRoute = (props: SaveRouteProps) => (
  <PendingTransactionContext.Consumer>
    {value => <SaveRealRoute {...props} pendingTransaction={value} />}
  </PendingTransactionContext.Consumer>
);

const SaveRealRoute = (
  props: SaveRouteProps & { pendingTransaction: PendingTransaction }
) => {
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const discard = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    props.pendingTransaction.setOperations([]);
  };
  const save = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    let moved = false;
    setIsSaving(true);
    try {
      const svc = new ConfigstoreMetaServicePromiseClient(grpcHost, null, null);
      const req = new MetaTransaction();
      req.setOperationsList(props.pendingTransaction.operations);
      props.pendingTransaction.setResponse(await svc.applyTransaction(req, {}));
      props.pendingTransaction.setResponseOriginalOperations(
        props.pendingTransaction.operations
      );
      props.pendingTransaction.setOperations([]);
      props.history.push(`/review`);
      moved = true;
    } finally {
      if (!moved) {
        setIsSaving(false);
      }
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-0 border-bottom">
        <h1 className="h2">Save Changes?</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <button
            type="button"
            className={"btn btn-sm mr-2 btn-secondary"}
            onClick={discard}
            disabled={
              isSaving || props.pendingTransaction.operations.length === 0
            }
          >
            Discard All Pending Changes
          </button>
          <button
            type="button"
            className={"btn btn-sm mr-2 btn-success"}
            onClick={save}
            disabled={
              isSaving || props.pendingTransaction.operations.length === 0
            }
          >
            {isSaving ? (
              <>
                <FontAwesomeIcon icon={faSpinner} spin />
                &nbsp;
              </>
            ) : (
              ""
            )}
            Save Changes
          </button>
        </div>
      </div>
      <div className="table-responsive table-fixed-header">
        <table className="table table-sm table-bt-none table-hover">
          <thead>
            <tr>
              <th>Idx</th>
              <th>Type</th>
              <th>Entity</th>
            </tr>
          </thead>
          <tbody>
            {props.pendingTransaction.operations.length === 0 ? (
              <>
                <tr>
                  <td colSpan={3} className="text-muted">
                    You have no pending changes to be saved.
                  </td>
                </tr>
              </>
            ) : null}
            {props.pendingTransaction.operations.map((value, idx) => (
              <tr key={idx}>
                <td>{idx}</td>
                <td>{getTypeForOperation(value)}</td>
                <td>{getEntityLinkForOperation(idx, value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
