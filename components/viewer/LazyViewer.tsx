"use client";

import dynamic from "next/dynamic";

const Viewer = dynamic(() => import("./Viewer"), {
  ssr: false,
  loading: () => <div className="viewer"><div className="stage off" style={{ minHeight: 560 }} /></div>
});

export default Viewer;
