import React from 'react';
import { worldRoutes, type MapRoute } from '../../data/worldData';

interface RoadNetworkProps {
  selectedDistrictId?: string;
  filter: string;
}

export const RoadNetwork: React.FC<RoadNetworkProps> = ({
  selectedDistrictId,
  filter,
}) => {
  const isHidden = filter !== 'ALL' && filter !== 'ROADS';
  if (isHidden) return null;

  return (
    <g className="road-network-group" aria-hidden="true">
      {worldRoutes.filter(r => r.type === 'primary' || r.type === 'secondary').map((route: MapRoute) => {
        const isConnectedToSelected =
          selectedDistrictId &&
          (route.fromId === selectedDistrictId || route.toId === selectedDistrictId);

        return (
          <g key={route.id} className="route-path-unit">
            {/* Background Road Casing */}
            <path
              d={route.path}
              fill="none"
              stroke="#08090b"
              strokeWidth={isConnectedToSelected ? '4.5' : '3'}
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Road Core Line */}
            <path
              d={route.path}
              fill="none"
              stroke={isConnectedToSelected ? '#f4a460' : 'rgba(217, 119, 54, 0.45)'}
              strokeWidth={isConnectedToSelected ? '2.5' : '1.5'}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                transition: 'stroke 0.3s ease, stroke-width 0.3s ease',
                filter: isConnectedToSelected ? 'drop-shadow(0 0 6px rgba(244, 164, 96, 0.6))' : 'none',
              }}
            />

            {/* Dynamic Transit Motion Dot */}
            <path
              d={route.path}
              fill="none"
              stroke="rgba(255, 235, 200, 0.85)"
              strokeWidth="2"
              strokeDasharray="4 60"
              strokeLinecap="round"
              className="road-transit-pulse"
            />
          </g>
        );
      })}
    </g>
  );
};
