import React from "react";
import Portfolio from "./Portfolio";
import Portfolio2 from "./Portfolio2";
import Portfolio3 from "./Portfolio3";
import Portfolio4 from "./Portfolio4";
import Portfolio5 from "./Portfolio5";
import Portfolio6 from "./Portfolio6";
import Portfolio7 from "./Portfolio7";
import Portfolio8 from "./Portfolio8";
import Portfolio9 from "./Portfolio9";
import Portfolio10 from "./Portfolio10";
import Portfolio11 from "./Portfolio11";
import Portfolio12 from "./Portfolio12";  
import Portfolio13 from "./Portfolio13";
import Portfolio14 from "./Portfolio14";
import Portfolio15 from "./Portfolio15";
import Portfolio16 from "./Portfolio16";
import Portfolio17 from "./Portfolio17";
import Portfolio18 from "./Portfolio18";
import Portfolio19 from "./Portfolio19";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Portfolio render error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', color: '#999', fontSize: '14px' }}>
          <p>Error rendering portfolio: {this.state.error?.message || 'Unknown error'}</p>
          <p>Check console for details.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function ThreeDPortfolioWrapper({ data, selectedPortfolio = 0, isPreview = false }) {
  return (
    <div className={`live-3d-preview relative w-full rounded-lg flex flex-col overflow-hidden ${isPreview ? 'h-full' : ''}`}>
      <style>{`
        .live-3d-preview { overflow: hidden !important; scrollbar-width: none; }
        .live-3d-preview::-webkit-scrollbar { display: none; }
        .live-3d-preview * { max-width: 100% !important; }
        .live-3d-preview .fixed { position: absolute !important; width: 100% !important; max-width: 100% !important; left: 0 !important; right: 0 !important; }
        .live-3d-preview .min-h-screen { min-height: 0 !important; height: auto !important; }
        .live-3d-preview .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
        .live-3d-preview #home { padding-top: 0 !important; margin-top: 0 !important; padding-bottom: 0 !important; height: auto !important; }
        .live-3d-preview nav { padding: 0 !important; margin: 0 !important; width: 100% !important; max-width: 100% !important; overflow: hidden !important; }
        .live-3d-preview > div:last-child { margin-top: 0 !important; } 
        .live-3d-preview > div:last-child > div { margin-top: 0 !important; padding-top: 0 !important; }
        .live-3d-preview > div:first-child { height: 0 !important; min-height: 0 !important; position: absolute !important; }
      `}</style>

      {/* Wrapper with white background to prevent black footer */}
      <div className="w-full h-full overflow-auto bg-white flex-1">
        <ErrorBoundary>
          {selectedPortfolio === 0 && <Portfolio data={data} />}
          {selectedPortfolio === 1 && <Portfolio2 data={data} />}
          {selectedPortfolio === 2 && <Portfolio3 data={data} />}
          {selectedPortfolio === 3 && <Portfolio4 data={data} />}
          {selectedPortfolio === 4 && <Portfolio5 data={data} />}
          {selectedPortfolio === 5 && <Portfolio6 data={data} />}
          {selectedPortfolio === 6 && <Portfolio7 data={data} />}
          {selectedPortfolio === 7 && <Portfolio8 data={data} />}
          {selectedPortfolio === 8 && <Portfolio9 data={data} />}
          {selectedPortfolio === 9 && <Portfolio10 data={data} />}
          {selectedPortfolio === 10 && <Portfolio11 data={data} />}
          {selectedPortfolio === 11 && <Portfolio12 data={data} />}
          {selectedPortfolio === 12 && <Portfolio13 data={data} />}
          {selectedPortfolio === 13 && <Portfolio14 data={data} />}
          {selectedPortfolio === 14 && <Portfolio15 data={data} />}
          {selectedPortfolio === 15 && <Portfolio16 data={data} />}
          {selectedPortfolio === 16 && <Portfolio17 data={data} />}
          {selectedPortfolio === 17 && <Portfolio18 data={data} />}
          {selectedPortfolio === 18 && <Portfolio19 data={data} />}
        </ErrorBoundary>
      </div>
    </div>
  );
}
