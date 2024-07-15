import React, { useEffect, useState } from 'react';
import { getInsurance } from "../../apis/api";
import InsuranceCard from "../../components/InsuranceCrad";

const Payment = () => {
  const [insurances, setInsurances] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInsurances();
  }, []);

  const fetchInsurances = () => {
    getInsurance()
      .then((res) => {
        setInsurances(res.data.data || []);
      })
      .catch((err) => {
        setError(err.response.data.message || "Failed to fetch insurances.");
      });
  };

  return (
    <div className="container" style={{ marginLeft: "20rem" }}>
      <div className="flex flex-col">
        <h2 className="mt-5 text-2xl font-bold">Available Insurances</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
          {error ? (
            <h1>{error}</h1>
          ) : (
            insurances.map((insurance) => (
              <div key={insurance._id}>
                <InsuranceCard insuranceInformation={insurance} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;
