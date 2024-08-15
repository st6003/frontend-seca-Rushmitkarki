import React, { useMemo } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const PaymentSuccess = () => {
  const location = useLocation();
  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const transactionId = queryParams.get("transaction_id");

  return (
    <div className="container-fluid bg-light min-vh-100 d-flex align-items-center justify-content-center py-5">
      <div className="card border-0 shadow-lg" style={{ maxWidth: "400px" }}>
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <FaCheckCircle
              className="text-success"
              style={{ fontSize: "5rem" }}
            />
          </div>
          <h1 className="card-title text-center mb-4 fw-bold text-primary">
            Payment Successful!
          </h1>
          <p className="card-text text-center text-muted mb-4">
            Thank you for insurance payment. Your transaction was successful.
          </p>
          {transactionId && (
            <div
              className="alert alert-info text-center py-2 mb-4"
              role="alert"
            >
              <small>Transaction ID: {transactionId}</small>
            </div>
          )}
          <div className="d-grid gap-2">
            <Link
              to="/homepage"
              className="btn btn-primary btn-lg fw-bold text-uppercase"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
