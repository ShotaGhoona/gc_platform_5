"use client";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

// ブルー系の色パレット
const BAR_COLORS = [
  "#5D6B80",
  "#4C5A6A",
  "#6B7A92",
  "#3E4A5A",
  "#7A8CA3",
  "#50607A",
  "#6A7B8C",
  "#3B4A5C",
];

const ANIMATION_DURATION = 600; // ms
const NUM_BARS = 8;
const NUM_LAYERS = 3;

type BarConfig = {
  top: number;
  height: number;
  color: string;
  delay: number;
  duration: number;
  key: string;
  opacity: number;
};

function generateBarConfigs(layer: number): BarConfig[] {
  const barHeight = 100 / NUM_BARS;
  return Array.from({ length: NUM_BARS }).map((_, i) => {
    // レイヤーごとにdelay, duration, opacity, colorを微妙に変える
    const delay = Math.random() * 0.3 * ANIMATION_DURATION + layer * 60;
    const duration = ANIMATION_DURATION + Math.random() * 0.4 * ANIMATION_DURATION + layer * 80;
    const color = BAR_COLORS[(i + layer) % BAR_COLORS.length];
    const opacity = 0.7 - layer * 0.2 + Math.random() * 0.1;
    return {
      top: i * barHeight,
      height: barHeight,
      color,
      delay,
      duration,
      key: `layer${layer}-bar${i}-${color}-${delay.toFixed(0)}-${duration.toFixed(0)}`,
      opacity,
    };
  });
}

export default function TransitionWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [barWidths, setBarWidths] = useState<string[][]>(
    Array(NUM_LAYERS).fill(null).map(() => Array(NUM_BARS).fill("100vw"))
  );
  const [barConfigs, setBarConfigs] = useState<BarConfig[][]>(
    Array(NUM_LAYERS).fill(null).map((_, l) => generateBarConfigs(l))
  );

  useEffect(() => {
    // レイヤーごとに新しいバー構成を生成
    const newBarConfigs = Array(NUM_LAYERS).fill(null).map((_, l) => generateBarConfigs(l));
    setBarConfigs(newBarConfigs);
    setBarWidths(Array(NUM_LAYERS).fill(null).map(() => Array(NUM_BARS).fill("100vw")));
    setShow(true);

    // 次のtickでw-0vwへ
    const raf = requestAnimationFrame(() => {
      setBarWidths(Array(NUM_LAYERS).fill(null).map(() => Array(NUM_BARS).fill("0vw")));
      setTimeout(() => {
        setShow(false);
      }, ANIMATION_DURATION * 2);
    });
    return () => {
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return (
    <>
      {show && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 9999,
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          {barConfigs.map((layerBars, layerIdx) =>
            layerBars.map((bar, i) => (
              <div
                key={bar.key}
                style={{
                  position: "absolute",
                  left: 0,
                  top: `${bar.top}%`,
                  width: barWidths[layerIdx][i],
                  height: `${bar.height}%`,
                  background: bar.color,
                  opacity: bar.opacity,
                  transition: `width ${bar.duration}ms cubic-bezier(.4,0,.2,1) ${bar.delay}ms`,
                  borderRadius: 0,
                  zIndex: 10 + layerIdx,
                }}
              />
            ))
          )}
        </div>
      )}
      {children}
    </>
  );
}
