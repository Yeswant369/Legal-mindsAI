import React, { useState, useEffect } from "react";

export default function ImpactDashboard() {
  /* =============================
     OFFICIAL PUBLIC DATA (2026)
     ============================= */

  // NJDG + Supreme Court (Feb 2026 consolidated)
  const totalPendingCases = 52955201; // 5.29+ crore combined courts
  const civilCases = 15500000; // Approx combined civil (district + HC + SC)
  const criminalCases = totalPendingCases - civilCases;

  // Daksh Litigation Cost Study
  const attendanceCostPerDay = 1039;
  const productivityLossPerDay = 1746;
  const totalDailyCost = attendanceCostPerDay + productivityLossPerDay;

  /* =============================
     USER CONTROLS
     ============================= */

  const [adoption, setAdoption] = useState(30);
  const [effectiveness, setEffectiveness] = useState(25);
  const [animatedValue, setAnimatedValue] = useState(0);

  /* =============================
     ANALYTICAL MODEL
     ============================= */

  // Annual national litigation exposure
  const annualExposure =
    totalPendingCases * totalDailyCost * 365;

  // National reduction = Adoption × Effectiveness
  const nationalImpactRate =
    (adoption / 100) * (effectiveness / 100);

  const projectedSavings =
    annualExposure * nationalImpactRate;

  /* =============================
     ANIMATION
     ============================= */

  useEffect(() => {
    let start = 0;
    const end = projectedSavings;
    const duration = 1000;
    const increment = end / (duration / 20);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setAnimatedValue(start);
    }, 20);

    return () => clearInterval(timer);
  }, [projectedSavings]);

  /* =============================
     UI
     ============================= */

  return (
    <div
      style={{
        padding: "20px 25px",
        maxWidth: "1100px",
        margin: "auto",
        fontSize: "16px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "36px",
          fontWeight: "700",
          marginBottom: "25px",
        }}
      >
        Judicial Pendency & Economic Impact Model (India)
      </h1>

      {/* =============================
         OFFICIAL DATA
         ============================= */}

      <div style={{ lineHeight: "1.7", marginBottom: "30px" }}>
        <h2 style={{ fontSize: "22px" }}>Official Recorded Data (2026)</h2>

        <p>
          • Total Pending Cases:{" "}
          <strong>{totalPendingCases.toLocaleString()}</strong>
        </p>

        <p>
          • Civil Cases: {civilCases.toLocaleString()}  
          (≈ {Math.round((civilCases / totalPendingCases) * 100)}%)
        </p>

        <p>
          • Criminal Cases: {criminalCases.toLocaleString()}  
          (≈ {Math.round((criminalCases / totalPendingCases) * 100)}%)
        </p>

        <p>
          • Daksh Study – Daily Attendance Cost: ₹{attendanceCostPerDay}
        </p>

        <p>
          • Daksh Study – Daily Productivity Loss: ₹{productivityLossPerDay}
        </p>

        <p>
          • Total Daily Economic Burden Per Case: ₹{totalDailyCost}
        </p>
      </div>

      {/* =============================
         SLIDER SECTION
         ============================= */}

      <div style={{ marginBottom: "25px" }}>
        <h3 style={{ fontSize: "20px" }}>
          Adoption Rate: {adoption}%
        </h3>
        <small style={{ fontSize: "14px" }}>
          (How many litigants or potential litigants are actually using
          LegalMindsAI? If adoption = {adoption}%, that means {adoption}% of
          affected individuals are exposed to the solution. It does NOT mean
          disputes reduce by {adoption}%. Think of it like vaccination
          coverage.)
        </small>

        <input
          type="range"
          min="5"
          max="80"
          value={adoption}
          onChange={(e) => setAdoption(Number(e.target.value))}
          style={{ width: "100%", marginTop: "10px" }}
        />
      </div>

      <div style={{ marginBottom: "25px" }}>
        <h3 style={{ fontSize: "20px" }}>
          Effectiveness Rate: {effectiveness}%
        </h3>
        <small style={{ fontSize: "14px" }}>
          (Among users, how much does the system reduce errors or disputes?
          If effectiveness = {effectiveness}%, disputes reduce by {effectiveness}%
          within the adopted group.)
        </small>

        <input
          type="range"
          min="10"
          max="90"
          value={effectiveness}
          onChange={(e) =>
            setEffectiveness(Number(e.target.value))
          }
          style={{ width: "100%", marginTop: "10px" }}
        />
      </div>

      {/* =============================
         NATIONAL IMPACT BAR
         ============================= */}

      <div style={{ marginBottom: "25px" }}>
        <h3 style={{ fontSize: "20px" }}>
          Total National Impact:{" "}
          {(nationalImpactRate * 100).toFixed(2)}%
        </h3>
        <small>
          (This equals Adoption × Effectiveness →{" "}
          {adoption}% × {effectiveness}% ={" "}
          {(nationalImpactRate * 100).toFixed(2)}% total reduction nationally.)
        </small>

        <div
          style={{
            height: "14px",
            background: "#ddd",
            borderRadius: "8px",
            marginTop: "10px",
          }}
        >
          <div
            style={{
              width: `${nationalImpactRate * 100}%`,
              height: "100%",
              background: "green",
              borderRadius: "8px",
            }}
          />
        </div>
      </div>

      {/* =============================
         RESULT CARD
         ============================= */}

      <div
        style={{
          padding: "25px 30px",
          background: "#111",
          color: "white",
          borderRadius: "10px",
          textAlign: "center",
          marginTop: "30px",
        }}
      >
        <h2 style={{ fontSize: "22px" }}>
          Modeled Annual Economic Exposure Reduction
        </h2>

        <h1
          style={{
            fontSize: "50px",
            fontWeight: "800",
            letterSpacing: "1px",
          }}
        >
          ₹{" "}
          {animatedValue.toLocaleString(undefined, {
            maximumFractionDigits: 0,
          })}
        </h1>

        <p>
          (Based on total pendency × verified daily cost ×
          national impact rate)
        </p>
      </div>

      {/* =============================
         LIVE FORMULA
         ============================= */}

      <div style={{ marginTop: "30px", lineHeight: "1.7" }}>
        <h3>Live Calculation</h3>

        <p>
          Annual Exposure = {totalPendingCases.toLocaleString()} × ₹
          {totalDailyCost} × 365
        </p>

        <p>
          = ₹{annualExposure.toLocaleString()}
        </p>

        <p>
          Projected Savings = Annual Exposure × Adoption × Effectiveness
        </p>

        <p>
          = ₹{annualExposure.toLocaleString()} × {adoption}% ×{" "}
          {effectiveness}%  
          = ₹{projectedSavings.toLocaleString()}
        </p>
      </div>

      {/* =============================
         SOURCES
         ============================= */}

      <div
        style={{
          marginTop: "40px",
          fontSize: "13px",
          lineHeight: "1.6",
          color: "gray",
        }}
      >
        <h3>Official Sources</h3>

        <p>
          National Judicial Data Grid (NJDG):  
          https://njdg.ecourts.gov.in
        </p>

        <p>
          Supreme Court Pendency Data:  
          https://main.sci.gov.in
        </p>

        <p>
          Daksh India Litigation Cost Study:  
          https://dakshindia.org
        </p>

        <p>
          *This model uses officially reported pendency figures and
          published litigation cost research. The impact projection is
          a modeled simulation and does not represent guaranteed
          savings.
        </p>
      </div>
    </div>
  );
}
