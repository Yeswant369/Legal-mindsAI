import React, { useState, useEffect } from "react";

export default function ImpactDashboard() {

  // =============================
  // VERIFIED PUBLIC DATA
  // =============================

  const districtPending = 46500000;
  const highCourtPending = 6363000;
  const supremePending = 92201;

  const totalPending =
    districtPending +
    highCourtPending +
    supremePending;

  const attendanceCost = 1039;
  const productivityLoss = 1746;
  const totalDailyBurden =
    attendanceCost + productivityLoss;

  // =============================
  // USER VARIABLES
  // =============================

  const [adoption, setAdoption] = useState(30);
  const [effectiveness, setEffectiveness] = useState(27);
  const [animatedValue, setAnimatedValue] = useState(0);

  // =============================
  // CORE CALCULATIONS
  // =============================

  const annualEconomicExposure =
    totalPending *
    totalDailyBurden *
    365;

  const nationalImpactRate =
    (adoption / 100) *
    (effectiveness / 100);

  const projectedSavings =
    annualEconomicExposure *
    nationalImpactRate;

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
        Judicial Pendency & Economic Impact Model
      </h1>

      {/* =============================
          SLIDERS
         ============================= */}

      <div style={{ marginTop: "40px" }}>
        <h3>
          Adoption Rate: {adoption}%
          <br />
          <small>
            (How many people in the affected population are actually using LegalMindsAI?
            It is about coverage. If adoption = {adoption}%, that means
            {` ${adoption}% of litigants or potential litigants are exposed to the solution.
            It does NOT mean disputes reduce by ${adoption}%.
            Think of it like vaccination coverage.`})
          </small>
        </h3>

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

      <div style={{ marginTop: "40px" }}>
        <h3>
          Effectiveness Rate: {effectiveness}%
          <br />
          <small>
            (Among users, how much does the system reduce errors or disputes?
            If effectiveness = {effectiveness}%, it means disputes reduce
            by {effectiveness}% within the adopted group.)
          </small>
        </h3>

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
          NATIONAL IMPACT BAR
         ============================= */}

      <div style={{ marginTop: "50px" }}>
        <h3>Total National Impact: {(nationalImpactRate * 100).toFixed(2)}%</h3>

        <div
          style={{
            height: "20px",
            background: "#ddd",
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              width: `${nationalImpactRate * 100}%`,
              height: "100%",
              background: "green",
              borderRadius: "10px",
              transition: "width 0.5s ease-in-out",
            }}
          />
        </div>

        <small>
          (This equals Adoption × Effectiveness.
          Example: {adoption}% × {effectiveness}% =
          {(nationalImpactRate * 100).toFixed(2)}% total reduction nationally.)
        </small>
      </div>

      {/* =============================
          RESULT DISPLAY
         ============================= */}

      <div
        style={{
          marginTop: "50px",
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
          (Based on total pendency × verified daily cost × national impact rate)
        </p>
      </div>

      {/* =============================
          LIVE FORMULA
         ============================= */}

      <div style={{ marginTop: "50px", lineHeight: "1.8" }}>
        <h3>Live Formula</h3>

        <p>
          Annual Exposure =
          {totalPending.toLocaleString()} × ₹{totalDailyBurden} × 365
        </p>

        <p>
          National Impact Rate =
          {adoption}% × {effectiveness}% =
          {(nationalImpactRate * 100).toFixed(2)}%
        </p>

        <p>
          Projected Savings =
          ₹{annualEconomicExposure.toLocaleString()} ×
          {(nationalImpactRate * 100).toFixed(2)}%
        </p>
      </div>
    </div>
  );
}
