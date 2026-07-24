import { useState } from "react";

export default function Signup({
  onLogin,
}: {
  onLogin: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div style={{ minHeight: "100vh", background: "#FAF8F2", display: "flex", justifyContent: "center", alignItems: "center",
        padding: 24,}}>
      <div style={{ width: "100%", maxWidth: 430, background: "#FFFFFF", border: "2px solid #D6D3CA", padding: 36,}}>
        <div
          style={{ fontFamily: '"DM Mono", monospace', fontSize: 11, color: "#6B6860", letterSpacing: "0.15em", marginBottom: 10,}}>
          START LEARNING
        </div>

        <h1 style={{ fontFamily: '"Archivo Black", sans-serif', fontSize: 42, margin: 0, lineHeight: 1, }}>
          Create
          <br />
          <span style={{ color: "#2EC4B6" }}>Account.</span>
        </h1>

        <p style={{ marginTop: 18, marginBottom: 35, color: "#6B6860",}}>Begin your language adventure.</p>
        {[{ label: "NAME", value: name, set: setName, type: "text",},
          { label: "EMAIL", value: email, set: setEmail, type: "email",},
          { label: "PASSWORD", value: password, set: setPassword, type: "password",},
        ].map((field) => (
          <div key={field.label} style={{ marginBottom: 18 }}>
            <div
              style={{ fontFamily: '"DM Mono", monospace', fontSize: 10, letterSpacing: "0.1em", marginBottom: 6,}}>
              {field.label}
            </div>
            <input type={field.type} value={field.value} onChange={(e) => field.set(e.target.value)}
              style={{ width: "100%", padding: 14, border: "2px solid #D6D3CA", background: "#FAF8F2", outline: "none",}}/>
          </div>
        ))}

        <button
          style={{ width: "100%", background: "#E84855", border: "none", color: "white", padding: 18, fontFamily: '"Archivo Black", sans-serif',
            fontSize: 17, cursor: "pointer",}}>
          CREATE ACCOUNT →
        </button>

        <div style={{ marginTop: 35, textAlign: "center", fontFamily: '"DM Mono", monospace', fontSize: 12,}}>
          Already have an account?{" "}
          <span
            style={{ color: "#2EC4B6", cursor: "pointer", fontWeight: "bold",}}onClick={onLogin}>
            Log In
          </span>
        </div>
      </div>
    </div>
  );
}