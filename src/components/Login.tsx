import { useState } from "react";

export default function Login({
  onLogin,
  onSignup,
}: {
  onLogin: () => void;
  onSignup: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div
      style={{minHeight: "100vh",background: "#FAF8F2",display: "flex", justifyContent: "center", alignItems: "center",padding: 24,}}
    >
      <div style={{width: "100%", maxWidth: 430, background: "#FFFFFF", border: "2px solid #D6D3CA", padding: 36,}}>
        {/* Logo */}
        <div style={{ fontFamily: '"DM Mono", monospace', fontSize: 11,color: "#6B6860", letterSpacing: "0.15em",marginBottom: 10,}}>
          JLPT LEANER
        </div>

        <h1 style={{fontFamily: '"Archivo Black", sans-serif', fontSize: 42,margin: 0, lineHeight: 1, color: "#16161A",}}>
          Welcome
          <br />
          <span style={{ color: "#E84855" }}>Back.</span>
        </h1>

        <p style={{ fontFamily: "Archivo", color: "#6B6860", marginTop: 18, marginBottom: 35,}}>
          Continue your language journey.
        </p>
        {/* Email */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontFamily: '"DM Mono", monospace', fontSize: 10, letterSpacing: "0.1em", marginBottom: 6,}}>
            EMAIL
          </div>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="hello@email.com"
            style={{ width: "100%", padding: 14, border: "2px solid #D6D3CA", background: "#FAF8F2", fontSize: 15,outline: "none",}}
          />
        </div>
        {/* Password */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontFamily: '"DM Mono", monospace', fontSize: 10, letterSpacing: "0.1em", marginBottom: 6,}}>
            PASSWORD
          </div>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
            style={{ width: "100%", padding: 14, border: "2px solid #D6D3CA", background: "#FAF8F2", fontSize: 15, outline: "none",}}
          />
        </div>

        <button onClick={onLogin}
          style={{ width: "100%", background: "#2EC4B6", border: "none", color: "white", padding: 18, cursor: "pointer",
            fontFamily: '"Archivo Black", sans-serif', fontSize: 17,}}>
          LOG IN →
        </button>

        <button
          style={{ marginTop: 18, width: "100%", border: "none", background: "transparent", cursor: "pointer", color: "#E84855",
            fontFamily: '"DM Mono", monospace',}}>
          Forgot Password?
        </button>

        <div
          style={{ marginTop: 35, textAlign: "center", fontFamily: '"DM Mono", monospace', fontSize: 12,}}>
          New here?{" "}
          <span onClick={onSignup}
            style={{ color: "#E84855", cursor: "pointer",fontWeight: "bold",}}>
            Create Account
          </span>
        </div>
      </div>
    </div>
  );
}