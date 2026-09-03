import { memo } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

const geoUrl = "https://unpkg.com/world-atlas@2/countries-110m.json";

interface CountryData {
  name: string;
  coordinates: [number, number];
  labelDx: number;
  labelDy: number;
  anchor?: "start" | "end" | "middle";
}

// Layout tuned to roughly match the reference map screenshot.
const countryData: CountryData[] = [
  // Americas
  { name: "Canada", coordinates: [-106.35, 56.13], labelDx: 0, labelDy: -18, anchor: "middle" },
  { name: "USA", coordinates: [-95.71, 37.09], labelDx: -14, labelDy: 4, anchor: "end" },
  { name: "Mexico", coordinates: [-102.55, 23.63], labelDx: -18, labelDy: 6, anchor: "end" },
  { name: "Cuba", coordinates: [-77.78, 21.52], labelDx: -8, labelDy: 8, anchor: "end" },
  { name: "Bermuda", coordinates: [-64.75, 32.32], labelDx: 14, labelDy: -2, anchor: "start" },
  { name: "Brazil", coordinates: [-51.93, -14.24], labelDx: 12, labelDy: 6, anchor: "start" },

  // Europe
  { name: "Netherlands", coordinates: [5.29, 52.13], labelDx: -8, labelDy: -14, anchor: "end" },
  { name: "France", coordinates: [2.21, 46.23], labelDx: -18, labelDy: -2, anchor: "end" },
  { name: "Spain", coordinates: [-3.75, 40.46], labelDx: -18, labelDy: 8, anchor: "end" },
  { name: "Austria", coordinates: [14.55, 47.52], labelDx: 10, labelDy: -4, anchor: "start" },
  { name: "Estonia", coordinates: [25.01, 58.6], labelDx: 4, labelDy: -12, anchor: "start" },

  // Caucasus / Middle East
  { name: "Georgia", coordinates: [43.36, 42.32], labelDx: 10, labelDy: -8, anchor: "start" },
  { name: "Armenia", coordinates: [45.04, 40.07], labelDx: 12, labelDy: 4, anchor: "start" },
  { name: "Saudi Arabia", coordinates: [45.08, 23.89], labelDx: -4, labelDy: -14, anchor: "middle" },
  { name: "Jordan", coordinates: [36.24, 30.59], labelDx: 10, labelDy: -8, anchor: "start" },
  { name: "Qatar", coordinates: [51.18, 25.35], labelDx: -14, labelDy: 6, anchor: "end" },
  { name: "UAE", coordinates: [53.85, 23.42], labelDx: 14, labelDy: 14, anchor: "start" },

  // Africa
  { name: "Mauritania", coordinates: [-10.94, 21.0], labelDx: -8, labelDy: -6, anchor: "end" },
  { name: "Burkina Faso", coordinates: [-1.56, 12.24], labelDx: -12, labelDy: -6, anchor: "end" },
  { name: "Côte d'Ivoire", coordinates: [-5.55, 7.54], labelDx: -14, labelDy: 2, anchor: "end" },
  { name: "Ghana", coordinates: [-1.02, 7.95], labelDx: 10, labelDy: 8, anchor: "start" },
  { name: "Nigeria", coordinates: [8.68, 9.08], labelDx: -2, labelDy: -10, anchor: "middle" },
  { name: "DR Congo", coordinates: [21.75, -4.04], labelDx: -14, labelDy: 4, anchor: "end" },
  { name: "Rwanda", coordinates: [29.87, -1.94], labelDx: 12, labelDy: 12, anchor: "start" },
  { name: "Uganda", coordinates: [32.29, 1.37], labelDx: 12, labelDy: -8, anchor: "start" },
  { name: "Kenya", coordinates: [37.91, -0.02], labelDx: 16, labelDy: 8, anchor: "start" },
  { name: "Mauritius", coordinates: [57.55, -20.35], labelDx: 12, labelDy: 0, anchor: "start" },

  // Asia / Pacific
  { name: "Kazakhstan", coordinates: [66.92, 48.02], labelDx: 12, labelDy: -4, anchor: "start" },
  { name: "India", coordinates: [78.96, 22.5], labelDx: 0, labelDy: 6, anchor: "middle" },
  { name: "Sri Lanka", coordinates: [80.77, 7.87], labelDx: 14, labelDy: 10, anchor: "start" },
  { name: "China", coordinates: [104.2, 35.86], labelDx: 12, labelDy: -4, anchor: "start" },
  { name: "Taiwan", coordinates: [120.96, 23.7], labelDx: 12, labelDy: 4, anchor: "start" },
  { name: "Philippines", coordinates: [121.77, 12.88], labelDx: 14, labelDy: 10, anchor: "start" },
  { name: "Indonesia", coordinates: [117.0, -2.5], labelDx: 12, labelDy: 8, anchor: "start" },
  { name: "Japan", coordinates: [138.25, 36.2], labelDx: 12, labelDy: -6, anchor: "start" },

];

const MARKER_SIZE = 3.5;
const FONT_SIZE = 8;

const HCUSWorldMapChart = memo(() => {
  return (
    <div className="relative w-full">
      <div className="w-full aspect-[5/2.5]">
        <ComposableMap
          projection="geoEqualEarth"
          projectionConfig={{ scale: 180, center: [10, 5] }}
          width={800}
          height={480}
          style={{ width: "100%", height: "100%", background: "transparent" }}
        >
          <defs>
            <filter id="hcus-tag-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0.5" stdDeviation="0.8" floodColor="#000" floodOpacity="0.1" />
            </filter>
          </defs>

          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="hsl(0, 0%, 100%)"
                  stroke="hsl(0, 0%, 85%)"
                  strokeWidth={0.3}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none" },
                    pressed: { outline: "none" },
                  }}
                  tabIndex={-1}
                />
              ))
            }
          </Geographies>

          {countryData.map((country) => {
            const { labelDx: dx, labelDy: dy, anchor = "start" } = country;
            const label = country.name.toUpperCase();
            const textLen = label.length * (FONT_SIZE * 0.72);
            const padX = 6;

            const padY = 3;
            const tagW = textLen + padX * 2;
            const tagH = FONT_SIZE + padY * 2;
            const tagX = anchor === "end" ? dx - tagW : anchor === "middle" ? dx - tagW / 2 : dx;
            const tagY = dy - tagH / 2;

            return (
              <Marker key={country.name} coordinates={country.coordinates}>
                <line
                  x1={0}
                  y1={0}
                  x2={dx > 0 ? dx - 1 : dx + 1}
                  y2={dy}
                  stroke="hsl(0, 0%, 72%)"
                  strokeWidth={0.5}
                  strokeDasharray="1.5,1"
                />
                <rect
                  x={tagX}
                  y={tagY}
                  width={tagW}
                  height={tagH}
                  rx={3}
                  fill="hsl(210, 20%, 96%)"
                  stroke="hsl(210, 15%, 78%)"
                  strokeWidth={0.5}
                  filter="url(#hcus-tag-shadow)"
                />
                <text
                  x={anchor === "end" ? dx - padX : anchor === "middle" ? dx : dx + padX}
                  y={dy + 0.5}
                  textAnchor={anchor}
                  dominantBaseline="central"
                  style={{
                    fontFamily: "sans-serif",
                    fontSize: FONT_SIZE,
                    fontWeight: 700,
                    fill: "hsl(0, 0%, 18%)",
                    letterSpacing: "0.04em",
                    pointerEvents: "none",
                  }}
                >
                  {label}
                </text>
                <circle
                  r={MARKER_SIZE}
                  fill="#f1b537"
                  stroke="hsl(0, 0%, 100%)"
                  strokeWidth={1}
                />
              </Marker>
            );
          })}
        </ComposableMap>
      </div>
    </div>
  );
});

HCUSWorldMapChart.displayName = "HCUSWorldMapChart";
export default HCUSWorldMapChart;
