import { useEffect, useRef, useState } from "react";
import NextPlusClient from "@nextplus/app-sdk";
import nextplusLogo from "./assets/nextplus.svg";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  /** @type {import('react').RefObject<import('@nextplus/app-sdk').NextPlusClient | null>} */
  const clientRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [workorders, setWorkorders] = useState([]);
  const [baseUrl, setBaseUrl] = useState("");
  const [context, setContext] = useState(null);
  useEffect(() => {
    // Initialize SDK client once
    if (!clientRef.current) {
      clientRef.current = new NextPlusClient();
    }

    let isMounted = true;
    (async () => {
      try {
        const context = await clientRef.current.waitForContext();
        if (!isMounted) return;
        setContext(context);
        setIsReady(true);
        setBaseUrl(context?.baseUrl || "");
        // Fetch recently created workorders using typed services API
        const workorder =
          await clientRef.current.services.WorkorderService.find({
            filter: {
              where: {
                or: [
                  {
                    workorderNumber: {
                      like: "SC23000613",
                    },
                  },
                  {
                    workorderNumber: {
                      like: "ADR.*",
                    },
                  },
                  {
                    workorderNumber: {
                      like: "API.*",
                    },
                  },
                ],
              },
              fields: {
                id: 1,
                workorderNumber: 1,
                quantity: 1,
              },
              limit: 10,
              sort: { created: 1 },
            },
          });
        setWorkorders(workorder);
      } catch (e) {
        if (!isMounted) return;
        setIsReady(true);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <div>
        <a href="https://nextplus.io" target="_blank">
          <img src={nextplusLogo} className="logo" alt="NextPlus logo" />
        </a>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Next Plus + Vite + React</h1>
      <div className="card" style={{ marginBottom: 16 }}>
        {!isReady ? (
          <span>Loading…</span>
        ) : (
          <div style={{ textAlign: "left" }}>
            <h3>App context:</h3>
            <p>Base URL: {context?.baseUrl}</p>
            <pre>{JSON.stringify(context, null, 2)}</pre>
            <h3>Sample workorders:</h3>
            <ul>
              {workorders.map((workorder) => (
                <li key={workorder.id}>
                  <a
                    target="_blank"
                    href={`${baseUrl}/#!/workorder/show/${workorder.id}/`}
                  >
                    {workorder.workorderNumber}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
