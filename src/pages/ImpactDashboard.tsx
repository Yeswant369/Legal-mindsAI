import React, { useState, useEffect } from "react";

export default function ImpactDashboard() {

  // =============================
  // VERIFIED PUBLIC DATA
  // =============================

  const districtPending = 46500000; // NJDG
  const highCourtPending = 6363000; // NJDG
  const supremePending = 92201;     // NJDG

  const totalPending =
    districtPending +
    highCourtPending +
    supremePending;

  // Daksh Litigation Cost Study
  const attendanceCost = 1039;
  const productivityLoss = 1746;

  const totalDailyBurden =
    attendanceCost + productivityLoss; // ₹2785

  // =============================
  // USER VARIABLES
  // =============================

  const [adoption, setAdoption] = useState(20);
  const [effectiveness, setEffectiveness] = useState(40);
  const [animatedValue, setAnimatedValue] = useState(0);

  // =============================
  // ECONOMIC MODEL
  // =============================

  const annualEconomicExposure =
    totalPending *
    totalDailyBurden *
    365;

  const projectedSavings =
    annualEconomicExposure *
    (adoption / 100) *
    (effectiveness / 100);

  // =============================
  // ANIMATION
  // =============================

  useEffect(() => {
    let start = 0;
    const end = projectedSavings;
    const duration = 800;
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

  return (
    <div style={{ padding: "40px", maxWidth: "1000px", margin: "auto" }}>
      <h1 style={{ textAlign: "center" }}>
        Judicial Pendency & Economic Impact Model (India)
      </h1>

      {/* =============================
          VERIFIED DATA SECTION
         ============================= */}

      <div style={{ marginTop: "30px", lineHeight: "1.8" }}>
        <h3>Verified Judicial Data (NJDG – 2026)</h3>
        <ul>
          <li>District Courts: {districtPending.toLocaleString()}</li>
          <li>High Courts: {highCourtPending.toLocaleString()}</li>
          <li>Supreme Court: {supremePending.toLocaleString()}</li>
          <li>
            Total Pending Cases: {totalPending.toLocaleString()}
          </li>
        </ul>

        <h4>Daksh Litigation Cost Study</h4>
        <ul>
          <li>Daily Attendance Cost: ₹{attendanceCost}</li>
          <li>Daily Productivity Loss: ₹{productivityLoss}</li>
          <li>Total Daily Economic Burden: ₹{totalDailyBurden}</li>
        </ul>
      </div>

      {/* =============================
          SLIDERS
         ============================= */}

      <div style={{ marginTop: "40px" }}>
        <h3>Adoption Rate: {adoption}%</h3>
        <input
          type="range"
          min="5"
          max="80"
          value={adoption}
          onChange={(e) =>
            setAdoption(Number(e.target.value))
          }
          style={{ width: "100%" }}
        />
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>Effectiveness Rate: {effectiveness}%</h3>
        <input
          type="range"
          min="10"
          max="90"
          value={effectiveness}
          onChange={(e) =>
            setEffectiveness(Number(e.target.value))
          }
          style={{ width: "100%" }}
        />
      </div>

      {/* =============================
          RESULT
         ============================= */}

      <div
        style={{
          marginTop: "40px",
          padding: "30px",
          background: "#111",
          color: "white",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        <h2>Modeled Annual Economic Exposure Reduction</h2>
        <h1 style={{ fontSize: "40px" }}>
          ₹{" "}
          {animatedValue.toLocaleString(undefined, {
            maximumFractionDigits: 0,
          })}
        </h1>
        <p>
          Based on total pendency × verified daily cost ×
          adoption × effectiveness
        </p>
      </div>

      {/* =============================
          LIVE FORMULA
         ============================= */}

      <div style={{ marginTop: "40px", lineHeight: "1.8" }}>
        <h3>Live Calculation</h3>

        <p>
          Annual Exposure =
          {totalPending.toLocaleString()} × ₹{totalDailyBurden} × 365
        </p>

        <p>
          = ₹{annualEconomicExposure.toLocaleString()}
        </p>

        <p>
          Projected Savings =
          ₹{annualEconomicExposure.toLocaleString()}
          × {adoption}% × {effectiveness}%
        </p>

        <h4>
          = ₹{projectedSavings.toLocaleString()}
        </h4>
      </div>

      {/* =============================
          10 YEAR CONTEXT
         ============================= */}

      <div style={{ marginTop: "50px", lineHeight: "1.8" }}>
        <h3>10-Year Backlog Exposure Context</h3>
        <p>
          If annual economic exposure remains similar,
          10-year cumulative modeled burden:
        </p>

        <h2>
          ₹{(annualEconomicExposure * 10).toLocaleString()}
        </h2>

        <p style={{ color: "gray" }}>
          This is a modeled exposure estimate based on
          verified pendency and Daksh litigation cost study.
          It is not an officially published national loss figure.
        </p>
      </div>

      {/* =============================
          SOURCES
         ============================= */}

      <div style={{ marginTop: "50px", fontSize: "14px" }}>
        <h3>Sources</h3>
        <ul>
          <li>NJDG: https://njdg.ecourts.gov.in</li>
          <li>Daksh Access to Justice Study</li>
          <li>NCLT Backlog Reports (capital lock ₹10–15 lakh crore)</li>
        </ul>
      </div>
    </div>
  );
}
