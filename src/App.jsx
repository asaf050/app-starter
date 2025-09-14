import { useEffect, useRef, useState } from "react";
import NextPlusClient from "@nextplus/app-sdk";
import nextplusLogo from "./assets/nextplus.svg";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import WorkorderNameChanger from "./Component/WorkorderNameChanger";
import TableCrudDemo from "./Component/TableCrudDemo";
import WorkorderStatusTimeline from "./Component/WorkorderStatusTimeline";
import ProductionEntityTimeline from "./Component/ProductionEntityTimeline";
import StockTimeline from "./Component/StockTimeline";

function App() {
  /** @type {import('react').RefObject<import('@nextplus/app-sdk').NextPlusClient | null>} */
  const clientRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
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
      
      {/* App Context & Sample Data at the top */}
      <div className="card" style={{ marginBottom: 16 }}>
        <h2>📋 App Context</h2>
        {!isReady ? (
          <span>Loading…</span>
        ) : (
          <div style={{ textAlign: "left" }}>
            <h4>App context:</h4>
            <p>Base URL: {context?.baseUrl}</p>
            <details style={{ marginBottom: '1rem' }}>
              <summary style={{ cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem' }}>
                Show full context object
              </summary>
              <pre style={{ fontSize: '0.8rem', overflow: 'auto', marginTop: '0.5rem' }}>
                {JSON.stringify(context, null, 2)}
              </pre>
            </details>
          </div>
        )}
      </div>

      {/* Workorder Status Timeline - Only show when context type is workorder */}
      {context?.type === 'Workorder.show' && (
        <div className="card" style={{ marginBottom: 16 }}>
          <WorkorderStatusTimeline context={context} isReady={isReady} />
        </div>
      )}

      {/* Production Entity Timeline - Only show when context type is production-entity */}
      {context?.type === 'ProductionEntity.show' && (
        <div className="card" style={{ marginBottom: 16 }}>
          <ProductionEntityTimeline context={context} isReady={isReady} client={clientRef.current} />
        </div>
      )}

      {/* Stock Timeline - Only show when context type is stock */}
      {context?.type === 'Stock.show' && (
        <div className="card" style={{ marginBottom: 16 }}>
          <StockTimeline context={context} isReady={isReady} />
        </div>
      )}

      {/* Mini Apps Demo Section */}
      {['Page.show'].includes(context?.type) ? 
        <div className="card" style={{ marginBottom: 16 }}>
        <h2>🚀 Mini Apps Demo</h2>
        
        {/* Workorder Name Changer Mini App */}
        <details style={{ marginBottom: '1rem' }}>
          <summary style={{ cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem' }}>
            🔧 Workorder Name Changer
          </summary>
          <div style={{ marginTop: '1rem' }}>
            <WorkorderNameChanger client={clientRef.current} isReady={isReady} />
          </div>
        </details>
        
        {/* Table CRUD Demo Mini App */}
        <details style={{ marginBottom: '1rem' }}>
          <summary style={{ cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem' }}>
            📊 Table CRUD Demo
          </summary>
          <div style={{ marginTop: '1rem' }}>
            <TableCrudDemo client={clientRef.current} isReady={isReady} baseUrl={baseUrl} />
          </div>
        </details>
        
        {/* Placeholder for future mini apps */}
        <details style={{ marginBottom: '1rem' }}>
          <summary style={{ cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem', color: '#666' }}>
            🚀 More Mini Apps Coming Soon...
          </summary>
          <div style={{ marginTop: '1rem', color: '#666', fontStyle: 'italic' }}>
            Additional demo apps will be added here
          </div>
        </details>
      </div>: <>
      </>}
        
      <div className="card">
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
    </>
  );
}

export default App;

