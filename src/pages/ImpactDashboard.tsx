import React, { useState, useEffect } from "react";

export default function ImpactDashboard() {
  const [adoption, setAdoption] = useState(20);
  const [animatedValue, setAnimatedValue] = useState(0);
  const [currency, setCurrency] = useState("INR");

  // ===== BASE MODEL ASSUMPTIONS =====
  const nationalCaseCount = 50000000; // ~5 crore pending cases (approx India total)
  const avgLitigationCost = 50000; // ₹ average per family
  const preventablePercent = 30; // % documentation-related

  const projectedReduction = (preventablePercent * adoption) / 100;

  const projectedSavings =
    (nationalCaseCount *
      avgLitigationCost *
      projectedReduction) /
    100;

  const usdRate = 83;
  const displayValue =
    currency === "INR"
      ? projectedSavings
      : projectedSavings / usdRate;

  // ===== Animated Counter =====
  useEffect(() => {
    let start = 0;
    const end = displayValue;
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
  }, [displayValue]);

  return (
    <div style={{ padding: "40px", maxWidth: "1000px", margin: "auto" }}>
      <h1 style={{ textAlign: "center" }}>
        LegalMindsAI Impact Dashboard
      </h1>

      {/* ===== ADOPTION SLIDER ===== */}
      <div style={{ marginTop: "40px" }}>
        <h3>Awareness Adoption Rate: {adoption}%</h3>
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

      {/* ===== CURRENCY TOGGLE ===== */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => setCurrency("INR")}>
          ₹ INR
        </button>
        <button
          onClick={() => setCurrency("USD")}
          style={{ marginLeft: "10px" }}
        >
          $ USD
        </button>
      </div>

      {/* ===== ANIMATED COUNTER ===== */}
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
        <h2>Projected Annual Prevented Loss</h2>
        <h1 style={{ fontSize: "40px" }}>
          {currency === "INR" ? "₹ " : "$ "}
          {animatedValue.toLocaleString(undefined, {
            maximumFractionDigits: 0,
          })}
        </h1>
        <p>
          Based on modeled reduction of avoidable
          documentation disputes.
        </p>
      </div>

      {/* ===== BEFORE / AFTER BAR VISUAL ===== */}
      <div style={{ marginTop: "60px" }}>
        <h2>Before vs After Impact</h2>

        <p>Current Avoidable Litigation: {preventablePercent}%</p>
        <div
          style={{
            background: "#ddd",
            height: "20px",
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              width: `${preventablePercent}%`,
              height: "100%",
              background: "red",
              borderRadius: "10px",
            }}
          />
        </div>

        <p style={{ marginTop: "20px" }}>
          After LegalMindsAI Adoption:{" "}
          {(preventablePercent - projectedReduction).toFixed(
            2
          )}
          %
        </p>
        <div
          style={{
            background: "#ddd",
            height: "20px",
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              width: `${
                preventablePercent - projectedReduction
              }%`,
              height: "100%",
              background: "green",
              borderRadius: "10px",
              transition: "width 0.5s ease",
            }}
          />
        </div>
      </div>

      {/* ===== STATE-WISE SIMULATION ===== */}
      <div style={{ marginTop: "60px" }}>
        <h2>State-wise Impact Simulation</h2>
        <p>
          Example estimate assuming proportional
          distribution across major states:
        </p>
        <ul>
          <li>Maharashtra – 12% impact share</li>
          <li>Uttar Pradesh – 15% impact share</li>
          <li>Tamil Nadu – 8% impact share</li>
          <li>Karnataka – 7% impact share</li>
        </ul>
      </div>

      {/* ===== PDF EXPORT BUTTON ===== */}
      <div style={{ marginTop: "40px" }}>
        <button
          onClick={() => window.print()}
          style={{
            padding: "10px 20px",
            background: "black",
            color: "white",
            borderRadius: "6px",
          }}
        >
          Download Impact Report (PDF)
        </button>
      </div>

      {/* ===== INVESTOR EXPLANATION ===== */}
      <div style={{ marginTop: "40px", fontSize: "14px", color: "gray" }}>
        <h3>Model Explanation</h3>
        <p>
          India has approximately 5 crore pending
          cases. Research suggests around 30% are
          documentation or awareness-related.
          This model simulates partial adoption
          reducing preventable disputes proportionally.
        </p>
        <p>
          *Figures are modeled projections for
          analytical presentation purposes.
        </p>
      </div>
    </div>
  );
}
