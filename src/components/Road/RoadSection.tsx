import React from 'react';
import { Compass } from 'lucide-react';

interface WaypointStop {
  id: string;
  mile: string;
  name: string;
  terrain: string;
  desc: string;
  image: string;
}

export const RoadSection: React.FC = () => {
  const waypoints: WaypointStop[] = [
    {
      id: 'mile-00',
      mile: 'MILE 000',
      name: 'JAIPUR BYPASS',
      terrain: 'Urban Freight Corridor',
      desc: 'The journey starts at Mehta Garage under neon toll gantry lights, slipping past highway patrols into the outer dark.',
      image: '/assets/images/screenshots/screenshot-01.jpg',
    },
    {
      id: 'mile-84',
      mile: 'MILE 084',
      name: 'SAMBHAR SALT FLATS',
      terrain: 'High-Speed Alkaline Basin',
      desc: 'Vast shimmering salt beds where maximum overdrive speeds are reached beneath clear nocturnal desert skies.',
      image: '/assets/images/screenshots/screenshot-02.jpg',
    },
    {
      id: 'mile-168',
      mile: 'MILE 168',
      name: 'ARAVALLI SWITCHBACKS',
      terrain: 'Mountain Ascent & Stone Cuts',
      desc: 'Steep serpentine switchbacks cutting through ancient stone ridges, prone to rockslides and private security ambushes.',
      image: '/assets/images/screenshots/screenshot-03.jpg',
    },
    {
      id: 'mile-242',
      mile: 'MILE 242',
      name: 'UDAIPUR SANCTUARY',
      terrain: 'Lake Basins & Hidden Havelis',
      desc: 'Shadowy waterfront alleys and secret safehouses where stolen manifest telemetry is deciphered.',
      image: '/assets/images/screenshots/screenshot-04.jpg',
    },
    {
      id: 'mile-380',
      mile: 'MILE 380',
      name: 'THAR DESERT SEA',
      terrain: 'Off-Road Dunes & Haboobs',
      desc: 'Where asphalt terminates entirely. Low tire pressure and navigation by ancient stars are essential for survival.',
      image: '/assets/images/screenshots/screenshot-01.jpg',
    },
    {
      id: 'mile-495',
      mile: 'MILE 495',
      name: 'JAISALMER BASTION',
      terrain: 'Fortress Citadel Frontier',
      desc: 'Golden sandstone ramparts towering over the western boundary, guarding the final subterranean anomaly.',
      image: '/assets/images/screenshots/screenshot-02.jpg',
    },
  ];

  return (
    <section className="highway-route-stage" id="the-road" aria-label="495 Miles of Road">
      <div className="section-container">
        {/* Editorial Section Header */}
        <div className="editorial-lead-block">
          <span className="lead-eyebrow">CONNECTED TRAVEL NETWORK</span>
          <h2 className="lead-headline">495 MILES OF ROAD</h2>
          <p className="lead-subcopy">One connected fictionalized Rajasthan road network across six major travel milestones.</p>
        </div>

        {/* Clean Atmospheric Visual Route Grid */}
        <div className="highway-waypoints-grid">
          {waypoints.map((wp, idx) => (
            <div key={wp.id} className="waypoint-route-card">
              <div className="waypoint-image-frame">
                <img src={wp.image} alt={wp.name} className="waypoint-art-img" loading="lazy" />
                <div className="waypoint-vignette-overlay" />
                <span className="waypoint-mile-badge">{wp.mile}</span>
                <span className="waypoint-stop-num">0{idx + 1}</span>
              </div>

              <div className="waypoint-text-block">
                <span className="waypoint-terrain-label">{wp.terrain}</span>
                <h3 className="waypoint-title-heading">{wp.name}</h3>
                <p className="waypoint-description-text">{wp.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Route Summary Note */}
        <div className="highway-expedition-note">
          <Compass size={16} className="text-amber" />
          <span>A connected travel corridor across fictionalized Rajasthan connecting 13 target districts, with dynamic weather, refueling stops, and vehicular persistence.</span>
        </div>
      </div>
    </section>
  );
};
